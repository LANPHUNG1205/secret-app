import { show, hide } from "./utils/utils.js";
import { game1, game2 } from "./main.js";
import { showNotification } from "./notification-service.js";
import {NotificationType} from "./model/notification-type.js";

export let hiddenWord = "";

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
    showNotification(NotificationType.SUCCESS, 'You are top, bro! 😎');
    hide(game1);
    show(game2);
  } else {
    input.classList.remove("shake");
    void input.offsetWidth;
    input.classList.add("shake");
    input.value = "";
  }
}

function toggleHint() {
  showNotification(NotificationType.HINT, 'Find somewhere out of the box 💭');
}
