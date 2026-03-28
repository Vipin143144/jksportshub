/**
 * Optional: download remote images you are authorized to use into public/uploads.
 * Usage:
 *   node scripts/import-assets.mjs https://example.com/a.jpg https://example.com/b.png
 * Outputs local paths suitable for pasting into the admin panel.
 */
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "uploads");

async function main() {
  const urls = process.argv.slice(2).filter((u) => u.startsWith("http"));
  if (!urls.length) {
    console.error("Pass one or more http(s) image URLs as arguments.");
    process.exit(1);
  }
  await mkdir(outDir, { recursive: true });
  for (const url of urls) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = path.extname(new URL(url).pathname) || ".jpg";
    const name = `${crypto.randomUUID()}${ext}`;
    const fp = path.join(outDir, name);
    await writeFile(fp, buf);
    console.log(`/uploads/${name}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
