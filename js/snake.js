const snake = document.getElementById("snake");
const food = document.getElementById("food");
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const boardWidth = Math.floor(screenWidth * 0.5);
const boardHeight = Math.floor(screenHeight * 0.5);
const snakeBodyContainer = document.getElementById("snake-body-container");
const modal = document.getElementById("modal");

let snakeX = 0;
let snakeY = 0;
let foodX = 0;
let foodY = 0;
let snakeBody = [];
let direction = "";
let gameStarted = false;
let score = 0;
let lastTimestamp = 0;
let frameInterval = 80;

let collision = false;

function playAgain() {
  collision = !collision;
  openOrCloseModal();
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
}

function handleKeyPress(event) {
  if (!collision) {
    if (!gameStarted) {
      gameStarted = true;
      gameLoop(); //
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
}

function gameOver() {
  if (isCollisionWithBoard() || isSelfCollision()) {
    collision = true;
    openOrCloseModal();
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
