var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var game1 = document.getElementById('game1');
var game2 = document.getElementById('game2');
var game3 = document.getElementById('game3');
var finalScreen = document.getElementById('final');
show(game1);
// Mini-Game 1: Word Scramble
var game1Hint = document.getElementById('game1-hint');
var hiddenWord = '';
void loadRandomWord();
window.checkPassword = function () {
    var inputField = document.getElementById('game1-answer-field');
    var answer = inputField.value.toLowerCase();
    if (answer === hiddenWord) {
        hide(game1);
        show(game2);
        game1Hint.classList.add('hidden');
    }
    else {
        inputField.classList.remove("shake");
        void inputField.offsetWidth;
        inputField.classList.add("shake");
        inputField.value = '';
    }
};
window.showHintGame1 = function () {
    game1Hint.classList.toggle('hidden');
};
function loadRandomWord() {
    return __awaiter(this, void 0, void 0, function () {
        var response, words, hiddenWordEl, coordinate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("data/hidden-words.json")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    words = _a.sent();
                    hiddenWord = words[Math.floor(Math.random() * words.length)];
                    if (game1) {
                        hiddenWordEl = document.querySelector('.hidden-word');
                        hiddenWordEl.textContent = hiddenWord.toUpperCase();
                        coordinate = [
                            { x: -50, y: -50 },
                            { x: -50, y: 150 },
                            { x: 100, y: -50 },
                            { x: 100, y: 150 }
                        ];
                        hiddenWordEl.style.left = coordinate[Math.floor(Math.random() * coordinate.length)].x + "%";
                        hiddenWordEl.style.top = coordinate[Math.floor(Math.random() * coordinate.length)].y + "%";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Mini-Game 2: Logic Puzzle
var game2Hint = document.getElementById('game2-hint');
window.chooseBox = function (id) {
    if (id === hiddenWord.length.toString()) {
        hide(game2);
        show(game3);
        game2Hint.classList.add('hidden');
        startMathGame();
    }
    else {
        window.location.reload();
    }
};
window.showHintGame2 = function () {
    game2Hint.classList.toggle('hidden');
};
// Mini-Game 3: Memory Game with color animation
var intervalId = null;
var correctAnswer;
function startMathGame() {
    var numbers = [
        randomNumber(1000, 999999),
        randomNumber(1000, 999999),
        randomNumber(1000, 999999),
        randomNumber(1000, 999999)
    ];
    var ops = [randomOperator(), randomOperator(), randomOperator()];
    var result = calculate(numbers[0], numbers[1], ops[0]);
    result = calculate(result, numbers[2], ops[1]);
    result = calculate(result, numbers[3], ops[2]);
    correctAnswer = result;
    var operationEl = document.getElementById('game3-operation');
    operationEl.textContent = "".concat(numbers[0], " ").concat(ops[0], " ").concat(numbers[1], " ").concat(ops[1], " ").concat(numbers[2], " ").concat(ops[2], " ").concat(numbers[3]);
    startTimer(30);
}
window.solveMath = function () {
    var inputField = document.getElementById('game3-answer-field');
    var userAnswer = parseInt(inputField.value);
    if (userAnswer === correctAnswer) {
        stopTimer();
        hide(game3);
        show(finalScreen);
        startConfetti();
    }
    else {
        inputField.classList.remove("shake");
        void inputField.offsetWidth;
        inputField.classList.add("shake");
        inputField.value = '';
    }
};
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomOperator() {
    var operations = ['+', '-'];
    return operations[randomNumber(0, operations.length - 1)];
}
function calculate(a, b, op) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        default:
            return 0;
    }
}
function startTimer(count) {
    var timerEl = document.getElementById('timer');
    intervalId = setInterval(function () {
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
var colors = ['#FFC107', '#FF5722', '#4CAF50', '#2196F3', '#E91E63'];
var totalConfetti = 100;
function startConfetti() {
    var _loop_1 = function (i) {
        var confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.width = Math.random() * 8 + 4 + 'px';
        confetti.style.height = Math.random() * 8 + 4 + 'px';
        confetti.style.animation = "fall ".concat(Math.random() * 3 + 2, "s linear forwards");
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
        // Remove confetti after animation completes
        confetti.addEventListener('animationend', function () {
            confetti.remove();
        });
    };
    for (var i = 0; i < totalConfetti; i++) {
        _loop_1(i);
    }
}
function show(el) {
    el.style.display = 'block';
}
function hide(el) {
    el.style.display = 'none';
}
