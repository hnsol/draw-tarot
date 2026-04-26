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
  image: `images/${imageFiles[number]}`
}));

const deckEl = document.querySelector("#deck");
const resultEl = document.querySelector("#result");
const resultImage = document.querySelector("#resultImage");
const pickNumber = document.querySelector("#pickNumber");
const drawButton = document.querySelector("#drawButton");
const statusEl = document.querySelector("#status");
const appEl = document.querySelector(".app");
const meaningSection = document.querySelector("#meaningSection");
const meaningTitle = document.querySelector("#meaningTitle");
const meaningImage = document.querySelector("#meaningImage");
const meaningPositive = document.querySelector("#meaningPositive");
const meaningNegative = document.querySelector("#meaningNegative");
const meaningTree = document.querySelector("#meaningTree");

let deck = [...cards];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function scrollToResult() {
  const start = window.scrollY;
  const end = start + resultEl.getBoundingClientRect().top;
  const duration = 780;
  const startedAt = performance.now();

  function step(now) {
    const progress = Math.min((now - startedAt) / duration, 1);
    window.scrollTo(0, start + (end - start) * easeOutCubic(progress));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
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
    el.style.backgroundImage = "url(images/Waite–Smith_Tarot_Roses_and_Lilies_cropped.jpg)";
    el.style.setProperty("--i", i);
    el.style.setProperty("--x", `${i * .9}px`);
    el.style.setProperty("--y", `${i * -.45}px`);
    el.style.setProperty("--r", `${(i - 11) * .18}deg`);
    el.dataset.number = card.number;
    deckEl.append(el);
  });
}

function renderMeaning(card) {
  const meaning = window.cardMeanings[card.number];
  meaningTitle.textContent = `${card.number}. ${card.name}`;
  meaningImage.textContent = meaning.imageDescription;
  meaningPositive.textContent = meaning.positiveKeywords;
  meaningNegative.textContent = meaning.negativeKeywords;
  meaningTree.textContent = meaning.treeOfLife;
  meaningSection.hidden = false;
}

async function draw() {
  drawButton.disabled = true;
  appEl.classList.remove("has-result");
  meaningSection.hidden = true;
  resultEl.classList.remove("revealed");
  deckEl.classList.remove("cutting");
  statusEl.textContent = "シャッフル中";

  deck = shuffle(cards);
  renderDeck();
  deckEl.classList.add("shuffling");
  await sleep(1200);
  deckEl.classList.remove("shuffling");

  const cutIndex = 1 + Math.floor(Math.random() * (deck.length - 1));
  statusEl.textContent = `カット: ${cutIndex}枚目で上下入れ替え`;
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

  statusEl.textContent = `上から${nth}番目`;
  resultImage.src = selected.image;
  resultImage.alt = `${selected.number}. ${selected.name}`;
  renderMeaning(selected);
  resultEl.classList.add("revealed");
  appEl.classList.add("has-result");
  selectedEl.classList.add("drawn");
  await sleep(480);
  scrollToResult();
  await sleep(520);
  statusEl.textContent = `${selected.number}. ${selected.name}`;
  drawButton.disabled = false;
}

renderDeck();
drawButton.addEventListener("click", draw);
