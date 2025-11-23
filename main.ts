const game1 = document.getElementById('game1') as HTMLElement;
const game2 = document.getElementById('game2') as HTMLElement;
const game3 = document.getElementById('game3') as HTMLElement;
const finalScreen = document.getElementById('final') as HTMLElement;

show(game1);

// Mini-Game 1: Word Scramble
const game1Hint = document.getElementById('game1-hint') as HTMLElement;
let hiddenWord = '';
void loadRandomWord();

(window as any).checkPassword = function () {
  const inputField = document.getElementById('game1-answer-field');
  const answer = (inputField as HTMLInputElement).value.toLowerCase();
  if (answer === hiddenWord) {
    hide(game1);
    show(game2);
    game1Hint.classList.add('hidden');
  } else {
    inputField.classList.remove("shake");
    void inputField.offsetWidth;
    inputField.classList.add("shake");
    (inputField as HTMLInputElement).value = '';
  }
};

(window as any).showHintGame1 = function () {
  game1Hint.classList.toggle('hidden');
};

async function loadRandomWord() {
  const response = await fetch("data/hidden-words.json");
  const words = await response.json();

  hiddenWord = words[Math.floor(Math.random() * words.length)];

  if (game1) {
    const hiddenWordEl = document.querySelector('.hidden-word') as HTMLElement;
    hiddenWordEl.textContent = hiddenWord.toUpperCase();

    const coordinate = [
      {x: -50, y: -50},
      {x: -50, y: 150},
      {x: 100, y: -50},
      {x: 100, y: 150}
    ]

    hiddenWordEl.style.left = coordinate[Math.floor(Math.random() * coordinate.length)].x + "%";
    hiddenWordEl.style.top = coordinate[Math.floor(Math.random() * coordinate.length)].y + "%";
  }
}

// Mini-Game 2: Logic Puzzle
const game2Hint = document.getElementById('game2-hint') as HTMLElement;
(window as any).chooseBox = function (id?: string) {
  if (id === hiddenWord.length.toString()) {
    hide(game2);
    show(game3);
    game2Hint.classList.add('hidden');
    startMathGame();
  } else {
    window.location.reload();
  }
};

(window as any).showHintGame2 = function () {
  game2Hint.classList.toggle('hidden');
};

// Mini-Game 3: Memory Game with color animation
let intervalId = null;
let correctAnswer: number;

function startMathGame() {
  const numbers = [
    randomNumber(1000, 999999),
    randomNumber(1000, 999999),
    randomNumber(1000, 999999),
    randomNumber(1000, 999999)
  ];
  const ops = [randomOperator(), randomOperator(), randomOperator()];

  let result = calculate(numbers[0], numbers[1], ops[0]);
  result = calculate(result, numbers[2], ops[1]);
  result = calculate(result, numbers[3], ops[2]);

  correctAnswer = result;

  const operationEl = document.getElementById('game3-operation') as HTMLElement;
  operationEl.textContent = `${numbers[0]} ${ops[0]} ${numbers[1]} ${ops[1]} ${numbers[2]} ${ops[2]} ${numbers[3]}`;

  startTimer(30);
}

(window as any).solveMath = function () {
  const inputField = document.getElementById('game3-answer-field') as HTMLInputElement;
  const userAnswer = parseInt(inputField.value);
  if (userAnswer === correctAnswer) {
    stopTimer();
    hide(game3);
    show(finalScreen);
    startConfetti();
  } else {
    inputField.classList.remove("shake");
    void inputField.offsetWidth;
    inputField.classList.add("shake");
    (inputField as HTMLInputElement).value = '';
  }
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomOperator(): string {
  const operations = ['+', '-'];
  return operations[randomNumber(0, operations.length - 1)];
}

function calculate(a: number, b: number, op: string): number {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    default:
      return 0;
  }
}

function startTimer(count: number) {
  const timerEl = document.getElementById('timer') as HTMLElement;

  intervalId = setInterval(() => {
    timerEl.textContent = count.toString();
    count--;

    if (count < 0) {
      clearInterval(intervalId);
      window.location.reload();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
  console.log("Timer stopped!");
}

// Simple confetti effect
const colors = ['#FFC107', '#FF5722', '#4CAF50', '#2196F3', '#E91E63'];
const totalConfetti = 100;

function startConfetti() {
  for (let i = 0; i < totalConfetti; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.width = Math.random() * 8 + 4 + 'px';
    confetti.style.height = Math.random() * 8 + 4 + 'px';
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    confetti.style.animationDelay = Math.random() * 2 + 's';

    document.body.appendChild(confetti);

    // Remove confetti after animation completes
    confetti.addEventListener('animationend', () => {
      confetti.remove();
    });
  }
}

function show(el: HTMLElement) {
  el.style.display = 'block';
}

function hide(el: HTMLElement) {
  el.style.display = 'none';
}
