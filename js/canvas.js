const spaceCanvas = document.getElementById("spaceCanvas");
const marsCanvas = document.getElementById("marsCanvas");
const neptuneCanvas = document.getElementById("neptuneCanvas");

const spaceCtx = spaceCanvas.getContext("2d");
const marsCtx = marsCanvas.getContext("2d");
const neptuneCtx = neptuneCanvas.getContext("2d");

const canvases = [spaceCanvas, marsCanvas, neptuneCanvas];
let currentIndex = 0;

/* ---------- Resize ---------- */
function resizeCanvas() {
  canvases.forEach(c => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  });
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ---------- Starfield ---------- */
const stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 2,
  speed: Math.random() * 0.5 + 0.2
}));

function drawStars(ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "white";
  stars.forEach(s => {
    s.y += s.speed;
    if (s.y > ctx.canvas.height) s.y = 0;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

/* ---------- Planet Backgrounds ---------- */
function drawMars(ctx) {
  ctx.fillStyle = "#2b0000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawNeptune(ctx) {
  ctx.fillStyle = "#001933";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

/* ---------- Animation Loop ---------- */
function animate() {
  drawStars(spaceCtx);
  drawMars(marsCtx);
  drawNeptune(neptuneCtx);
  requestAnimationFrame(animate);
}
animate();

/* ---------- Fade Logic ---------- */
function showCanvas(index) {
  canvases.forEach((c, i) => {
    c.style.opacity = i === index ? "1" : "0";
  });
}

/* ---------- Auto Background Cycle ---------- */
export function startBackgroundCycle() {
  showCanvas(currentIndex);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % canvases.length;
    showCanvas(currentIndex);
  }, 7000); // change every 7 seconds
}
