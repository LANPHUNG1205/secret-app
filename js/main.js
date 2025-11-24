import { show } from "./utils.js";
import { initGame1 } from "./game1-service.js";
import { initGame2 } from "./game2-service.js";
import { initGame3 } from "./game3-service.js";

export const game1 = document.getElementById("game1");
export const game2 = document.getElementById("game2");
export const game3 = document.getElementById("game3");
export const finalScreen = document.getElementById("final");

// show first game
show(game1);

// init modules
initGame1();
initGame2();
initGame3();
