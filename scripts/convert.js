#!/usr/bin/env node
// One-shot conversion script: renames .tsx → .jsx and .ts → .js in src/,
// rewrites Next.js imports to local shims, strips Next directives/exports,
// and rewrites import paths to include explicit module extensions
// (required because Babel-in-browser ESM has no resolver).
//
// Idempotent within reason; safe to re-run.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');

// Walk src/ recursively.
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// First pass: rename .tsx → .jsx, .ts → .js (but not .d.ts).
function renamePass() {
  const files = walk(SRC, []);
  for (const f of files) {
    if (f.endsWith('.tsx')) fs.renameSync(f, f.slice(0, -4) + '.jsx');
    else if (f.endsWith('.ts') && !f.endsWith('.d.ts')) fs.renameSync(f, f.slice(0, -3) + '.js');
  }
}

// Build a set of all existing paths (after rename) so we can resolve
// relative imports and add the correct extension.
function buildFileSet() {
  return new Set(walk(SRC, []));
}

// Resolve a relative import to an actual file path on disk (post-rename).
// Returns the resolved abs path, or null.
function resolveImport(fromFile, spec, fileSet) {
  if (spec.startsWith('@/')) spec = '/src/' + spec.slice(2);
  if (spec.startsWith('/')) {
    // Absolute (from app root). Map "/src/..." or "/public/..." to disk.
    const candidate = path.join(ROOT, spec);
    return tryExt(candidate, fileSet);
  }
  if (!spec.startsWith('.')) return null;
  const candidate = path.resolve(path.dirname(fromFile), spec);
  return tryExt(candidate, fileSet);
}

function tryExt(candidate, fileSet) {
  if (fileSet.has(candidate)) return candidate;
  const exts = ['.jsx', '.js', '.json'];
  for (const e of exts) {
    if (fileSet.has(candidate + e)) return candidate + e;
  }
  // Try as directory with index.
  for (const e of exts) {
    const p = path.join(candidate, 'index' + e);
    if (fileSet.has(p)) return p;
  }
  return null;
}

// Rewrite contents of a single file.
function rewriteFile(file, fileSet) {
  if (!/\.(jsx|js)$/.test(file)) return;
  let s = fs.readFileSync(file, 'utf8');
  const orig = s;

  // 1. Strip directives.
  s = s.replace(/^[ \t]*['"]use (client|server)['"];?[ \t]*\r?\n?/gm, '');

  // 2. Rewrite Next.js imports.
  s = s.replace(/from\s+['"]next\/link['"]/g, 'from "/src/components/Link.jsx"');
  s = s.replace(/from\s+['"]next\/image['"]/g, 'from "/src/components/Image.jsx"');
  s = s.replace(/from\s+['"]next\/navigation['"]/g, 'from "/src/router/Router.jsx"');
  s = s.replace(/from\s+['"]next\/dynamic['"]/g, 'from "/src/shims/dynamic.js"');
  s = s.replace(/from\s+['"]next\/font\/google['"]/g, 'from "/src/shims/font.js"');
  s = s.replace(/from\s+['"]next\/font\/local['"]/g, 'from "/src/shims/font.js"');
  s = s.replace(/from\s+['"]next\/headers['"]/g, 'from "/src/shims/headers.js"');
  s = s.replace(/from\s+['"]next\/server['"]/g, 'from "/src/shims/server.js"');
  s = s.replace(/from\s+['"]next['"]/g, 'from "/src/shims/next.js"');
  s = s.replace(/from\s+['"]@vercel\/analytics(\/[a-z]+)?['"]/g, 'from "/src/shims/analytics.js"');

  // 3. Strip type-only imports/exports from Next (Metadata etc.).
  s = s.replace(/^\s*import\s+type\s+\{[^}]*\}\s+from\s+["'][^"']+["'];?\s*$/gm, '');

  // 4. Strip Next route-segment exports.
  s = stripExport(s, 'metadata');
  s = stripExport(s, 'dynamic');
  s = stripExport(s, 'dynamicParams');
  s = stripExport(s, 'revalidate');
  s = stripExport(s, 'fetchCache');
  s = stripExport(s, 'runtime');
  s = stripExport(s, 'preferredRegion');
  s = stripFuncExport(s, 'generateMetadata');
  s = stripFuncExport(s, 'generateStaticParams');
  s = stripFuncExport(s, 'generateViewport');

  // 5. Rewrite `@/...` aliases to absolute /src/... paths (catches non-import use).
  s = s.replace(/(['"])@\//g, '$1/src/');

  // 6. Add .jsx/.js extension to relative imports.
  s = s.replace(/((?:^|\s)(?:import|export)\b[^;'"]*?(?:from\s+)?)(['"])(\.\.?\/[^'"]+|\/src\/[^'"]+)(['"])/g, (m, pre, q1, spec, q2) => {
    if (/\.(jsx|js|json|css|svg|png|jpg|jpeg|webp|gif|ico)$/.test(spec)) return m;
    const resolved = resolveImport(file, spec, fileSet);
    if (!resolved) return m;
    const rel = resolved.startsWith(SRC)
      ? '/src/' + path.relative(SRC, resolved).split(path.sep).join('/')
      : resolved;
    return pre + q1 + rel + q2;
  });

  // 7. Same for `import('…')` dynamic.
  s = s.replace(/(import\s*\(\s*)(['"])(\.\.?\/[^'"]+|\/src\/[^'"]+)(['"])/g, (m, pre, q1, spec, q2) => {
    if (/\.(jsx|js|json)$/.test(spec)) return m;
    const resolved = resolveImport(file, spec, fileSet);
    if (!resolved) return m;
    const rel = resolved.startsWith(SRC)
      ? '/src/' + path.relative(SRC, resolved).split(path.sep).join('/')
      : resolved;
    return pre + q1 + rel + q2;
  });

  if (s !== orig) fs.writeFileSync(file, s);
}

// Strip `export const NAME = ...;` — handles multi-line object literals
// by matching balanced braces.
function stripExport(src, name) {
  const re = new RegExp('export\\s+const\\s+' + name + '\\b', 'g');
  let m;
  while ((m = re.exec(src)) !== null) {
    const start = m.index;
    // Find `=` then balanced expression up to terminating semicolon at depth 0.
    let i = m.index + m[0].length;
    while (i < src.length && src[i] !== '=' && src[i] !== ';') i++;
    if (src[i] !== '=') { re.lastIndex = i; continue; }
    i++;
    let depth = 0, inStr = null;
    while (i < src.length) {
      const ch = src[i];
      if (inStr) {
        if (ch === '\\') { i += 2; continue; }
        if (ch === inStr) inStr = null;
      } else {
        if (ch === '"' || ch === "'" || ch === '`') inStr = ch;
        else if (ch === '{' || ch === '[' || ch === '(') depth++;
        else if (ch === '}' || ch === ']' || ch === ')') depth--;
        else if (ch === ';' && depth === 0) { i++; break; }
        else if (ch === '\n' && depth === 0) {
          // allow newline if next non-ws is not start of new statement at depth 0
          // safer: keep scanning; semicolon is required by our codebase.
        }
      }
      i++;
    }
    src = src.slice(0, start) + src.slice(i);
    re.lastIndex = start;
  }
  return src;
}

// Strip `export (async )?function NAME(…) { … }` — balanced braces.
function stripFuncExport(src, name) {
  const re = new RegExp('export\\s+(?:async\\s+)?function\\s+' + name + '\\b', 'g');
  let m;
  while ((m = re.exec(src)) !== null) {
    const start = m.index;
    let i = m.index + m[0].length;
    // Find opening brace.
    while (i < src.length && src[i] !== '{') i++;
    if (i >= src.length) break;
    let depth = 0;
    let inStr = null;
    while (i < src.length) {
      const ch = src[i];
      if (inStr) {
        if (ch === '\\') { i += 2; continue; }
        if (ch === inStr) inStr = null;
      } else {
        if (ch === '"' || ch === "'" || ch === '`') inStr = ch;
        else if (ch === '{') depth++;
        else if (ch === '}') { depth--; if (depth === 0) { i++; break; } }
      }
      i++;
    }
    src = src.slice(0, start) + src.slice(i);
    re.lastIndex = start;
  }
  return src;
}

// MAIN
renamePass();
const fileSet = buildFileSet();
for (const f of fileSet) rewriteFile(f, fileSet);
console.log('Converted', fileSet.size, 'files.');
