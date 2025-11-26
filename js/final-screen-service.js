import {solutionGame1} from "./game1-service.js";
import {solutionGame3} from "./game3-service.js";
import {solutionGame4} from "./game4-service.js";
import {solutionGame2} from "./game2-service.js";

export function initFinal() {
  document.getElementById("game1-solution").textContent = solutionGame1;
  document.getElementById("game2-solution").textContent = solutionGame2;
  document.getElementById("game3-solution").textContent = solutionGame3;

  switch (solutionGame4) {
    case "heart":
      document.getElementById("game4-solution").textContent = "❤️ love that surrounds you always";
      break;
    case "plant":
      document.getElementById("game4-solution").textContent = "🌱 a mind as fresh as new growth!";
      break;
    case "music":
      document.getElementById("game4-solution").textContent = "🎶 your favorite song ever";
      break;
    case "star":
      document.getElementById("game4-solution").textContent = "🌟 surprising moments of magic";
      break;
    default:
      break;
  }
}
