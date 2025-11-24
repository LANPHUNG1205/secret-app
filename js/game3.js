import { show, hide, randomNumber, randomOperator, calculate } from "./utils.js";
import { game3, finalScreen } from "./main.js";

let intervalId = null;
let correctAnswer = null;

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

  const ops = [randomOperator(), randomOperator(), randomOperator()];

  let result = calculate(nums[0], nums[1], ops[0]);
  result = calculate(result, nums[2], ops[1]);
  result = calculate(result, nums[3], ops[2]);

  correctAnswer = result;

  document.getElementById("game3-operation").textContent =
      `${nums[0]} ${ops[0]} ${nums[1]} ${ops[1]} ${nums[2]} ${ops[2]} ${nums[3]}`;

  startTimer(30);
}

function solveMath() {
  const input = document.getElementById("game3-answer-field");
  const user = parseInt(input.value);

  if (user === correctAnswer) {
    stopTimer();
    hide(game3);
    show(finalScreen);
    startConfetti();
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
    timer.textContent = count.toString();
    count--;

    if (count < 0) {
      clearInterval(intervalId);
      location.reload();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function startConfetti() {
  const colors = ["#FFC107", "#FF5722", "#4CAF50", "#2196F3", "#E91E63"];

  for (let i = 0; i < 500; i++) {
    const div = document.createElement("div");
    div.classList.add("confetti");
    div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    div.style.left = Math.random() * window.innerWidth + "px";
    div.style.width = Math.random() * 8 + 4 + "px";
    div.style.height = Math.random() * 8 + 4 + "px";
    div.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    div.style.animationDelay = Math.random() * 3 + "s";

    document.body.appendChild(div);
    div.addEventListener("animationend", () => div.remove());
  }
}
