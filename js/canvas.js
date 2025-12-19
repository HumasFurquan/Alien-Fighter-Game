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
const NUM_STARS = 300; // more stars for speed effect
const stars = Array.from({ length: NUM_STARS }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 2,
  speed: Math.random() * 8 + 2 // fast stars
}));

function drawStars(ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "white";
  stars.forEach(s => {
    s.y += s.speed;
    if (s.y > ctx.canvas.height) {
      s.y = 0;
      s.x = Math.random() * ctx.canvas.width;
      s.r = Math.random() * 2;
      s.speed = Math.random() * 8 + 2;
    }
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
  }, 7000);
}
