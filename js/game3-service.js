import { show, hide, randomNumber } from "./utils/utils.js";
import {game3, game4} from "./main.js";
import {showNotification} from "./notification-service.js";
import {NotificationType} from "./model/notification-type.js";

let intervalId = null;
export let solutionGame3 = null;

export function initGame3() {
  window.solveMath = solveMath;
}

export function startMathGame() {
  const nums = [
    randomNumber(1000, 999999),
    randomNumber(1000, 999999),
    randomNumber(1000, 999999),
    randomNumber(1000, 999999),
  ];

  let result = nums[0];
  let ops = [];

  for (let i = 1; i < nums.length; i++) {
    const next = nums[i];
    let op;
    if (Math.random() < 0.5 && result > next) {
      op = "-";
      result -= next;
    } else {
      op = "+";
      result += next;
    }

    ops.push(op);
  }

  solutionGame3 = result;

  document.getElementById("game3-operation").textContent =
      `${nums[0]} ${ops[0]} ${nums[1]} ${ops[1]} ${nums[2]} ${ops[2]} ${nums[3]}`;

  startTimer(45);
}

function solveMath() {
  const input = document.getElementById("game3-answer-field");
  const user = parseInt(input.value.trim().replace(/[.,\s]/g, ''));

  if (user === solutionGame3) {
    showNotification(NotificationType.SUCCESS, 'You are almost there! 🙌');
    stopTimer();
    hide(game3);
    show(game4);
  } else {
    input.classList.remove("shake");
    void input.offsetWidth;
    input.classList.add("shake");
    input.value = "";
  }
}

function startTimer(count) {
  const timer = document.getElementById("timer");

  intervalId = setInterval(() => {
    timer.textContent = `${count.toString()}s`;
    count--;

    if (count < 0) {
      clearInterval(intervalId);
      document.querySelectorAll('button').forEach(btn => btn.disabled = true);
      showNotification(NotificationType.ERROR, 'Time out! ⏰ You will be logged out in seconds...');
      document.getElementById("game3-check-button").disabled = true;
      setTimeout(() => {
        location.reload();
      }, 2500);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}
