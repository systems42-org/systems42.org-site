// Render the link preview image (og:image) assets/img/og-image.png, 1200x630,
// from scripts/og-image.html plus the three loop diagrams in _includes/loops/.
//
//   node scripts/og-image.mjs      (or: npm run og-image)
//
// Needs no Jekyll build; the HTML loads fonts and logo straight from assets/.
import { readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright is not installed. Run once in the repository:\n  npm install\n  npx playwright install --only-shell chromium");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "assets/img/og-image.png");

// The loop SVGs have generous margins for the website layout; crop them to the
// circles and arrows so the diagrams can be as large as possible.
const CROP = "165 20 570 535";
const loops = {};
for (const name of ["capture", "inspect", "clarify"]) {
  const svg = await readFile(join(root, `_includes/loops/${name}.svg`), "utf8");
  loops[name] = svg.replace(/viewBox="[^"]*"/, `viewBox="${CROP}"`);
}

const browser = await chromium.launch({ args: ["--font-render-hinting=none"] });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(join(root, "scripts/og-image.html")).href);
  await page.evaluate((loops) => {
    for (const el of document.querySelectorAll("[data-loop]")) el.innerHTML = loops[el.dataset.loop];
  }, loops);
  await page.evaluate(() => document.fonts.ready);
  const missing = await page.evaluate(() =>
    [...document.fonts].filter((f) => f.status !== "loaded").map((f) => `${f.family} ${f.weight}`));
  if (missing.length) console.warn("Fonts not loaded:", missing.join(", "));
  await page.screenshot({ path: out, type: "png" });
  console.log(`wrote ${out}`);
} finally {
  await browser.close();
}
