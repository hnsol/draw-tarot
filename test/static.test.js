const assert = require("node:assert");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

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
assert.match(html, /src="card-meanings\.js"[\s\S]*src="script\.js"/);
assert.match(html, /src="script\.js"/);
assert.match(html, /id="meaningSection"/);
const stageStart = html.indexOf('class="stage"');
const controlsStart = html.indexOf('class="controls"');
const resultStart = html.indexOf('id="result"');
const meaningStart = html.indexOf('id="meaningSection"');
const stageHtml = html.slice(stageStart, controlsStart);
assert.ok(stageStart < controlsStart && controlsStart < resultStart && resultStart < meaningStart);
assert.match(stageHtml, /id="deck"/);
assert.doesNotMatch(stageHtml, /id="result"/);

const css = readText("style.css");
assert.match(css, /aspect-ratio:\s*2\s*\/\s*3/);
assert.match(css, /object-fit:\s*contain/);
assert.match(css, /\.result\.revealed/);
assert.match(css, /z-index:\s*120/);
assert.doesNotMatch(css, /\.result img\s*{[^}]*background:\s*rgba/);
assert.match(css, /\.app\.has-result/);
assert.match(css, /@media\s*\(max-width:\s*820px\)/);
assert.match(css, /grid-template-rows:\s*minmax\(0,\s*1fr\)\s*auto/);
assert.match(css, /max-height:\s*100svh/);
assert.match(css, /\.deck-area\s*{[\s\S]*min-height:\s*min\(460px,\s*58svh\)/);
assert.match(css, /\.result\s*{[\s\S]*min-height:\s*auto/);
assert.match(css, /height:\s*min\(620px,\s*76svh\)/);
assert.match(css, /\.card\.drawn\s*{[\s\S]*translate\(0,\s*140px\)/);
assert.match(css, /\.card\.drawn\s*{[\s\S]*transition:\s*transform\s*\.9s\s*cubic-bezier\(\.65,\s*0,\s*1,\s*\.8\)/);

const script = readText("script.js");
assert.match(script, /function cutDeck/);
assert.match(script, /上下入れ替え/);
assert.match(script, /renderMeaning/);
assert.match(script, /resultEl\.classList\.add\("revealed"\)[\s\S]*selectedEl\.classList\.add\("drawn"\)/);
assert.match(script, /await sleep\(480\);[\s\S]*scrollIntoView/);
assert.match(script, /scrollIntoView\(\{\s*behavior:\s*"smooth",\s*block:\s*"start"\s*\}\)/);
assert.doesNotMatch(script, /await sleep\(650\);[\s\S]*scrollIntoView/);
assert.doesNotMatch(script, /cutMark/);

const meaningCode = readText("card-meanings.js");
const sandbox = { window: {} };
vm.runInNewContext(meaningCode, sandbox);
assert.equal(sandbox.window.cardMeanings.length, 22);
for (const meaning of sandbox.window.cardMeanings) {
  assert.equal(typeof meaning.number, "number");
  assert.equal(typeof meaning.name, "string");
  assert.equal(typeof meaning.imageDescription, "string");
  assert.equal(typeof meaning.positiveKeywords, "string");
  assert.equal(typeof meaning.negativeKeywords, "string");
  assert.equal(typeof meaning.treeOfLife, "string");
}
sandbox.window.cardMeanings.forEach((meaning, index) => {
  assert.equal(meaning.number, index);
});
assert.equal(sandbox.window.cardMeanings[13].name, "死神");

execFileSync("node", ["--check", path.join(root, "card-meanings.js")], { stdio: "pipe" });
execFileSync("node", ["--check", path.join(root, "script.js")], { stdio: "pipe" });
