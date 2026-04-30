/**
 * Remplace l'ancienne charte violet (#667eea / #764ba2) par le vert type projet `project`.
 * Usage: node scripts/apply-enale-colors.js
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');

const REPLACEMENTS = [
  [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  ],
  [
    'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
  ],
  [
    'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
    'linear-gradient(135deg, rgba(22, 163, 74, 0.15) 0%, rgba(21, 128, 61, 0.15) 100%)',
  ],
  [
    'linear-gradient(135deg, rgba(102, 126, 234, 0.12) 0%, rgba(118, 75, 162, 0.12) 100%)',
    'linear-gradient(135deg, rgba(22, 163, 74, 0.12) 0%, rgba(21, 128, 61, 0.12) 100%)',
  ],
  [
    'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    'linear-gradient(135deg, rgba(22, 163, 74, 0.1) 0%, rgba(21, 128, 61, 0.1) 100%)',
  ],
  [
    'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
    'linear-gradient(135deg, rgba(22, 163, 74, 0.05) 0%, rgba(21, 128, 61, 0.05) 100%)',
  ],
  [
    'linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%)',
    'linear-gradient(135deg, rgba(22, 163, 74, 0.03) 0%, rgba(21, 128, 61, 0.03) 100%)',
  ],
  ['rgba(102, 126, 234,', 'rgba(22, 163, 74,'],
  ['rgba(118, 75, 162,', 'rgba(21, 128, 61,'],
  ['#667eea', '#16a34a'],
  ['#764ba2', '#15803d'],
];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (name === 'node_modules') continue;
      walk(p, files);
    } else if (/\.(jsx?|css)$/.test(name)) {
      files.push(p);
    }
  }
  return files;
}

let changed = 0;
for (const file of walk(SRC)) {
  let content = fs.readFileSync(file, 'utf8');
  const orig = content;
  for (const [a, b] of REPLACEMENTS) {
    if (content.includes(a)) {
      content = content.split(a).join(b);
    }
  }
  if (content !== orig) {
    fs.writeFileSync(file, content, 'utf8');
    changed++;
  }
}

console.log(`Fichiers mis à jour: ${changed}`);
