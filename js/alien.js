import { player } from './player.js';

/* ===============================
   ELEMENT REFERENCES
================================ */
export const alienPlane = document.getElementById("alienPlane");
const movementContainer = document.getElementById("center");
const gameContainer = document.getElementById("gameContainer");

/* ===============================
   STATE
================================ */
let alienX = alienPlane.offsetLeft;
let alienSpeed = 2.5; // smooth following
let score = 0;
let isRunning = true;

/* ===============================
   ALIEN MOVEMENT (FOLLOW PLAYER)
================================ */
export function moveAlien() {
    if (!isRunning) return;

    const alienWidth = alienPlane.offsetWidth;
    const containerWidth = movementContainer.clientWidth;

    // 🎯 Target = player's center
    const targetX =
        player.x + player.width / 2 - alienWidth / 2;

    // Smooth follow (no teleport)
    if (alienX < targetX) alienX += alienSpeed;
    else if (alienX > targetX) alienX -= alienSpeed;

    // Stay inside screen
    alienX = Math.max(0, Math.min(alienX, containerWidth - alienWidth));

    alienPlane.style.left = alienX + "px";

    requestAnimationFrame(moveAlien);
}

/* ===============================
   ALIEN LASER
================================ */
const laserSound = new Audio('./asset/Lazer Sound.mp3');

function fireLaser() {
    if (!isRunning) return;

    const laser = document.createElement("div");
    laser.className = "laserBeam";

    const alienRect = alienPlane.getBoundingClientRect();
    const containerRect = gameContainer.getBoundingClientRect();

    const startX =
        alienRect.left - containerRect.left + alienRect.width / 2;
    let startY =
        alienRect.bottom - containerRect.top;

    laser.style.left = startX + "px";
    laser.style.top = startY + "px";

    gameContainer.appendChild(laser);
    laserSound.currentTime = 0;
    laserSound.play();

    let yPos = startY;

    const interval = setInterval(() => {
        yPos += 8;
        laser.style.top = yPos + "px";

        const pRect = player.element.getBoundingClientRect();
        const lRect = laser.getBoundingClientRect();

        if (
            lRect.left < pRect.right &&
            lRect.right > pRect.left &&
            lRect.top < pRect.bottom &&
            lRect.bottom > pRect.top
        ) {
            clearInterval(interval);
            laser.remove();
            window.onPlayerHitByLaser?.();
        }

        if (yPos > gameContainer.clientHeight) {
            clearInterval(interval);
            laser.remove();
        }
    }, 30);
}

/* ===============================
   LASER TIMER
================================ */
setInterval(() => {
    if (isRunning) fireLaser();
}, 1400);

/* ===============================
   ALIEN HIT + SCORE
================================ */
const boomSound = new Audio('./asset/Boom Sound.mp3');

export function handleAlienHit() {
    boomSound.currentTime = 0;
    boomSound.play();
    score++;
}

export function getScore() {
    return score;
}

export function stopAlien() {
    isRunning = false;
}
