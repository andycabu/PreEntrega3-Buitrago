const snake = document.getElementById("snake");
const food = document.getElementById("food");
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const boardWidth = Math.floor(screenWidth * 0.5);
const boardHeight = Math.floor(screenHeight * 0.5);
const snakeBodyContainer = document.getElementById("snake-body-container");
const modal = document.getElementById("modal");
const scoreDisplay = document.getElementById("scoreDisplay");
const scoreFinalDisplay = document.getElementById("scoreFinalDisplay");
const popElement = document.getElementById("pop");
const levelDisplay = document.getElementById("levelDisplay");
const levelFinalDisplay = document.getElementById("levelFinalDisplay");
const eatSound = document.getElementById("eatSound");
const gameOverSound = document.getElementById("gameOverSound");
const levelUpSound = document.getElementById("levelUpSound");

let snakeX = 0;
let snakeY = 0;
let foodX = 0;
let foodY = 0;
let snakeBody = [];
let direction = "";
let gameStarted = false;
let score = 0;
let lastTimestamp = 0;
let frameInterval = 130;
let collision = false;
let level = 0;

let touchStartX = 0;
let touchStartY = 0;

function levelPop() {
  if (level >= 1) {
    popElement.classList.remove("hidden");
    setTimeout(() => {
      popElement.classList.add("animate-fade-out");
      setTimeout(() => {
        popElement.classList.add("hidden");
        popElement.classList.remove("animate-fade-out");
      }, 300);
    }, 3000);
    levelDisplay.textContent = "Estas en el nivel: " + level;
  }
}

function playAgain() {
  collision = !collision;
  openOrCloseModal();
}
function velocityGame() {
  if (score % 100 == 0) {
    if (frameInterval > 30) {
      frameInterval = frameInterval - 10;
    }
  }
}
function levelGame() {
  if (score % 100 == 0) {
    level = level + 1;
    levelUpSound.play();
    levelPop();
  }
}
function updateSnakePosition() {
  snake.style.left = snakeX + "px";
  snake.style.top = snakeY + "px";

  snakeBodyContainer.innerHTML = "";

  if (gameStarted) {
    for (let i = 0; i < snakeBody.length; i++) {
      const segment = snakeBody[i];
      const segmentElement = document.createElement("div");
      segmentElement.className = "snake-segment";
      segmentElement.style.left = segment.x + "px";
      segmentElement.style.top = segment.y + "px";
      snakeBodyContainer.appendChild(segmentElement);
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i].x = snakeBody[i - 1].x;
      snakeBody[i].y = snakeBody[i - 1].y;
    }
    snakeBody[0] = { x: snakeX, y: snakeY };
  }
}

function isCollisionWithBoard() {
  return (
    snakeX < 0 || snakeY < 0 || snakeX >= boardWidth || snakeY >= boardHeight
  );
}
function isSelfCollision() {
  for (let i = 1; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
      return true;
    }
  }
  return false;
}

function updateFoodPosition() {
  foodX = Math.floor(Math.random() * (boardWidth / 20)) * 20;
  foodY = Math.floor(Math.random() * (boardHeight / 20)) * 20;
  food.style.left = foodX + "px";
  food.style.top = foodY + "px";
}
function growSnake() {
  snakeBody.push({ x: snakeX, y: snakeY });
  score = score + 10;
  addScore();
  velocityGame();
  levelGame();
  eatSound.play();
}

function addScore() {
  if (score > 0) {
    scoreDisplay.textContent = "Tu puntuacion es de: " + score + " puntos";
    scoreFinalDisplay.textContent =
      "Tu puntuacion fue de: " + score + " puntos";
    levelFinalDisplay.textContent = "Llegaste al nivel: " + level;
  } else {
    scoreDisplay.textContent = "Tu puntuacion es de: " + 0 + " puntos";
    scoreFinalDisplay.textContent = "Tu puntuacion fue de: " + 0 + " puntos";
  }
}

function handleTouch(event) {
  if (!collision) {
    if (!gameStarted) {
      gameStarted = true;
      gameLoop();
    }

    const touch = event.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = touchX - centerX;
    const deltaY = touchY - centerY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0 && direction !== "left") {
        direction = "right";
      } else if (deltaX < 0 && direction !== "right") {
        direction = "left";
      }
    } else {
      if (deltaY > 0 && direction !== "up") {
        direction = "down";
      } else if (deltaY < 0 && direction !== "down") {
        direction = "up";
      }
    }
  }
}

function handleKeyPress(event) {
  if (!collision) {
    if (!gameStarted) {
      gameStarted = true;
      gameLoop();
    }

    if (event.key === "ArrowUp" && direction !== "down") {
      direction = "up";
    } else if (event.key === "ArrowDown" && direction !== "up") {
      direction = "down";
    } else if (event.key === "ArrowLeft" && direction !== "right") {
      direction = "left";
    } else if (event.key === "ArrowRight" && direction !== "left") {
      direction = "right";
    }
  }
}
function resetGame() {
  snakeX = 0;
  snakeY = 0;
  snakeBody = [];
  direction = "";
  gameStarted = false;
  frameInterval = 130;
  score = 0;
  level = 0;
  snake.style.left = snakeX + "px";
  snake.style.top = snakeY + "px";

  updateSnakePosition();
  updateFoodPosition();
}
function openOrCloseModal() {
  if (collision === false) {
    modal.classList.add("hidden");
  } else {
    modal.classList.remove("hidden");
  }
  addScore();
}

function gameOver() {
  if (isCollisionWithBoard() || isSelfCollision()) {
    collision = true;
    openOrCloseModal();
    gameOverSound.play();
    resetGame();
  }
}

function gameLoop(timestamp) {
  if (timestamp - lastTimestamp >= frameInterval) {
    lastTimestamp = timestamp;

    gameOver();

    if (direction === "up") {
      snakeY -= 20;
    } else if (direction === "down") {
      snakeY += 20;
    } else if (direction === "left") {
      snakeX -= 20;
    } else if (direction === "right") {
      snakeX += 20;
    }

    if (snakeX === foodX && snakeY === foodY) {
      growSnake();
      updateFoodPosition();
    }

    updateSnakePosition();
  }

  requestAnimationFrame(gameLoop);
}

updateFoodPosition();
document.addEventListener("keydown", handleKeyPress);
document.addEventListener("touchstart", handleTouch);
