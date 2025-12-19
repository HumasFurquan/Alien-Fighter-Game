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
let alienSpeed = 1.8;   // VERY slow at start
let score = 0;
let isRunning = true;

/* ===============================
   DIFFICULTY SETTINGS
================================ */
const SPEED_INCREMENT = 0.35;
const SPEED_CHECK_INTERVAL = 10000; // 10 seconds
const SPEED_RATIO_LIMIT = 0.85;     // always slower than player

/* ===============================
   ALIEN MOVEMENT (CHASE PLAYER)
================================ */
export function moveAlien() {
    if (!isRunning) return;

    const alienWidth = alienPlane.offsetWidth;
    const containerWidth = movementContainer.clientWidth;

    const targetX =
        player.x + player.width / 2 - alienWidth / 2;

    if (alienX < targetX) alienX += alienSpeed;
    else if (alienX > targetX) alienX -= alienSpeed;

    alienX = Math.max(0, Math.min(alienX, containerWidth - alienWidth));
    alienPlane.style.left = alienX + "px";

    requestAnimationFrame(moveAlien);
}

/* ===============================
   DIFFICULTY SCALING (SAFE)
================================ */
setInterval(() => {
    if (!isRunning) return;

    const maxAllowedSpeed = player.speed * SPEED_RATIO_LIMIT;

    if (alienSpeed + SPEED_INCREMENT < maxAllowedSpeed) {
        alienSpeed += SPEED_INCREMENT;
    } else {
        alienSpeed = maxAllowedSpeed; // clamp safely
    }

}, SPEED_CHECK_INTERVAL);

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

    laser.style.left =
        alienRect.left - containerRect.left + alienRect.width / 2 + "px";
    laser.style.top =
        alienRect.bottom - containerRect.top + "px";

    gameContainer.appendChild(laser);

    laserSound.currentTime = 0;
    laserSound.play();

    let yPos = parseFloat(laser.style.top);

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
const laserTimer = setInterval(() => {
    if (isRunning) fireLaser();
}, 1500);

/* ===============================
   HIT + SCORE
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
    clearInterval(laserTimer);
}
