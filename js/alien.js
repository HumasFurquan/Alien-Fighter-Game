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
let alienSpeed = 1.8;
let score = 0;
let isRunning = true;

/* ===============================
   HIT & UFO EVOLUTION
================================ */
const ufoImages = [
  './asset/ufo1.png',
  './asset/ufo2.png',
  './asset/ufo3.png',
  './asset/ufo4.png',
  './asset/ufo5.png',
  './asset/ufo6.png',
  './asset/ufo7.png',
  './asset/ufo8.png',
  './asset/ufo9.png',
];
let currentUfoIndex = 0;   // Current UFO image
let hitCount = 0;           // Hits on current UFO

// Set initial UFO image
alienPlane.src = ufoImages[currentUfoIndex];

/* ===============================
   ATTACK CONTROL
================================ */
let lastFireTime = 0;
const FIRE_COOLDOWN = 1200; // ms

/* ===============================
   DIFFICULTY SETTINGS
================================ */
const SPEED_INCREMENT = 0.35;
const SPEED_CHECK_INTERVAL = 10000;
const SPEED_RATIO_LIMIT = 0.85;

/* ===============================
   MOVEMENT + SMART ATTACK
================================ */
export function moveAlien() {
    if (!isRunning) return;

    const alienWidth = alienPlane.offsetWidth;
    const containerWidth = movementContainer.clientWidth;

    const playerCenterX = player.x + player.width / 2;
    const alienCenterX = alienX + alienWidth / 2;

    // Chase player horizontally
    if (alienCenterX < playerCenterX) alienX += alienSpeed;
    else if (alienCenterX > playerCenterX) alienX -= alienSpeed;

    alienX = Math.max(0, Math.min(alienX, containerWidth - alienWidth));
    alienPlane.style.left = `${alienX}px`;

    /* ===============================
       FIRE ONLY IF PLAYER IS UNDER UFO
    ================================ */
    const alienLeft = alienX;
    const alienRight = alienX + alienWidth;

    const now = Date.now();

    if (
        playerCenterX >= alienLeft &&
        playerCenterX <= alienRight &&
        now - lastFireTime > FIRE_COOLDOWN
    ) {
        fireLaser();
        lastFireTime = now;
    }

    requestAnimationFrame(moveAlien);
}

/* ===============================
   DIFFICULTY SCALING
================================ */
setInterval(() => {
    if (!isRunning) return;

    const maxSpeed = player.speed * SPEED_RATIO_LIMIT;
    if (alienSpeed + SPEED_INCREMENT < maxSpeed) {
        alienSpeed += SPEED_INCREMENT;
    } else {
        alienSpeed = maxSpeed;
    }
}, SPEED_CHECK_INTERVAL);

/* ===============================
   LASER
================================ */
const laserSound = new Audio('./asset/Lazer Sound.mp3');

function fireLaser() {
    if (!isRunning) return;

    const laser = document.createElement("div");
    laser.className = "laserBeam";

    const alienRect = alienPlane.getBoundingClientRect();

    laser.style.left = alienRect.left + alienRect.width / 2 - 2 + "px";
    laser.style.top = alienRect.bottom + "px";

    movementContainer.appendChild(laser);

    laserSound.currentTime = 0;
    laserSound.play();

    let yPos = alienRect.bottom;

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

        if (yPos > movementContainer.clientHeight) {
            clearInterval(interval);
            laser.remove();
        }
    }, 30);
}

/* ===============================
   HIT + UFO IMAGE CHANGE
================================ */
const boomSound = new Audio('./asset/Boom Sound.mp3');

export function handleAlienHit() {
    boomSound.currentTime = 0;
    boomSound.play();
    hitCount++;

    // Every 3 hits -> change UFO image
    if (hitCount % 3 === 0) {
        currentUfoIndex++;

        if (currentUfoIndex >= ufoImages.length) {
            // Last UFO image destroyed
            vanishUfo();
        } else {
            alienPlane.src = ufoImages[currentUfoIndex];
        }
    }

    score++;
}

export function getScore() {
    return score;
}

export function stopAlien() {
    isRunning = false;
}

/* ===============================
   UFO VANISH
================================ */
function vanishUfo() {
    alienPlane.classList.add("vanish-alien");

    setTimeout(() => {
        alienPlane.classList.remove("vanish-alien");
        alienPlane.src = ufoImages[0]; // reset to first UFO
        currentUfoIndex = 0;
        hitCount = 0;
        alienPlane.style.left = "0px"; // optional: reset position
    }, 500); // match vanish animation
}
