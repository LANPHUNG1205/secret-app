import {finalScreen, game4} from "./main.js";
import {hide, show} from "./utils/utils.js";
import {hiddenWord} from "./game1-service.js";
import {correctAnswer} from "./game3-service.js";
import {showNotification} from "./notification-service.js";
import {NotificationType} from "./model/notification-type.js";

export function initGame4() {
  window.chooseLifeOrDeathBox = chooseLifeOrDeathBox;
}

function chooseLifeOrDeathBox(id) {
  let hiddenWordFromGame1 = hiddenWord;
  let solutionFromGame3 = correctAnswer;

  let correctBox;

  if (hiddenWordFromGame1.length % 2 === 0 && solutionFromGame3 % 2 === 0) {
    correctBox = "red";
  } else if (hiddenWordFromGame1.length % 2 !== 0 && solutionFromGame3 % 2 === 0) {
    correctBox = "green";
  } else if (hiddenWordFromGame1.length % 2 === 0 && solutionFromGame3 % 2 !== 0) {
    correctBox = "blue";
  } else {
    correctBox = "yellow";
  }

  if (id === correctBox) {
    showNotification(NotificationType.SUCCESS, 'Congratulation! 🏅');
    hide(game4);
    show(finalScreen);
    startConfetti();
  } else {
    showNotification(NotificationType.ERROR, 'Wrong color! Back to the beginning! ↩️');
    setTimeout(() => {
      location.reload();
    }, 3000);
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
