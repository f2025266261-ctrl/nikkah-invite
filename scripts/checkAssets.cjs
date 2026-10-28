const fs = require("fs");
const path = require("path");

const srcDir = path.resolve(process.cwd(), "src");
const publicAssetsDir = path.resolve(process.cwd(), "public/assets");

function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDirectory(fullPath, fileList);
    } else if (/\.(tsx|ts|jsx|js|css)$/.test(file)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = scanDirectory(srcDir);
const assetRegex = /\/assets\/([a-zA-Z0-9_\-\.]+)/g;
const missingAssets = [];
const checkedAssets = new Set();

for (const filePath of allFiles) {
  const content = fs.readFileSync(filePath, "utf-8");
  let match;

  while ((match = assetRegex.exec(content)) !== null) {
    const assetName = match[1];
    checkedAssets.add(assetName);
    const targetAssetPath = path.join(publicAssetsDir, assetName);

    if (!fs.existsSync(targetAssetPath)) {
      missingAssets.push({
        file: path.relative(process.cwd(), filePath),
        asset: assetName,
      });
    }
  }
}

console.log(`\n🔍 Scanned ${allFiles.length} files in src/ for /assets/ references.`);
console.log(`📦 Found ${checkedAssets.size} unique asset references: ${Array.from(checkedAssets).join(", ")}`);

if (missingAssets.length > 0) {
  console.error("\n❌ MISSING ASSETS DETECTED:");
  for (const item of missingAssets) {
    console.error(`  - Missing: public/assets/${item.asset} (referenced in ${item.file})`);
  }
  process.exit(1);
} else {
  console.log("✅ All referenced assets exist in public/assets/!\n");
  process.exit(0);
}
