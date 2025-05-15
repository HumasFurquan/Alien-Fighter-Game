let center_ = document.getElementById("center")

// Fighter Plane Logic

let myPlane = document.getElementById("fighterPlane");

let upDown = myPlane.offsetTop;
let leftRight = myPlane.offsetLeft;

document.addEventListener("keydown", (movement) => {
    let step = 10;

    switch (movement.key) {
    case "ArrowUp":
      upDown -= step;
      break;
    case "ArrowDown":
      upDown += step;
      break;
    case "ArrowLeft":
      leftRight -= step;
      break;
    case "ArrowRight":
      leftRight += step;
      break;
  }

  if(leftRight < 82){
    leftRight = 82;
  }
  else if(leftRight > 1518){
    leftRight = 1515
  }
  else if(upDown > 665){
    upDown = 665;
  }
  else if(upDown < 355){
    upDown = 355;
  }

  console.log("in");
  myPlane.style.top = upDown + "px";
  myPlane.style.left = leftRight + "px";
});

// Alien Ship logic

let alienPlane = document.getElementById("alienShip");

let upDownAlienShip = alienPlane.offsetTop;
let leftRightAlienShip = alienPlane.offsetLeft;

myPlane.style.top = upDown + "px";
myPlane.style.left = leftRight + "px";

let clock = 0;
let baseInterval = 1000;
let flickerDuration = 0.9;

let movementInterval = null;

setInterval(() => {
    clock++;
    console.log("clock:", clock);

    if (clock === 5) {
        canvas.style.display = "block";
        canvas.style.opacity = "1";
        drawStars();
    } 
    else if (clock === 10) {
        canvas.style.opacity = 0;
    }
    else if(clock === 12){
        // marsCanvas.style.display = "block";  // only if it was hidden initially
        marsCanvas.style.opacity = 1;
        animateMars();
    }
    else if(clock === 17){
        canvas.style.opacity = 0;
    }
    else if(clock === 19){
        neptuneCanvas.style.opacity = 1;
        animateNeptuneScene();
    }
}, 1000);

function callAfterEveryFiveSecond() {
    console.log("callAfterEveryFiveSecond");
    flickerDuration -= 0.04; // increase flicker speed (lower duration)
    if (flickerDuration < 0.10) flickerDuration = 0.10; // minimum speed limit
    alienPlane.style.animationDuration = flickerDuration + "s";
    console.log("New flicker speed:", flickerDuration + "s");

    // Avoid negative or too low interval
    let newInterval = Math.max(30, baseInterval - clock * 10);

    if (movementInterval) {
        clearInterval(movementInterval);
    }

    movementInterval = setInterval(movementOfAlienShip, newInterval);
    console.log("New interval:", newInterval);
}

setInterval(callAfterEveryFiveSecond, 5000);

function movementOfAlienShip() {

    if (leftRightAlienShip < leftRight) {
        leftRightAlienShip += 10;
    } else if (leftRightAlienShip > leftRight) {
        leftRightAlienShip -= 10;
    }

    alienPlane.style.left = leftRightAlienShip + "px";
}

// Missile Logic

let missile = document.getElementById("missile");


document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    fireMissile();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    fireMissile();
  }
});

function fireMissile() {
  const originalMissile = document.getElementById("missile");
  const newMissile = originalMissile.cloneNode(true);
  newMissile.removeAttribute("id");
  newMissile.style.display = "block"; // Make it visible
  newMissile.classList.add("missile-clone");

  const plane = document.getElementById("fighterPlane");
  const planeRect = plane.getBoundingClientRect();
  const centerRect = document.getElementById("center").getBoundingClientRect();

  newMissile.style.left = (planeRect.left + planeRect.width / 2 - centerRect.left - 10) + "px";
  newMissile.style.bottom = (window.innerHeight - planeRect.top + 5) + "px";

  document.getElementById("center").appendChild(newMissile);

  let position = parseInt(newMissile.style.bottom);

  const interval = setInterval(() => {
    position += 10;
    newMissile.style.bottom = position + "px";

    if (position > window.innerHeight + 50) {
      clearInterval(interval);
      newMissile.remove();
    }
  }, 30);
}

// space fight

    let canvas = document.getElementById("spaceCanvas");
    let ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.opacity = "0"; // ensure it's hidden initially

    const stars = [];
    const starCount = 400;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 5 + 2,
        length: Math.random() * 10 + 5,
        alpha: Math.random() * 0.5 + 0.5
      });
    }

    function drawStars() {
        console.log("in start canvaaaaaaaaaaaaaaa")
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let star of stars) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.lineWidth = 1;
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x, star.y + star.length);
        ctx.stroke();

        star.y += star.speed;

        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
          star.speed = Math.random() * 5 + 2;
          star.length = Math.random() * 10 + 5;
        }
      }

      requestAnimationFrame(drawStars);
    }

    // mars fight

    canvas = document.getElementById("marsCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

// Create gradient for Mars sky
function drawMarsSky() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#b22222"); // dark red
  gradient.addColorStop(0.5, "#ff4500"); // reddish orange
  gradient.addColorStop(1, "#8b0000"); // deep red

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw Mars ground
function drawMarsGround() {
  ctx.fillStyle = "#a52a2a"; // brownish red
  ctx.beginPath();
  ctx.moveTo(0, canvas.height * 0.75);
  for (let x = 0; x <= canvas.width; x += 100) {
    let yOffset = Math.random() * 40;
    ctx.lineTo(x, canvas.height * 0.75 - yOffset);
  }
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();
}

// Generate some craters
function drawCraters() {
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * canvas.width;
    const y = canvas.height * 0.75 + Math.random() * 50;
    const radius = Math.random() * 15 + 10;
    ctx.beginPath();
    ctx.fillStyle = "#5c1e1e";
    ctx.ellipse(x, y, radius, radius / 2, 0, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// Optional: floating dust particles
let dustParticles = [];
for (let i = 0; i < 80; i++) {
  dustParticles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.2
  });
}

function drawDust() {
  ctx.fillStyle = "rgba(255, 165, 0, 0.3)";
  for (let d of dustParticles) {
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();

    d.y -= d.speed;
    if (d.y < 0) {
      d.y = canvas.height;
      d.x = Math.random() * canvas.width;
    }
  }
}

function animateMars() {
  drawMarsSky();
  drawMarsGround();
  drawCraters();
  drawDust();
  requestAnimationFrame(animateMars);
}

animateMars();

// neptune fight
  const neptuneCanvas = document.getElementById("neptuneCanvas");
  const neptuneCtx = neptuneCanvas.getContext("2d");

  neptuneCanvas.width = window.innerWidth;
  neptuneCanvas.height = window.innerHeight;

  // Create vertical speed lines
  let speedLines = [];
  for (let i = 0; i < 150; i++) {
    speedLines.push({
      x: Math.random() * neptuneCanvas.width,
      y: Math.random() * neptuneCanvas.height,
      length: Math.random() * 80 + 20,
      speed: Math.random() * 10 + 5
    });
  }

  // Optional: UFOs entering the screen
  const ufos = [];
  for (let i = 0; i < 3; i++) {
    ufos.push({
      x: Math.random() * neptuneCanvas.width,
      y: -100 - i * 200,
      size: 40,
      opacity: 0
    });
  }

  function drawNeptuneSky() {
    const gradient = neptuneCtx.createLinearGradient(0, 0, 0, neptuneCanvas.height);
    gradient.addColorStop(0, "#000080"); // navy
    gradient.addColorStop(0.5, "#1e90ff"); // dodger blue
    gradient.addColorStop(1, "#000033"); // very dark blue

    neptuneCtx.fillStyle = gradient;
    neptuneCtx.fillRect(0, 0, neptuneCanvas.width, neptuneCanvas.height);
  }

  function drawSpeedLines() {
    neptuneCtx.strokeStyle = "rgba(173,216,230, 0.5)";
    neptuneCtx.lineWidth = 2;
    for (let line of speedLines) {
      neptuneCtx.beginPath();
      neptuneCtx.moveTo(line.x, line.y);
      neptuneCtx.lineTo(line.x, line.y + line.length);
      neptuneCtx.stroke();

      line.y += line.speed;
      if (line.y > neptuneCanvas.height) {
        line.y = -line.length;
        line.x = Math.random() * neptuneCanvas.width;
      }
    }
  }

  function drawUFOs() {
    for (let ufo of ufos) {
      ufo.opacity += 0.005;
      ufo.y += 1;

      neptuneCtx.globalAlpha = Math.min(ufo.opacity, 1);
      neptuneCtx.beginPath();
      neptuneCtx.fillStyle = "#00ffff";
      neptuneCtx.ellipse(ufo.x, ufo.y, ufo.size, ufo.size / 2, 0, 0, 2 * Math.PI);
      ctx.fill();

      // Light below UFO
      neptuneCtx.beginPath();
      neptuneCtx.moveTo(ufo.x - ufo.size / 4, ufo.y);
      neptuneCtx.lineTo(ufo.x, ufo.y + 40);
      neptuneCtx.lineTo(ufo.x + ufo.size / 4, ufo.y);
      neptuneCtx.fillStyle = "rgba(0, 255, 255, 0.2)";
      neptuneCtx.fill();

      neptuneCtx.globalAlpha = 1;
    }
  }

  function animateNeptuneScene() {
    drawNeptuneSky();
    drawSpeedLines();
    drawUFOs();
    requestAnimationFrame(animateNeptuneScene);
  }

  animateNeptuneScene();