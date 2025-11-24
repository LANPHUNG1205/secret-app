export function show(el) {
  el.style.display = "block";
}

export function hide(el) {
  el.style.display = "none";
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomOperator() {
  const operations = ["+", "-"];
  return operations[randomNumber(0, operations.length - 1)];
}

export function calculate(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
  }
}
