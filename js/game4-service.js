import {finalScreen, game4} from "./main.js";
import {hide, show} from "./utils/utils.js";
import {solutionGame1} from "./game1-service.js";
import {solutionGame3} from "./game3-service.js";
import {showNotification} from "./notification-service.js";
import {NotificationType} from "./model/notification-type.js";
import {initFinal} from "./final-screen-service.js";

export function initGame4() {
  window.chooseLifeOrDeathBox = chooseLifeOrDeathBox;
}

export let solutionGame4 = "";

function chooseLifeOrDeathBox(id) {
  let hiddenWordFromGame1 = solutionGame1;
  let solutionFromGame3 = solutionGame3;

  let correctBox;

  if (hiddenWordFromGame1.length % 2 === 0 && solutionFromGame3 % 2 === 0) {
    correctBox = "heart";
  } else if (hiddenWordFromGame1.length % 2 !== 0 && solutionFromGame3 % 2 === 0) {
    correctBox = "plant";
  } else if (hiddenWordFromGame1.length % 2 === 0 && solutionFromGame3 % 2 !== 0) {
    correctBox = "music";
  } else {
    correctBox = "star";
  }

  solutionGame4 = correctBox;

  if (id === correctBox) {
    showNotification(NotificationType.SUCCESS, 'Congratulation! 🏅');
    hide(game4);
    show(finalScreen);
    initFinal();
    startConfetti();
  } else {
    showNotification(NotificationType.ERROR, 'Wrong! Restarting... ↩️');
    setTimeout(() => {
      location.reload();
    }, 2500);
  }
}

function startConfetti() {
  const colors = ["#FFC107", "#FF5722", "#4CAF50", "#2196F3", "#E91E63"];

  for (let i = 0; i < 500; i++) {
    const div = document.createElement("div");
    div.classList.add("confetti");
    div.style.backgroundColor = colors[Math.floor(
        Math.random() * colors.length)];
    div.style.left = Math.random() * window.innerWidth + "px";
    div.style.width = Math.random() * 8 + 4 + "px";
    div.style.height = Math.random() * 8 + 4 + "px";
    div.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    div.style.animationDelay = Math.random() * 3 + "s";

    document.body.appendChild(div);
    div.addEventListener("animationend", () => div.remove());
  }
}
