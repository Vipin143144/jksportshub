const fs = require('fs');
const path = require('path');

// Copy Prisma engine to .next/server for standalone output
const sourceDir = path.join(__dirname, 'node_modules', '.prisma', 'client');
const targetDir = path.join(__dirname, '.next', 'server');

if (!fs.existsSync(targetDir)) {
  console.log('Target directory does not exist, skipping copy');
  process.exit(0);
}

const files = fs.readdirSync(sourceDir);
const engineFiles = files.filter(f => f.includes('rhel-openssl') || f.includes('libquery_engine'));

console.log('Found engine files:', engineFiles);

engineFiles.forEach(file => {
  const src = path.join(sourceDir, file);
  const dest = path.join(targetDir, file);
  fs.copyFileSync(src, dest);
  console.log(`Copied ${file} to ${targetDir}`);
});

console.log('Prisma engine files copied successfully');
