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

const cards = window.cardMeanings.map(({ name, number }) => ({
  name,
  number,
  image: `assets/images/${imageFiles[number]}`
}));


const translations = {
  ja: {
    promptLead: "見つめたい問いを、ひとつだけ心に置いてカードを引いてください。",
    promptExampleLabel: "問いの例",
    promptExample1: "この件で、自分は何を見逃しているか？",
    promptExample2: "この選択で、何を大切にしたいか？",
    promptExample3: "今日の自分に必要な視点は何か？",
    pickBefore: "上から",
    pickAfter: "番目",
    drawButton: "シャッフルして引く",
    sectionImage: "絵柄の解説",
    sectionPositive: "ポジティブなキーワード",
    sectionNegative: "ネガティブなキーワード",
    sectionTree: "生命の樹での位置づけ",
    wikiLink: "詳しくはこちら：Wikiで読む",
    promptAria: "カードを引く前の問い"
  },
  en: {
    promptLead: "Hold one question in mind, then draw a card.",
    promptExampleLabel: "Example questions",
    promptExample1: "What am I missing in this situation?",
    promptExample2: "What do I want to honor in this choice?",
    promptExample3: "What perspective do I need today?",
    pickBefore: "Draw the",
    pickAfter: "card from the top",
    drawButton: "Shuffle and Draw",
    sectionImage: "Image Reading",
    sectionPositive: "Positive Keywords",
    sectionNegative: "Negative Keywords",
    sectionTree: "Tree of Life Position",
    wikiLink: "Read more in the Wiki",
    promptAria: "Question before drawing a card"
  }
};

const wikiPages = [
  "00-Fool",
  "01-Magician",
  "02-High-Priestess",
  "03-Empress",
  "04-Emperor",
  "05-Hierophant",
  "06-Lovers",
  "07-Chariot",
  "08-Strength",
  "09-Hermit",
  "10-Wheel-of-Fortune",
  "11-Justice",
  "12-Hanged-Man",
  "13-Death",
  "14-Temperance",
  "15-Devil",
  "16-Tower",
  "17-Star",
  "18-Moon",
  "19-Sun",
  "20-Judgement",
  "21-World"
];

const deckEl = document.querySelector("#deck");
const resultEl = document.querySelector("#result");
const resultImage = document.querySelector("#resultImage");
const pickNumber = document.querySelector("#pickNumber");
const drawButton = document.querySelector("#drawButton");
const appEl = document.querySelector(".app");
const promptNote = document.querySelector("#promptNote");
const meaningSection = document.querySelector("#meaningSection");
const meaningTitle = document.querySelector("#meaningTitle");
const meaningImage = document.querySelector("#meaningImage");
const meaningPositive = document.querySelector("#meaningPositive");
const meaningNegative = document.querySelector("#meaningNegative");
const meaningTree = document.querySelector("#meaningTree");
const wikiLink = document.querySelector("#wikiLink");
const languageButtons = document.querySelectorAll("[data-lang]");
const translatableEls = document.querySelectorAll("[data-i18n]");

let deck = [...cards];
let currentLang = localStorage.getItem("drawTarotLanguage") === "en" ? "en" : "ja";
let currentCard = null;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function scrollToResult() {
  return new Promise(resolve => {
    const start = window.scrollY;
    const end = start + resultEl.getBoundingClientRect().top;
    const duration = 780;
    const startedAt = performance.now();

    function step(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      window.scrollTo(0, start + (end - start) * easeOutCubic(progress));
      if (progress < 1) {
        requestAnimationFrame(step);
        return;
      }
      resolve();
    }

    requestAnimationFrame(step);
  });
}

function shuffle(list) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function cutDeck(list, index) {
  return [...list.slice(index), ...list.slice(0, index)];
}

function renderDeck(cutIndex = null) {
  deckEl.innerHTML = "";
  deck.forEach((card, i) => {
    const el = document.createElement("div");
    el.className = "card";
    if (cutIndex !== null) {
      el.classList.add(i < cutIndex ? "cut-top" : "cut-bottom");
    }
    el.style.backgroundImage = "url(assets/images/card-back.jpg)";
    el.style.setProperty("--i", i);
    el.style.setProperty("--x", `${i * .9}px`);
    el.style.setProperty("--y", `${i * -.45}px`);
    el.style.setProperty("--r", `${(i - 11) * .18}deg`);
    el.dataset.number = card.number;
    deckEl.append(el);
  });
}

function getMeanings() {
  return currentLang === "en" ? window.cardMeaningsEn : window.cardMeanings;
}

function renderMeaning(card) {
  const meaning = getMeanings()[card.number];
  meaningTitle.textContent = `${card.number}. ${meaning.name}`;
  meaningImage.textContent = meaning.imageDescription;
  meaningPositive.textContent = meaning.positiveKeywords;
  meaningNegative.textContent = meaning.negativeKeywords;
  meaningTree.textContent = meaning.treeOfLife;
  wikiLink.href = `https://github.com/hnsol/draw-tarot/wiki/${wikiPages[card.number]}`;
  meaningSection.hidden = false;
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem("drawTarotLanguage", lang);
  translatableEls.forEach(el => {
    el.textContent = translations[lang][el.dataset.i18n];
  });
  promptNote.setAttribute("aria-label", translations[lang].promptAria);
  languageButtons.forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
  });
  if (currentCard) {
    renderMeaning(currentCard);
    resultImage.alt = `${currentCard.number}. ${getMeanings()[currentCard.number].name}`;
  }
}

async function draw() {
  drawButton.disabled = true;
  currentCard = null;
  appEl.classList.remove("has-result");
  meaningSection.hidden = true;
  resultEl.classList.remove("revealed");
  deckEl.classList.remove("cutting", "settled");

  deck = shuffle(cards);
  renderDeck();
  deckEl.classList.add("shuffling");
  setTimeout(() => promptNote.classList.add("is-hidden"), 260);
  await sleep(1200);
  deckEl.classList.remove("shuffling");

  const cutIndex = 1 + Math.floor(Math.random() * (deck.length - 1));
  renderDeck(cutIndex);
  deckEl.classList.add("cutting");
  await sleep(900);
  deck = cutDeck(deck, cutIndex);
  deckEl.classList.remove("cutting");
  renderDeck();
  await sleep(250);

  const nth = Math.min(Math.max(Number(pickNumber.value) || 1, 1), 22);
  pickNumber.value = nth;
  const selected = deck[nth - 1];
  const selectedEl = [...deckEl.children][nth - 1];

  resultImage.src = selected.image;
  currentCard = selected;
  resultImage.alt = `${selected.number}. ${getMeanings()[selected.number].name}`;
  renderMeaning(selected);
  resultEl.classList.add("revealed");
  appEl.classList.add("has-result");
  selectedEl.classList.add("drawn");
  await sleep(480);
  await scrollToResult();
  deck = deck.filter((_, i) => i !== nth - 1);
  renderDeck();
  deckEl.classList.add("settled");
  drawButton.disabled = false;
}

renderDeck();
setLanguage(currentLang);
drawButton.addEventListener("click", draw);
languageButtons.forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});
