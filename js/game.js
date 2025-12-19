import { handlePlayerControls, player } from './player.js';
import { fireMissile } from './missiles.js';
import { moveAlien, getScore, stopAlien } from './alien.js';
import { startBackgroundCycle } from "./canvas.js";

startBackgroundCycle();

const gameOverSound = new Audio('./asset/Game Over Sound.mp3');

let startTime;
let survivalInterval;

// Load high score from localStorage (if any)
let highScore = localStorage.getItem("alienFighterHighScore") || 0;

// Start the timer when game starts
function startGameTimer() {
  startTime = Date.now();

  survivalInterval = setInterval(() => {
    // Optional: live timer update
  }, 1000);
}

// Call this when game ends
function gameOver() {
  // Stop everything
  stopAlien();
  clearInterval(survivalInterval);
  player.canMove = false; // freeze player movement

  // Play sound
  gameOverSound.play();

  const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);

  // Update high score if needed
  if (elapsedSeconds > highScore) {
    highScore = elapsedSeconds;
    localStorage.setItem("alienFighterHighScore", highScore);
  }

  // Show blackout overlay
  const blackout = document.getElementById("blackoutOverlay");
  if (blackout) blackout.style.opacity = "1";

  // Show game over screen
  const screen = document.getElementById("gameOverScreen");
  const scoreEl = document.getElementById("finalScore");

  scoreEl.innerHTML = `
    Score: ${elapsedSeconds} <br>
    Highest Score: ${highScore}
  `;
  screen.style.display = "block";
}

// Reload button functionality
document.getElementById("reloadButton").addEventListener("click", () => {
  location.reload(); // restart game
});

// Attach player movement
handlePlayerControls();

// Attach missile fire
document.addEventListener("keydown", (e) => { 
  if(e.code === "Space" && player.canMove) fireMissile(); 
});

// Start alien and timer
moveAlien();
startGameTimer();

// Make gameOver globally callable
window.onPlayerHitByLaser = gameOver;
