import { show, hide } from "./utils.js";
import { hiddenWord } from "./game1.js";
import { game2, game3 } from "./main.js";
import { startMathGame } from "./game3.js";

const hint = document.getElementById("game2-hint");

export function initGame2() {
  window.chooseBox = chooseBox;
  window.showHintGame2 = toggleHint;
}

function chooseBox(id) {
  if (id === hiddenWord.length.toString()) {
    hide(game2);
    show(game3);
    hint.classList.add("hidden");
    startMathGame();
  } else {
    location.reload();
  }
}

function toggleHint() {
  hint.classList.toggle("hidden");
}
