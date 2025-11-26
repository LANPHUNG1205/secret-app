export function show(el) {
  el.style.display = "block";
}

export function hide(el) {
  el.style.display = "none";
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
