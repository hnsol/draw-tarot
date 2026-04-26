const assert = require("node:assert");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const imageFiles = [
  "RWS_Tarot_00_Fool.jpg",
  "RWS_Tarot_01_Magician.jpg",
  "RWS_Tarot_02_High_Priestess.jpg",
  "RWS_Tarot_03_Empress.jpg",
  "RWS_Tarot_04_Emperor.jpg",
  "RWS_Tarot_05_Hierophant.jpg",
  "RWS_Tarot_06_Lovers.jpg",
  "RWS_Tarot_07_Chariot.jpg",
  "RWS_Tarot_08_Strength.jpg",
  "RWS_Tarot_09_Hermit.jpg",
  "RWS_Tarot_10_Wheel_of_Fortune.jpg",
  "RWS_Tarot_11_Justice.jpg",
  "RWS_Tarot_12_Hanged_Man.jpg",
  "RWS_Tarot_13_Death.jpg",
  "RWS_Tarot_14_Temperance.jpg",
  "RWS_Tarot_15_Devil.jpg",
  "RWS_Tarot_16_Tower.jpg",
  "RWS_Tarot_17_Star.jpg",
  "RWS_Tarot_18_Moon.jpg",
  "RWS_Tarot_19_Sun.jpg",
  "RWS_Tarot_20_Judgement.jpg",
  "RWS_Tarot_21_World.jpg"
];
const images = [
  "Waite–Smith_Tarot_Roses_and_Lilies_cropped.jpg",
  ...imageFiles
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
assert.match(html, /id="promptNote"/);
assert.match(html, /class="prompt-note"/);
assert.match(html, /いま見つめたい問いを、ひとつだけ心に置いてからカードを引いてください。/);
assert.match(html, /この件で、いま自分は何を見落としているか？/);
const stageStart = html.indexOf('class="stage"');
const promptNoteStart = html.indexOf('class="prompt-note"');
const controlsStart = html.indexOf('class="controls"');
const resultStart = html.indexOf('id="result"');
const meaningStart = html.indexOf('id="meaningSection"');
const stageHtml = html.slice(stageStart, controlsStart);
assert.ok(stageStart < promptNoteStart && promptNoteStart < controlsStart && controlsStart < resultStart && resultStart < meaningStart);
assert.match(stageHtml, /id="deck"/);
assert.match(stageHtml, /id="promptNote"/);
assert.doesNotMatch(stageHtml, /id="result"/);

const css = readText("style.css");
assert.match(css, /--card-ratio:\s*3\s*\/\s*5/);
assert.match(css, /aspect-ratio:\s*var\(--card-ratio\)/);
assert.match(css, /object-fit:\s*contain/);
assert.match(css, /\.result\.revealed/);
assert.match(css, /\.prompt-note\s*{/);
assert.match(css, /background:\s*rgba\(21,\s*18,\s*15,\s*\.62\)/);
assert.match(css, /backdrop-filter:\s*blur\(3px\)/);
assert.match(css, /\.prompt-note ul\s*{/);
assert.match(css, /\.prompt-note\.is-hidden\s*{/);
assert.match(css, /z-index:\s*120/);
assert.doesNotMatch(css, /\.result img\s*{[^}]*background:\s*rgba/);
assert.match(css, /\.app\.has-result/);
assert.match(css, /@media\s*\(max-width:\s*820px\)/);
assert.match(css, /grid-template-rows:\s*minmax\(0,\s*1fr\)\s*auto/);
assert.match(css, /max-height:\s*100svh/);
assert.match(css, /\.deck-area\s*{[\s\S]*min-height:\s*min\(460px,\s*58svh\)/);
assert.match(css, /\.result\s*{[\s\S]*min-height:\s*auto/);
assert.match(css, /width:\s*min\(340px,\s*90vw,\s*calc\(76svh\s*\*\s*3\s*\/\s*5\)\)/);
assert.match(css, /max-height:\s*76svh/);
assert.match(css, /\.card\.drawn\s*{[\s\S]*translate\(0,\s*140px\)/);
assert.match(css, /\.card\.drawn\s*{[\s\S]*transition:\s*transform\s*\.9s\s*cubic-bezier\(\.65,\s*0,\s*1,\s*\.8\)/);

const script = readText("script.js");
assert.match(script, /function cutDeck/);
assert.match(script, /上下入れ替え/);
assert.match(script, /renderMeaning/);
assert.match(script, /RWS_Tarot_19_Sun\.jpg/);
assert.match(script, /Waite–Smith_Tarot_Roses_and_Lilies_cropped\.jpg/);
assert.match(script, /resultEl\.classList\.add\("revealed"\)[\s\S]*selectedEl\.classList\.add\("drawn"\)/);
assert.match(script, /function easeOutCubic/);
assert.match(script, /function scrollToResult/);
assert.match(script, /promptNote\.classList\.add\("is-hidden"\)/);
assert.match(script, /requestAnimationFrame\(step\)/);
assert.match(script, /await sleep\(480\);[\s\S]*scrollToResult\(\)/);
assert.doesNotMatch(script, /scrollIntoView/);
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
