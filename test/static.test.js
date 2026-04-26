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
  "card-back.jpg",
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
  const file = path.join("assets", "images", image);
  assert.ok(fs.existsSync(path.join(root, file)), `${file} is missing`);
  const info = identify(file);
  assert.ok(info.height > info.width, `${file} must be portrait (${info.width}x${info.height})`);
  assert.ok(
    info.orientation === "TopLeft" || info.orientation === "Undefined",
    `${file} orientation must be normalized`
  );
}

const html = readText("index.html");
assert.match(html, /href="assets\/css\/style\.css"/);
assert.match(html, /src="assets\/js\/card-meanings\.js"[\s\S]*src="assets\/js\/card-meanings\.en\.js"[\s\S]*src="assets\/js\/script\.js"/);
assert.match(html, /src="assets\/js\/script\.js"/);
assert.match(html, /id="meaningSection"/);
assert.match(html, /id="wikiLink"/);
assert.match(html, /id="promptNote"/);
assert.doesNotMatch(html, /id="status"/);
assert.doesNotMatch(html, /大アルカナ22枚/);
assert.match(html, /class="prompt-note"/);
assert.match(html, /class="prompt-note__example" data-i18n="promptExampleLabel">問いの例/);
assert.match(html, /見つめたい問いを、ひとつだけ心に置いてカードを引いてください。/);
assert.match(html, /この件で、自分は何を見逃しているか？/);
assert.match(html, /class="language-switch"/);
assert.match(html, /data-lang="ja"[\s\S]*data-lang="en"/);
assert.match(html, /data-i18n="drawButton"/);
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

const css = readText("assets/css/style.css");
assert.match(css, /--card-ratio:\s*3\s*\/\s*5/);
assert.match(css, /aspect-ratio:\s*var\(--card-ratio\)/);
assert.match(css, /object-fit:\s*contain/);
assert.match(css, /\.result\.revealed/);
assert.match(css, /\.prompt-note\s*{/);
assert.match(css, /\.prompt-note__example\s*{/);
assert.match(css, /background:\s*rgba\(21,\s*18,\s*15,\s*\.62\)/);
assert.match(css, /backdrop-filter:\s*blur\(3px\)/);
assert.match(css, /transition:\s*opacity\s*\.7s\s*ease,\s*transform\s*\.7s\s*ease,\s*visibility\s*\.7s\s*ease/);
assert.match(css, /\.prompt-note ul\s*{/);
assert.match(css, /\.prompt-note\.is-hidden\s*{/);
assert.match(css, /z-index:\s*120/);
assert.doesNotMatch(css, /\.result img\s*{[^}]*background:\s*rgba/);
assert.match(css, /\.app\.has-result/);
assert.match(css, /\.app\.has-result\s*{[\s\S]*padding-bottom:\s*6px/);
assert.match(css, /@media\s*\(max-width:\s*820px\)/);
assert.match(css, /min-height:\s*100dvh/);
assert.match(css, /padding:\s*42px\s*8px\s*calc\(128px\s*\+\s*env\(safe-area-inset-bottom\)\)/);
assert.match(css, /align-content:\s*center/);
assert.match(css, /overflow:\s*visible/);
assert.doesNotMatch(css, /#status/);
assert.match(css, /\.language-switch\s*{/);
assert.match(css, /\.language-switch\s*{[\s\S]*position:\s*fixed/);
assert.match(css, /\.language-switch\s*{[\s\S]*top:\s*12px/);
assert.match(css, /\.language-switch\s*{[\s\S]*right:\s*12px/);
assert.match(css, /\.language-switch__button\s*{[\s\S]*width:\s*82px/);
assert.match(css, /\.wiki-link\s*{/);
assert.match(css, /\.language-switch__button\[aria-pressed="true"\]/);
assert.match(css, /@media\s*\(max-width:\s*820px\)[\s\S]*\.language-switch__button\s*{[\s\S]*width:\s*74px/);
assert.match(css, /\.app\.has-result \.language-switch\s*{[\s\S]*position:\s*static/);
assert.match(css, /\.app\.has-result \.language-switch\s*{[\s\S]*justify-content:\s*flex-end/);
assert.match(css, /\.stage\s*{[\s\S]*min-height:\s*min\(620px,\s*calc\(100dvh\s*-\s*150px\)\)/);
assert.match(css, /\.deck-area\s*{[\s\S]*min-height:\s*min\(500px,\s*62dvh\)/);
assert.match(css, /\.deck-area\s*{[\s\S]*overflow:\s*visible/);
assert.match(css, /\.deck\s*{[\s\S]*width:\s*min\(190px,\s*50vw\)/);
assert.match(css, /\.controls\s*{[\s\S]*position:\s*fixed/);
assert.match(css, /\.controls\s*{[\s\S]*bottom:\s*calc\(12px\s*\+\s*env\(safe-area-inset-bottom\)\)/);
assert.match(css, /\.app\.has-result \.controls\s*{[\s\S]*position:\s*static/);
assert.match(css, /\.app\.has-result \.controls\s*{[\s\S]*bottom:\s*auto/);
assert.match(css, /\.result\s*{[\s\S]*min-height:\s*auto/);
assert.match(css, /width:\s*min\(340px,\s*90vw,\s*calc\(76svh\s*\*\s*3\s*\/\s*5\)\)/);
assert.match(css, /max-height:\s*76svh/);
assert.match(css, /\.deck\.settled \.card\s*{[\s\S]*translate\(0,\s*0\)\s*rotate\(0deg\)/);
assert.match(css, /\.card\.drawn\s*{[\s\S]*translate\(0,\s*140px\)/);
assert.match(css, /\.card\.drawn\s*{[\s\S]*transition:\s*transform\s*\.9s\s*cubic-bezier\(\.65,\s*0,\s*1,\s*\.8\)/);

const script = readText("assets/js/script.js");
assert.match(script, /function cutDeck/);
assert.doesNotMatch(script, /statusEl|#status/);
assert.match(script, /renderMeaning/);
assert.match(script, /RWS_Tarot_19_Sun\.jpg/);
assert.match(script, /assets\/images\/card-back\.jpg/);
assert.match(script, /resultEl\.classList\.add\("revealed"\)[\s\S]*selectedEl\.classList\.add\("drawn"\)/);
assert.match(script, /function easeOutCubic/);
assert.match(script, /function scrollToResult/);
assert.match(script, /const translations =/);
assert.match(script, /const wikiPages =/);
assert.match(script, /00-Fool/);
assert.match(script, /21-World/);
assert.match(script, /wikiLink\.href = `https:\/\/github\.com\/hnsol\/draw-tarot\/wiki\/\$\{wikiPages\[card\.number\]\}`/);
assert.match(script, /function setLanguage/);
assert.match(script, /window\.cardMeaningsEn/);
assert.match(script, /localStorage\.setItem\("drawTarotLanguage", lang\)/);
assert.match(script, /document\.documentElement\.lang = lang/);
assert.match(script, /Hold one question in mind, then draw a card\./);
assert.match(script, /return new Promise\(resolve =>/);
assert.match(script, /deckEl\.classList\.add\("shuffling"\)[\s\S]*setTimeout\(\(\)\s*=>\s*promptNote\.classList\.add\("is-hidden"\),\s*260\)/);
assert.match(script, /requestAnimationFrame\(step\)/);
assert.match(script, /await sleep\(480\);[\s\S]*await scrollToResult\(\)/);
assert.match(script, /deck = deck\.filter\(\(_,\s*i\)\s*=>\s*i !== nth - 1\)/);
assert.match(script, /deckEl\.classList\.add\("settled"\)/);
assert.match(script, /deckEl\.classList\.remove\("cutting",\s*"settled"\)/);
assert.doesNotMatch(script, /scrollIntoView/);
assert.doesNotMatch(script, /await sleep\(650\);[\s\S]*scrollIntoView/);
assert.doesNotMatch(script, /cutMark/);

const meaningCode = readText("assets/js/card-meanings.js");
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

const englishMeaningCode = readText("assets/js/card-meanings.en.js");
vm.runInNewContext(englishMeaningCode, sandbox);
assert.equal(sandbox.window.cardMeaningsEn.length, 22);
for (const meaning of sandbox.window.cardMeaningsEn) {
  assert.equal(typeof meaning.number, "number");
  assert.equal(typeof meaning.name, "string");
  assert.equal(typeof meaning.imageDescription, "string");
  assert.equal(typeof meaning.positiveKeywords, "string");
  assert.equal(typeof meaning.negativeKeywords, "string");
  assert.equal(typeof meaning.treeOfLife, "string");
}
sandbox.window.cardMeaningsEn.forEach((meaning, index) => {
  assert.equal(meaning.number, index);
});
assert.equal(sandbox.window.cardMeaningsEn[13].name, "Death");

execFileSync("node", ["--check", path.join(root, "assets/js/card-meanings.js")], { stdio: "pipe" });
execFileSync("node", ["--check", path.join(root, "assets/js/card-meanings.en.js")], { stdio: "pipe" });
execFileSync("node", ["--check", path.join(root, "assets/js/script.js")], { stdio: "pipe" });
