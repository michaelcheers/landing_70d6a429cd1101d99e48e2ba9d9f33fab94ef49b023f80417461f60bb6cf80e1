// transpile.mjs — pre-transpile every .jsx/.tsx/.ts/.js source file in place,
// outputting .js with rewritten import paths so the browser can run them
// without a service worker.
//
// What this does:
//   1. For every source file: rewrite import specifiers (jsx→js, css→css.js,
//      images→img.js), then run esbuild.transform to strip JSX/TS.
//   2. Generate JS stubs for each image (`{ src: "/path" }`) and each CSS
//      file (link-tag injector).
//   3. Update routes.js so its dynamic `lz()` paths point at .js files.
//
// What it DOES NOT do:
//   - Bundle (each file stays a separate module)
//   - Resolve npm packages (importmap still handles `react`, etc.)
//   - Delete source .jsx files (you can delete those manually after verifying)

import * as esbuild from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('.');
const srcDir = path.join(root, 'src');

const IMG_EXTS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif', '.ico',
]);
const SOURCE_EXTS = new Set(['.jsx', '.tsx', '.js', '.ts']);

// Track every image and CSS path we need to emit stubs for. Keyed by the
// absolute file path on disk (so we resolve relative imports once).
const imageStubs = new Set();   // entries: { absPath, urlPath }
const cssStubs = new Set();     // entries: { absPath, urlPath }

function urlPathOf(absPath) {
  return '/' + path.relative(root, absPath).split(path.sep).join('/');
}

// Resolve an import specifier (as written in source) against the importing
// file's directory. Returns an absolute filesystem path or null if the
// specifier is a bare/external one.
function resolveSpecAbs(spec, importerAbsPath) {
  if (spec.startsWith('/')) {
    // URL-absolute, treat as repo-root-absolute
    return path.resolve(root, '.' + spec);
  }
  if (spec.startsWith('./') || spec.startsWith('../')) {
    return path.resolve(path.dirname(importerAbsPath), spec);
  }
  return null; // bare specifier (e.g. 'react') — leave alone
}

// Rewrite a single import specifier string. Returns the (possibly modified)
// specifier and records any image/CSS files that need stubs.
function rewriteSpec(spec, importerAbsPath) {
  const absTarget = resolveSpecAbs(spec, importerAbsPath);

  // Bare specifier: handle a few special cases for CSS sub-paths
  if (absTarget === null) {
    if (spec === 'react-datepicker/dist/react-datepicker.css') {
      // npm-package CSS: load from esm.sh via a generated stub. We use a
      // synthetic local path for the stub. Version is pinned to match the
      // importmap entry in index.html.
      const stubPath = path.join(srcDir, '_stubs', 'react-datepicker.css.js');
      cssStubs.add(JSON.stringify({
        absPath: stubPath,
        urlPath: 'https://esm.sh/react-datepicker@8.3.0/dist/react-datepicker.css',
      }));
      // Path the rewritten import points at.
      return urlPathOf(stubPath);
    }
    return spec; // other bare specifiers stay as-is (importmap resolves them)
  }

  const ext = path.extname(absTarget).toLowerCase();

  // Source-code imports: drop the source extension in favor of .js.
  if (SOURCE_EXTS.has(ext)) {
    const noExt = absTarget.slice(0, -ext.length);
    return urlPathOf(noExt + '.js');
  }

  // Image imports: point at a .js stub colocated with the image file.
  if (IMG_EXTS.has(ext)) {
    const stubAbs = absTarget + '.js';
    imageStubs.add(JSON.stringify({
      absPath: stubAbs,
      urlPath: urlPathOf(absTarget),
    }));
    return urlPathOf(stubAbs);
  }

  // CSS imports: point at a .js stub colocated with the CSS file.
  if (ext === '.css') {
    const stubAbs = absTarget + '.js';
    cssStubs.add(JSON.stringify({
      absPath: stubAbs,
      urlPath: urlPathOf(absTarget),
    }));
    return urlPathOf(stubAbs);
  }

  // Anything else: leave alone.
  return spec;
}

// Find import/export-from/dynamic-import string specifiers and run them
// through rewriteSpec. Three separate patterns to avoid one pattern
// greedily consuming the next import statement.
function rewriteAllImports(source, importerAbsPath) {
  // 1. Side-effect imports: `import 'foo'` or `import "foo"`
  //    NOTE: must NOT match `import X from 'foo'`. Use lookahead to
  //    require that what follows is a quote (not an identifier).
  source = source.replace(
    /\bimport\s+(['"])([^'"]+)\1/g,
    (full, quote, spec) => {
      const rewritten = rewriteSpec(spec, importerAbsPath);
      return rewritten === spec ? full : `import ${quote}${rewritten}${quote}`;
    },
  );

  // 2. Named/default imports and re-exports: `import X from 'foo'`,
  //    `import { a, b } from 'foo'`, `export { a } from 'foo'`.
  //    The bindings portion is forbidden from containing quotes (so we
  //    don't span across multiple import statements).
  source = source.replace(
    /\b(import|export)\s+([^'";]*?)\s+from\s+(['"])([^'"]+)\3/g,
    (full, kind, bindings, quote, spec) => {
      const rewritten = rewriteSpec(spec, importerAbsPath);
      return rewritten === spec
        ? full
        : `${kind} ${bindings} from ${quote}${rewritten}${quote}`;
    },
  );

  // 3. Dynamic imports: `import('foo')` — only literal-string targets.
  source = source.replace(
    /\bimport\s*\(\s*(['"])([^'"]+)\1\s*\)/g,
    (full, quote, spec) => {
      const rewritten = rewriteSpec(spec, importerAbsPath);
      return rewritten === spec
        ? full
        : `import(${quote}${rewritten}${quote})`;
    },
  );

  // 4. String literals that end in a source extension. These appear in
  //    routes.js (STATIC_ROUTES, CITY_PAGES) as path fragments passed to
  //    lz() / dynamic import at runtime. Match any string ending in
  //    .jsx/.tsx/.ts and swap to .js. Loose match; assumes nothing else
  //    in the codebase has a string ending in these extensions.
  source = source.replace(
    /(['"])([^'"]+)\.(jsx|tsx|ts)\1/g,
    (full, quote, basePath) => `${quote}${basePath}.js${quote}`,
  );

  return source;
}

// Walk src/ recursively and collect every file path of interest.
async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (e.isFile()) {
      out.push(full);
    }
  }
  return out;
}

const allFiles = await walk(srcDir);
const sourceFiles = allFiles.filter((f) => SOURCE_EXTS.has(path.extname(f).toLowerCase()));

console.log(`Transpiling ${sourceFiles.length} source files...`);

let transpiled = 0;

for (const file of sourceFiles) {
  const raw = await fs.readFile(file, 'utf8');

  // First: rewrite imports while syntax is still source-form.
  const rewritten = rewriteAllImports(raw, file);

  // Then: strip JSX and TS syntax with esbuild's tsx loader (handles both).
  const result = await esbuild.transform(rewritten, {
    loader: 'tsx',
    jsx: 'automatic',
    target: 'es2022',
    format: 'esm',
    sourcefile: path.relative(root, file),
  });

  // Output path: same location, .js extension.
  const ext = path.extname(file);
  const outPath = file.slice(0, -ext.length) + '.js';
  await fs.writeFile(outPath, result.code);

  // If we changed the extension (jsx/tsx/ts → js), remove the original file
  // so we don't ship two copies with conflicting contents.
  if (ext !== '.js') {
    await fs.unlink(file);
  }

  transpiled++;
}

console.log(`Transpiled ${transpiled} files.`);

// Emit image stubs.
const imageEntries = [...imageStubs].map((s) => JSON.parse(s));
for (const { absPath, urlPath } of imageEntries) {
  await fs.mkdir(path.dirname(absPath), { recursive: true });
  await fs.writeFile(
    absPath,
    `export default { src: ${JSON.stringify(urlPath)} };\n`,
  );
}
console.log(`Wrote ${imageEntries.length} image stubs.`);

// Emit CSS stubs.
const cssEntries = [...cssStubs].map((s) => JSON.parse(s));
for (const { absPath, urlPath } of cssEntries) {
  await fs.mkdir(path.dirname(absPath), { recursive: true });
  await fs.writeFile(
    absPath,
    `// CSS link-tag injector. Idempotent.
const u = ${JSON.stringify(urlPath)};
if (typeof document !== 'undefined' && !document.querySelector('link[data-mp-css="' + u + '"]')) {
  const l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = u;
  l.setAttribute('data-mp-css', u);
  document.head.appendChild(l);
}
export default null;
`,
  );
}
console.log(`Wrote ${cssEntries.length} CSS stubs.`);

console.log('\nDone.');
