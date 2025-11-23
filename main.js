var game1 = document.getElementById('game1');
var game2 = document.getElementById('game2');
var game3 = document.getElementById('game3');
var finalScreen = document.getElementById('final');
var colorSequenceDiv = document.getElementById('color-sequence');
function show(el) {
    el.style.display = 'block';
}
function hide(el) {
    el.style.display = 'none';
}
show(game1);
// Mini-Game 1: Word Scramble
window.solveScramble = function () {
    var answer = document.getElementById('answer1').value.toLowerCase().replace(/\s/g, '');
    if (answer === 'happiness') {
        hide(game1);
        show(game2);
    }
    else {
        document.getElementById('msg1').textContent = 'Incorrect 😢';
    }
};
window.showHint = function () {
    document.getElementById('game1-hint').textContent = 'Find somewhere out of the box...';
};
// Mini-Game 2: Logic Puzzle (Clickable Boxes
window.handleClick = function (id) {
    if (id === 'box1') {
        hide(game2);
        show(game3);
        startMemoryGame();
    }
    else {
        document.getElementById('msg2').textContent = 'Nope, try another box!';
    }
};
// Mini-Game 3: Memory Game with color animation
var memorySequence = '';
function startMemoryGame() {
    var colors = ['R', 'G', 'B', 'Y', 'P'];
    memorySequence = colors.sort(function () { return 0.5 - Math.random(); }).slice(0, 5).join('');
    animateSequence(memorySequence);
}
function animateSequence(seq) {
    var index = 0;
    colorSequenceDiv.textContent = '';
    var interval = setInterval(function () {
        colorSequenceDiv.textContent = seq[index];
        colorSequenceDiv.style.color = getColor(seq[index]);
        index++;
        if (index >= seq.length) {
            clearInterval(interval);
            setTimeout(function () {
                colorSequenceDiv.textContent = '???';
                colorSequenceDiv.style.color = 'black';
            }, 500);
        }
    }, 800);
}
function getColor(letter) {
    switch (letter) {
        case 'R':
            return 'red';
        case 'G':
            return 'green';
        case 'B':
            return 'blue';
        case 'Y':
            return 'yellow';
        case 'P':
            return 'purple';
        default:
            return 'black';
    }
}
window.solveMemory = function () {
    var answer = document.getElementById('answer3').value.toUpperCase().trim();
    if (answer === memorySequence) {
        hide(game3);
        show(finalScreen);
        startConfetti();
    }
    else {
        document.getElementById('msg3').textContent = 'Nope, try again 😉';
    }
};
// Simple confetti effect
function startConfetti() {
    var confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    document.body.appendChild(confettiContainer);
    for (var i = 0; i < 100; i++) {
        var confetti = document.createElement('div');
        confetti.textContent = '🎉';
        confetti.style.position = 'absolute';
        confetti.style.fontSize = "".concat(Math.random() * 20 + 10, "px");
        confetti.style.left = "".concat(Math.random() * 100, "%");
        confetti.style.top = "".concat(Math.random() * 100, "%");
        confettiContainer.appendChild(confetti);
    }
    setTimeout(function () { return confettiContainer.remove(); }, 5000);
}
;
