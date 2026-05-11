// repair.mjs — remove orphan Next.js Server Component metadata blocks from
// dynamic-param page files. These were left behind by a partial conversion
// and don't parse; they also don't run on the client. Safe to delete.
//
// Pattern we delete: lines starting with `: {` (the function-signature
// remnant) through the matching closing `}` at column 0.

import fs from 'node:fs/promises';

const FILES = [
  'src/app/blog/[slug]/page.jsx',
  'src/app/ottawa/blog/[slug]/page.jsx',
  'src/app/calgary/blog/[slug]/page.jsx',
  'src/app/vancouver/blog/[slug]/page.jsx',
  'src/app/edmonton/blog/[slug]/page.jsx',
  'src/app/service-area/[city]/page.jsx',
  'src/app/service-area/[city]/[service]/page.jsx',
  'src/app/service-areas/[slug]/page.jsx',
];

for (const file of FILES) {
  const lines = (await fs.readFile(file, 'utf8')).split('\n');
  const out = [];
  let skipping = false;

  for (const line of lines) {
    if (!skipping && /^:\s*\{/.test(line)) {
      skipping = true;
      continue;
    }
    if (skipping) {
      // The orphan block always ends with `}` at column 0 (it's the close of
      // the would-be metadata function).
      if (/^\}\s*$/.test(line)) {
        skipping = false;
      }
      continue;
    }
    out.push(line);
  }

  await fs.writeFile(file, out.join('\n'));
  console.log(`Repaired ${file}`);
}
