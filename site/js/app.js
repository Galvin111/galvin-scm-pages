// Caption Lab — counts characters, words and hashtags against platform limits.
// Author: Galvin Venturina (BSCS3A)

const PLATFORMS = [
  { name: "X (Twitter)", limit: 280 },
  { name: "Instagram", limit: 2200 },
  { name: "Story text (my rule)", limit: 125 }
];

const PRESETS = {
  curry: "Monday cravings, sorted. 🍛 Katsu curry, extra roux, zero regrets. Swing by Times Square on your lunch break. #GoGoCurry #TimesSquareEats #NYCFood #JapaneseCurry",
  lumpia: "Crispy, golden, and rolled by hand every morning. 🥢 Grab a dozen for the office or book us for your next party. #HelloLumpia #JaxEats #FilipinoFood #Lumpia",
  clear: ""
};

const captionInput = document.getElementById("caption");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const tagCount = document.getElementById("tag-count");
const limitsList = document.getElementById("limits");

function countCharacters(text) {
  // Spread the string so emoji count as one character each.
  return [...text].length;
}

function countWords(text) {
  const trimmed = text.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

function countHashtags(text) {
  const matches = text.match(/#[\p{L}\p{N}_]+/gu);
  return matches ? matches.length : 0;
}

function renderLimits(chars) {
  limitsList.innerHTML = "";

  PLATFORMS.forEach((platform) => {
    const ratio = chars / platform.limit;
    const percent = Math.min(ratio * 100, 100);

    const row = document.createElement("li");
    row.className = "limit-row";
    if (ratio > 1) {
      row.classList.add("over");
    } else if (ratio >= 0.9) {
      row.classList.add("warn");
    }

    const remaining = platform.limit - chars;
    const status = remaining >= 0 ? `${remaining} left` : `${Math.abs(remaining)} over`;

    row.innerHTML = `
      <div class="limit-top">
        <span>${platform.name}</span>
        <span class="mono">${chars} / ${platform.limit} · ${status}</span>
      </div>
      <div class="bar"><span style="width:${percent}%"></span></div>
    `;

    limitsList.appendChild(row);
  });
}

function update() {
  const text = captionInput.value;
  const chars = countCharacters(text);

  charCount.textContent = chars;
  wordCount.textContent = countWords(text);
  tagCount.textContent = countHashtags(text);
  renderLimits(chars);
}

document.querySelectorAll("[data-preset]").forEach((button) => {
  button.addEventListener("click", () => {
    captionInput.value = PRESETS[button.dataset.preset];
    captionInput.focus();
    update();
  });
});

captionInput.addEventListener("input", update);

document.getElementById("year").textContent = new Date().getFullYear();

update();
