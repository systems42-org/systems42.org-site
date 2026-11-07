// Print the flyer pages of the built site (_site/training/flyer-*/) to PDF
// with headless Chromium, and fail if a flyer does not fit on one A4 page
// or if any of its files (CSS, fonts, logo) does not load.
//
//   node scripts/flyer-pdf.mjs            (after `jekyll build`)
//
// BASEURL: the --baseurl the site was built with (empty for systems42.org).
// Each flyer's front matter names its PDF (`pdf:`); the layout puts that path
// on the download link, and this script reads it back from there.
import { createServer } from "node:http";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";

const SITE = "_site";
const BASEURL = (process.env.BASEURL ?? "").replace(/\/+$/, "");
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".svg": "image/svg+xml",
  ".png": "image/png", ".woff2": "font/woff2", ".js": "text/javascript" };

// A site URL path (with or without the baseurl prefix) -> file path inside _site.
function sitePath(urlPath) {
  let path = decodeURIComponent(urlPath);
  if (BASEURL && (path === BASEURL || path.startsWith(BASEURL + "/"))) path = path.slice(BASEURL.length) || "/";
  path = normalize(path).replace(/^([/\\]*\.\.[/\\])+/, "/");
  if (path.endsWith("/")) path += "index.html";
  return join(SITE, path);
}

// Serve _site so root-relative asset paths resolve as on the live site.
const server = createServer(async (req, res) => {
  const file = sitePath(new URL(req.url, "http://x").pathname);
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end();
  }
});

let browser;
let failed = false;
try {
  await new Promise((resolve, reject) => server.once("error", reject).listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;

  const flyers = (await readdir(join(SITE, "training"))).filter((d) => d.startsWith("flyer-"));
  if (flyers.length === 0) throw new Error("no flyers in _site/training/ – run jekyll build first");

  browser = await chromium.launch();
  for (const dir of flyers) {
    const page = await browser.newPage();
    const broken = [];
    page.on("response", (r) => { if (r.status() >= 400) broken.push(`${r.status()} ${r.url()}`); });
    page.on("requestfailed", (r) => broken.push(`failed ${r.url()}`));

    await page.goto(`${base}${BASEURL}/training/${dir}/`, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    await page.evaluate(() => document.fonts.ready);

    const out = await page.$eval(".flyer-download a", (a) => a.getAttribute("href"));
    // The sheet is fixed at 297mm with overflow visible: anything below it means
    // the text no longer fits on the page (1px tolerance for mm-to-px rounding).
    const over = await page.evaluate(() => {
      const sheet = document.querySelector(".sheet").getBoundingClientRect();
      const cols = [...document.querySelectorAll(".flyer-main, .flyer-side")];
      return Math.max(...cols.map((c) => c.scrollHeight - sheet.height));
    });

    const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true });
    const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
    await writeFile(sitePath(out), pdf);
    console.log(`${dir}: ${out} (${pages} page${pages === 1 ? "" : "s"})`);
    if (pages !== 1 || over > 1) {
      console.error(`  ✗ does not fit on one A4 page${over > 1 ? ` (${Math.ceil(over)}px too long)` : ""}`);
      failed = true;
    }
    if (broken.length) {
      console.error(`  ✗ files did not load:\n    ${broken.join("\n    ")}`);
      failed = true;
    }
    await page.close();
  }
} catch (err) {
  console.error(err.message ?? err);
  failed = true;
} finally {
  await browser?.close();
  server.close();
}
if (failed) process.exit(1);
