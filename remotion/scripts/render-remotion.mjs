import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error("Usage: node render-remotion.mjs <compositionId> [output.mp4] [more ids...]");
  process.exit(1);
}

// Args can be pairs of "id" or "id=/abs/path.mp4"
const jobs = targets.map((arg) => {
  const [id, out] = arg.split("=");
  return { id, out: out ?? `/mnt/documents/hunova-${id}.mp4` };
});

const bundled = await bundle({
  entryPoint: path.resolve(__dirname, "../src/index.ts"),
  webpackOverride: (config) => config,
});

const browser = await openBrowser("chrome", {
  browserExecutable: process.env.PUPPETEER_EXECUTABLE_PATH ?? "/bin/chromium",
  chromiumOptions: { args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"] },
  chromeMode: "chrome-for-testing",
});

for (const job of jobs) {
  console.log(`\n=== Rendering ${job.id} → ${job.out} ===`);
  const composition = await selectComposition({
    serveUrl: bundled,
    id: job.id,
    puppeteerInstance: browser,
  });
  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: "h264",
    outputLocation: job.out,
    puppeteerInstance: browser,
    muted: true,
    concurrency: 2,
  });
  console.log(`✓ ${job.out}`);
}

await browser.close({ silent: false });
console.log("all done");
