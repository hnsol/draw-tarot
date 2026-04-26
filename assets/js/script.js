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

const englishCardMeanings = [
  ["The Fool", "A young traveler steps toward a cliff with a white dog nearby. The image suggests risk, innocence, and the freedom of an unformed beginning.", "Freedom, beginning, possibility, innocence, adventure. Step lightly into what has not taken shape yet.", "Carelessness, lack of planning, escape, inattention, immaturity. Optimism may be hiding a real edge.", "In the Golden Dawn system, The Fool is Aleph, the 11th path from Kether to Chokmah: the first motion flowing out from the source."],
  ["The Magician", "One hand points upward and one downward, with the four suit tools on the table. The card links will, skill, and manifestation.", "Will, skill, focus, creation, action. Gather your tools and turn an idea into form.", "Manipulation, show, scattered talent, deception. Technique without purpose can drift away from truth.", "The Magician is Beth, the 12th path from Kether to Binah: spiritual force translated into word and form."],
  ["The High Priestess", "A quiet figure sits between dark and light pillars, holding hidden knowledge behind a veil.", "Intuition, silence, insight, receptivity, inner knowing. Let the unseen structure become clear.", "Secrecy, passivity, withholding, suspended judgment. Silence can become stagnation.", "The High Priestess is Gimel, the 13th path from Kether to Tiphereth: the source descending toward the inner center."],
  ["The Empress", "A crowned woman sits among wheat, trees, and flowing water. The scene evokes beauty, fertility, and embodied abundance.", "Abundance, care, sensitivity, creativity, receptivity. Grow what needs warmth and time.", "Overprotection, indulgence, dependence, excess feeling. Comfort can blur boundaries.", "The Empress is Daleth, the 14th path from Chokmah to Binah: force and form joining as a generative womb."],
  ["The Emperor", "A ruler sits on a stone throne before bare mountains. The image emphasizes authority, boundaries, and responsibility.", "Leadership, stability, responsibility, structure, judgment. Give the situation a durable frame.", "Control, rigidity, pressure, dependence on authority. Order can harden into domination.", "The Emperor is Heh, the 15th path from Chokmah to Tiphereth: creative force directed toward central order."],
  ["The Hierophant", "A teacher blesses two followers between temple pillars. Keys and ritual point to tradition and shared learning.", "Tradition, learning, trust, counsel, ethics, community. Receive wisdom through a tested form.", "Formalism, blind authority, pressure to conform, conservatism. A form without understanding becomes hollow.", "The Hierophant is Vav, the 16th path from Chokmah to Chesed: wisdom expanding into teaching and institution."],
  ["The Lovers", "Two figures stand beneath an angel. The scene speaks of love, choice, temptation, and alignment of values.", "Choice, harmony, relationship, love, shared values. Choose with both heart and will.", "Indecision, dependence, temptation, mismatch. Pleasure and truth may be confused.", "The Lovers is Zayin, the 17th path from Binah to Tiphereth: deep understanding becoming central choice."],
  ["The Chariot", "An armored figure stands in a chariot drawn by opposing sphinxes. Direction comes through inner command.", "Progress, control, victory, focus, direction. Gather opposing forces and move.", "Forcefulness, conflict, overdefense, going alone. Motion can become its own excuse.", "The Chariot is Cheth, the 18th path from Binah to Geburah: structure becoming disciplined force."],
  ["Strength", "A calm woman touches a lion without violence. The card shows patient courage and gentle mastery.", "Courage, patience, inner strength, kindness, self-command. Work with instinct instead of crushing it.", "Repression, fear, anger, self-doubt, misuse of force. Gentleness may become avoidance.", "Strength is Teth, the 19th path from Chesed to Geburah: mercy and severity maturing into balanced power."],
  ["The Hermit", "An old figure stands on a snowy height with a small lantern. The light is quiet and inward.", "Reflection, search, caution, wisdom, concentration. Step back and find the small light you can trust.", "Isolation, withdrawal, overcriticism, delay. Solitude can become defense.", "The Hermit is Yod, the 20th path from Chesed to Tiphereth: expanded wisdom returning to the center."],
  ["Wheel of Fortune", "A great wheel turns among symbolic figures. The card shows cycles, timing, chance, and order.", "Turning point, cycle, opportunity, change, flow. Notice when the situation begins to move.", "Instability, passivity, repetition, leaving things to luck. You may be carried instead of choosing.", "The Wheel is Kaph, the 21st path from Chesed to Netzach: large order becoming emotional movement."],
  ["Justice", "A seated figure holds scales and a sword. Balance and clear judgment stand in the foreground.", "Fairness, balance, judgment, responsibility, clarity. Decide by seeing the conditions plainly.", "Coldness, overjudgment, indecision, rigid fairness. Correctness can miss human texture.", "Justice is Lamed, the 22nd path from Geburah to Tiphereth: severity refined into harmonious judgment."],
  ["The Hanged Man", "A figure hangs upside down, calm and illuminated. The reversal suggests surrender and a changed view.", "Perspective, acceptance, pause, insight, release. Stopping may reveal what action cannot.", "Stagnation, helplessness, delay, resignation. Waiting can become an excuse.", "The Hanged Man is Mem, the 23rd path from Geburah to Hod: limitation turning into understanding."],
  ["Death", "A black-armored rider advances as the sun rises beyond the towers. The image points to ending, change, and renewal.", "Transformation, ending, clearing, renewal, transition. Close what has finished so the next stage has room.", "Attachment, grief, fear of change, resistance. Holding the old shape may deepen pain.", "Death is Nun, the 24th path from Tiphereth to Netzach: the center passing through desire and life-force into change."],
  ["Temperance", "An angel blends water between cups, one foot on land and one in water. Different elements are being harmonized.", "Harmony, moderation, integration, recovery, adjustment. Let extremes become a workable flow.", "Half-measures, delay, overcompromise, dilution. Balance can hide a missing decision.", "Temperance is Samekh, the 25th path from Tiphereth to Yesod: central harmony settling into the deep foundation."],
  ["The Devil", "Two chained figures stand before a dark presence. The loose chains suggest bondage that can be seen and changed.", "Reality, desire, embodiment, focus, understanding the shadow. Face the motives you usually avoid.", "Dependence, attachment, control, temptation, self-deception. The chain may be removable.", "The Devil is Ayin, the 26th path from Tiphereth to Hod: the self understanding desire through language and analysis."],
  ["The Tower", "Lightning strikes a high tower and figures fall. A false structure breaks open.", "Release, revelation, renewal, awakening, structural review. Collapse can expose what was already strained.", "Shock, confusion, breakdown, pride, resistance. Ignored warnings may arrive all at once.", "The Tower is Peh, the 27th path from Netzach to Hod: emotion and intellect shaking fixed structures."],
  ["The Star", "A woman pours water beneath a sky of stars. The card is quiet, transparent, and restorative.", "Hope, healing, clarity, trust, long view. Tend the future without demanding immediate proof.", "Idealization, escape, excessive expectation, passivity. Hope can become distance from the ground.", "The Star is Tzaddi, the 28th path from Netzach to Yesod: emotional hope flowing into the deep image-world."],
  ["The Moon", "A moonlit path runs between towers while animals call from below. The light is real but unclear.", "Imagination, dreams, sensitivity, unconscious, caution. Move carefully through ambiguity.", "Illusion, anxiety, confusion, projection, doubt. Fear may be shaping what you see.", "The Moon is Qoph, the 29th path from Netzach to Malkuth: emotional images influencing the visible world."],
  ["The Sun", "A child rides a white horse under a bright sun. The card is direct, open, and alive.", "Vitality, clarity, success, joy, openness. Let expression and simple truth carry you.", "Overoptimism, childishness, self-focus, oversimplification. Brightness can miss complexity.", "The Sun is Resh, the 30th path from Hod to Yesod: understood light reaching the deep foundation."],
  ["Judgement", "An angel sounds a trumpet as figures rise from coffins. The past calls for response and renewal.", "Reassessment, awakening, response, renewal, forgiveness. Integrate the past and answer the call.", "Regret, criticism, unfinished work, ignoring the call. Judgment can block rebirth.", "Judgement is Shin, the 31st path from Hod to Malkuth: understanding descending into action."],
  ["The World", "A dancer moves within a wreath, surrounded by four symbols. Completion is alive, not static.", "Completion, integration, achievement, wholeness, threshold. A cycle has formed enough to become a new beginning.", "Clinging to completion, closure, emptiness after success, inability to finish. The next cycle is waiting.", "The World is Tav, the 32nd path from Yesod to Malkuth: the inner image appearing as concrete world."]
].map(([name, imageDescription, positiveKeywords, negativeKeywords, treeOfLife], number) => ({
  number,
  name,
  imageDescription,
  positiveKeywords,
  negativeKeywords,
  treeOfLife
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
    promptAria: "Question before drawing a card"
  }
};

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
  return currentLang === "en" ? englishCardMeanings : window.cardMeanings;
}

function renderMeaning(card) {
  const meaning = getMeanings()[card.number];
  meaningTitle.textContent = `${card.number}. ${meaning.name}`;
  meaningImage.textContent = meaning.imageDescription;
  meaningPositive.textContent = meaning.positiveKeywords;
  meaningNegative.textContent = meaning.negativeKeywords;
  meaningTree.textContent = meaning.treeOfLife;
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
