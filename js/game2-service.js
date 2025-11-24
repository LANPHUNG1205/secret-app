import { show, hide } from "./utils/utils.js";
import { hiddenWord } from "./game1-service.js";
import { game2, game3 } from "./main.js";
import { startMathGame } from "./game3-service.js";
import {showNotification} from "./notification-service.js";
import {NotificationType} from "./model/notification-type.js";

export function initGame2() {
  window.chooseBox = chooseBox;
  window.showHintGame2 = toggleHint;
}

function chooseBox(id) {
  if (id === hiddenWord.length.toString()) {
    showNotification(NotificationType.SUCCESS, 'Easy, right? 😏');
    hide(game2);
    show(game3);
    startMathGame();
  } else {
    showNotification(NotificationType.ERROR, 'Wrong number! You must start again from the beginning 😹');
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
}

function toggleHint() {
  showNotification(NotificationType.HINT, 'Think about the previous password 💭');
}
