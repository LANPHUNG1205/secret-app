import { show, hide } from "./utils.js";
import { game1, game2 } from "./main.js";

export let hiddenWord = "";
const hint = document.getElementById("game1-hint");

export async function initGame1() {
  await loadRandomWord();

  window.checkPassword = checkPassword;
  window.showHintGame1 = toggleHint;
}

async function loadRandomWord() {
  const response = await fetch("data/hidden-words.json");
  const words = await response.json();

  hiddenWord = words[Math.floor(Math.random() * words.length)];

  const el = document.querySelector(".hidden-word");
  el.textContent = hiddenWord.toUpperCase();

  const pos = [
    { x: -50, y: -50 },
    { x: -50, y: 150 },
    { x: 100, y: -50 },
    { x: 100, y: 150 },
  ];

  const p = pos[Math.floor(Math.random() * pos.length)];

  el.style.left = p.x + "%";
  el.style.top = p.y + "%";
}

function checkPassword() {
  const input = document.getElementById("game1-answer-field");
  const answer = input.value.toLowerCase();

  if (answer === hiddenWord) {
    hide(game1);
    show(game2);
    hint.classList.add("hidden");
  } else {
    input.classList.remove("shake");
    void input.offsetWidth;
    input.classList.add("shake");
    input.value = "";
  }
}

function toggleHint() {
  hint.classList.toggle("hidden");
}
