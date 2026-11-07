// Print the flyer pages of the built site (_site/training/flyer-*/) to PDF
// with headless Chromium, and fail if a flyer does not fit on one A4 page.
//
//   node scripts/flyer-pdf.mjs            (after `jekyll build`)
//
// Each flyer's front matter names its PDF (`pdf:`); the layout puts that path
// on the download link, and this script reads it back from there.
import { createServer } from "node:http";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";

const SITE = "_site";
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".svg": "image/svg+xml",
  ".png": "image/png", ".woff2": "font/woff2", ".js": "text/javascript" };

// Serve _site so root-relative asset paths (/assets/...) resolve as on the live site.
const server = createServer(async (req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  if (path.endsWith("/")) path += "index.html";
  try {
    const body = await readFile(join(SITE, path));
    res.writeHead(200, { "content-type": TYPES[extname(path)] ?? "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end();
  }
}).listen(0, "127.0.0.1");
await new Promise((r) => server.once("listening", r));
const base = `http://127.0.0.1:${server.address().port}`;

const flyers = (await readdir(join(SITE, "training"))).filter((d) => d.startsWith("flyer-"));
if (flyers.length === 0) throw new Error("no flyers in _site/training/ – run jekyll build first");

const browser = await chromium.launch();
let failed = false;
try {
  for (const dir of flyers) {
    const page = await browser.newPage();
    await page.goto(`${base}/training/${dir}/`, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    await page.evaluate(() => document.fonts.ready);

    const out = await page.$eval(".flyer-download a", (a) => a.getAttribute("href"));
    // The sheet is fixed at 297mm with overflow visible: anything below it means
    // the text no longer fits on the page.
    const over = await page.evaluate(() => {
      const sheet = document.querySelector(".sheet").getBoundingClientRect();
      const cols = [...document.querySelectorAll(".flyer-main, .flyer-side")];
      // (1px tolerance for mm-to-px rounding)
      return Math.max(...cols.map((c) => c.scrollHeight - sheet.height));
    });

    const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true });
    const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
    await writeFile(join(SITE, out), pdf);
    console.log(`${dir}: ${out} (${pages} page${pages === 1 ? "" : "s"})`);
    if (pages !== 1 || over > 1) {
      console.error(`  ✗ does not fit on one A4 page${over > 1 ? ` (${Math.ceil(over)}px too long)` : ""}`);
      failed = true;
    }
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
if (failed) process.exit(1);
