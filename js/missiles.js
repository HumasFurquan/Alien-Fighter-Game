import { player } from './player.js';
import { handleAlienHit } from './alien.js';
import { isColliding } from './collision.js';

// Missile counter
let nextMissile = 3;

// Missile indicators
const firstMissile = document.getElementById("topLeftPositionedFirst");
const secondMissile = document.getElementById("topLeftPositionedSecond");
const thirdMissile = document.getElementById("topLeftPositionedThird");

// Function to regenerate missiles every 5 seconds
export function nextMissileForming() {
    if (nextMissile < 3) {
        nextMissile++;
        if (nextMissile === 1) firstMissile.style.display = "block";
        if (nextMissile === 2) secondMissile.style.display = "block";
        if (nextMissile === 3) thirdMissile.style.display = "block";
    }
}
setInterval(nextMissileForming, 5000);

// Fire a missile
export function fireMissile() {
    if (nextMissile <= 0) return; // no missiles left

    // Decrement missile and hide correct indicator
    if (nextMissile === 3) thirdMissile.style.display = "none";
    if (nextMissile === 2) secondMissile.style.display = "none";
    if (nextMissile === 1) firstMissile.style.display = "none";
    nextMissile--;

    // Clone missile element
    const originalMissile = document.getElementById("missile");
    const newMissile = originalMissile.cloneNode(true);
    newMissile.removeAttribute("id");
    newMissile.style.display = "block";
    newMissile.classList.add("missile-clone");

    const center = document.getElementById("center");
    center.appendChild(newMissile);

    // Lock missile position at fire moment
    let posY = player.y;
    const posX = player.x + player.width / 2 - 10;

    newMissile.style.top = posY + "px";
    newMissile.style.left = posX + "px";

    const interval = setInterval(() => {
        posY -= 10;
        newMissile.style.top = posY + "px";
        newMissile.style.left = posX + "px";

        const alienPlane = document.getElementById("alienPlane");
        if (alienPlane) {
            const missileRect = newMissile.getBoundingClientRect();
            const alienRect = alienPlane.getBoundingClientRect();

            if (isColliding(missileRect, alienRect)) {
                clearInterval(interval);
                newMissile.remove();
                handleAlienHit();
            }
        }

        if (posY < -50) {
            clearInterval(interval);
            newMissile.remove();
        }
    }, 30);
}
