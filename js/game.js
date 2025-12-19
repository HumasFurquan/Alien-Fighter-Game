import { handlePlayerControls } from './player.js';
import { fireMissile } from './missiles.js';
import { moveAlien, getScore } from './alien.js';
import { startBackgroundCycle } from "./canvas.js";

startBackgroundCycle();


const gameOverSound = new Audio('./asset/Game Over Sound.mp3');

// animateSpace();
// animateMars();
// animateNeptune();
moveAlien();

// Attach player movement
handlePlayerControls();

// Attach missile fire
document.addEventListener("keydown", (e)=>{ if(e.code==="Space") fireMissile(); });

// Make gameOver globally callable
window.onPlayerHitByLaser = function(){
    gameOverSound.play();

    const screen = document.getElementById("gameOverScreen");
    screen.style.display = "block";

    const scoreEl = document.getElementById("Your-Score");
    scoreEl.innerHTML = `Your Score Is ${getScore()}`;
}
