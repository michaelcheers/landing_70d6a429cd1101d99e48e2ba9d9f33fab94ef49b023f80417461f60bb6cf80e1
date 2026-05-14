#!/usr/bin/env node
// One-shot: replace every legacy phone number with 833-351-1791.
// Run from repo root:  node scripts/replace-phone.mjs

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');

const REPLACEMENTS = [
  // tel: links — dashed
  [/tel:647-251-8188/g,        'tel:833-351-1791'],
  [/tel:604-373-5582/g,        'tel:833-351-1791'],
  [/tel:587-812-5952/g,        'tel:833-351-1791'],
  [/tel:343-500-0488/g,        'tel:833-351-1791'],
  [/tel:368-210-0125/g,        'tel:833-351-1791'],
  // tel: links — digits only
  [/tel:6472518188/g,          'tel:8333511791'],
  [/tel:6043735582/g,          'tel:8333511791'],
  [/tel:5878125952/g,          'tel:8333511791'],
  [/tel:3435000488/g,          'tel:8333511791'],
  [/tel:3682100125/g,          'tel:8333511791'],
  // display — parens-space-dash variant: (NNN) NNN-NNNN
  [/\(647\) 251-8188/g,        '(833) 351-1791'],
  [/\(587\) 812-5952/g,        '(833) 351-1791'],
  [/\(343\) 500-0488/g,        '(833) 351-1791'],
  [/\(368\) 210-0125/g,        '(833) 351-1791'],
  // display — parens-dash variant: (NNN)-NNN-NNNN
  [/\(604\)-373-5582/g,        '(833)-351-1791'],
  [/\(613\)-696-7272/g,        '(833)-351-1791'],
  // display — dashed variant
  [/647-251-8188/g,            '833-351-1791'],
  [/604-373-5582/g,            '833-351-1791'],
  [/587-812-5952/g,            '833-351-1791'],
  [/343-500-0488/g,            '833-351-1791'],
  [/368-210-0125/g,            '833-351-1791'],
  [/613-696-7272/g,            '833-351-1791'],
];

async function* walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === '_next' || e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith('.html') || e.name.endsWith('.js')) yield p;
  }
}

let touched = 0;
for await (const file of walk(ROOT)) {
  const before = await fs.readFile(file, 'utf8');
  let after = before;
  for (const [re, to] of REPLACEMENTS) after = after.replace(re, to);
  if (after !== before) { await fs.writeFile(file, after); touched++; }
}
console.log(`Updated ${touched} file(s).`);
