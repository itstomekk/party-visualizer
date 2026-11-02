// Copies the runnable app (index.html, sketches/, vendor/) into docs/app/ so the
// GitHub Pages live demo matches the repo. Run after changing any of those: npm run sync-demo
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const dest = path.join(root, 'docs', 'app');

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
fs.copyFileSync(path.join(root, 'index.html'), path.join(dest, 'index.html'));
copyDir(path.join(root, 'sketches'), path.join(dest, 'sketches'));
copyDir(path.join(root, 'vendor'), path.join(dest, 'vendor'));
console.log('docs/app/ refreshed');
