export let player = {
    x: window.innerWidth / 2,
    y: window.innerHeight - 150,
    width: 100,
    height: 100,
    speed: 10,
    element: document.getElementById('fighterPlane')
};

// Function to update plane position
export function updatePlayerPosition() {
    player.element.style.left = `${player.x}px`;
    player.element.style.top = `${player.y}px`;
}

// Keyboard input
export function handlePlayerControls() {
  const container = document.getElementById("center");

  document.addEventListener("keydown", (e) => {
    const maxX = container.clientWidth - player.width;
    const maxY = container.clientHeight - player.height;

    if (e.key === "ArrowLeft") {
      player.x = Math.max(0, player.x - player.speed);
    }
    if (e.key === "ArrowRight") {
      player.x = Math.min(maxX, player.x + player.speed);
    }
    if (e.key === "ArrowUp") {
      player.y = Math.max(0, player.y - player.speed);
    }
    if (e.key === "ArrowDown") {
      player.y = Math.min(maxY, player.y + player.speed);
    }

    updatePlayerPosition();
  });
}

export function disablePlayerControls() {
    document.onkeydown = null;
}
