const assert = require("node:assert");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const images = [
  "back.jpg",
  ...Array.from({ length: 22 }, (_, i) => `majorarcana_${String(i).padStart(2, "0")}.jpg`)
];

function readText(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function identify(file) {
  const out = execFileSync("magick", ["identify", "-format", "%w %h %[orientation]", path.join(root, file)], {
    encoding: "utf8"
  });
  const [width, height, orientation = ""] = out.trim().split(/\s+/);
  return { width: Number(width), height: Number(height), orientation };
}

for (const image of images) {
  const file = path.join("images", image);
  assert.ok(fs.existsSync(path.join(root, file)), `${file} is missing`);
  const info = identify(file);
  assert.ok(info.height > info.width, `${file} must be portrait (${info.width}x${info.height})`);
  assert.ok(
    info.orientation === "TopLeft" || info.orientation === "Undefined",
    `${file} orientation must be normalized`
  );
}

const html = readText("index.html");
assert.match(html, /href="style\.css"/);
assert.match(html, /src="script\.js"/);

const css = readText("style.css");
assert.match(css, /aspect-ratio:\s*2\s*\/\s*3/);
assert.match(css, /object-fit:\s*contain/);
assert.match(css, /\.result\.revealed/);
assert.match(css, /z-index:\s*120/);
assert.match(css, /@media\s*\(max-width:\s*820px\)/);
assert.match(css, /grid-template-rows:\s*minmax\(0,\s*1fr\)\s*auto/);
assert.match(css, /max-height:\s*100svh/);
assert.match(css, /min-height:\s*16svh/);
assert.match(css, /height:\s*62svh/);
assert.match(css, /width:\s*min\(360px,\s*92vw\)/);

const script = readText("script.js");
assert.match(script, /function cutDeck/);
assert.match(script, /上下入れ替え/);
assert.doesNotMatch(script, /cutMark/);

execFileSync("node", ["--check", path.join(root, "script.js")], { stdio: "pipe" });
