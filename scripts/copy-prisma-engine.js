const fs = require('fs');
const path = require('path');

// Copy Prisma engine to all locations Prisma searches in Vercel runtime
const sourceDir = path.join(__dirname, '..', 'node_modules', '.prisma', 'client');

// Target directories based on Prisma error message
const targetDirs = [
  path.join(__dirname, '..', '.next', 'server'),
  path.join(__dirname, '..', 'node_modules', '.prisma', 'client'),
];

console.log('Source directory:', sourceDir);
console.log('Source exists:', fs.existsSync(sourceDir));

if (!fs.existsSync(sourceDir)) {
  console.error('Source directory does not exist!');
  process.exit(1);
}

const files = fs.readdirSync(sourceDir);
console.log('Files in source:', files);

const engineFiles = files.filter(f => f.includes('rhel-openssl') || f.includes('libquery_engine') || f.includes('.so.node'));
console.log('Engine files found:', engineFiles);

if (engineFiles.length === 0) {
  console.error('No engine files found!');
  process.exit(1);
}

// Copy to each target directory
targetDirs.forEach(targetDir => {
  if (!fs.existsSync(targetDir)) {
    console.log(`Creating directory: ${targetDir}`);
    fs.mkdirSync(targetDir, { recursive: true });
  }

  engineFiles.forEach(file => {
    const src = path.join(sourceDir, file);
    const dest = path.join(targetDir, file);
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to ${targetDir}`);
  });
});

console.log('Prisma engine files copied successfully to all locations');
