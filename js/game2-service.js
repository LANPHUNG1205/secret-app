import { show, hide } from "./utils/utils.js";
import { game2, game3 } from "./main.js";
import {startMathGame} from "./game3-service.js";
import {showNotification} from "./notification-service.js";
import {NotificationType} from "./model/notification-type.js";

export function initGame2() {
  window.chooseBox = chooseBox;
  window.showFirstHintGame2 = toggleFirstHint;
  window.showSecondHintGame2 = toggleSecondHint;
}

function chooseBox(id) {
  if (id === '1') {
    showNotification(NotificationType.SUCCESS, 'Easy, right? 😏');
    hide(game2);
    show(game3);
    startMathGame();
  } else if (id === '27') {
    document.getElementById('mystery-word').textContent = 'number one';
  } else {
    showNotification(NotificationType.ERROR, 'Wrong number! You must start again from the beginning 🔙');
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
}

function toggleFirstHint() {
  showNotification(NotificationType.HINT, 'Maybe your date of birth? 🍼');
}
function toggleSecondHint() {
  showNotification(NotificationType.HINT, 'Read the task again! 👀');
}
