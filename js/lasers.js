// lasers.js
import { myPlane } from './player.js';
import { isColliding } from './collision.js';
import { onPlayerHitByLaser } from './game.js';
import { laserSound } from './sounds.js';

export function fireLaser(xPos) {
  const laser = document.createElement("div");
  laser.className = "laserBeam";
  laser.style.left = xPos + "px";

  const container = document.getElementById("gameContainer");
  container.appendChild(laser);

  laserSound.play();

  let yPos = 80;
  laser.style.top = yPos + "px";

  const interval = setInterval(() => {
    yPos += 10;
    laser.style.top = yPos + "px";

    const playerRect = myPlane.getBoundingClientRect();
    const laserRect = laser.getBoundingClientRect();

    if (isColliding(laserRect, playerRect)) {
      clearInterval(interval);
      laser.remove();
      onPlayerHitByLaser();
    }

    if (yPos > window.innerHeight) {
      clearInterval(interval);
      laser.remove();
    }
  }, 30);
}
