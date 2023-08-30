const snake = document.getElementById("snake");
const food = document.getElementById("food");
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const boardWidth = Math.floor(screenWidth * 0.8);
const boardHeight = Math.floor(screenHeight * 0.8);

let snakeX = 0;
let snakeY = 0;
let foodX = 0;
let foodY = 0;
let snakeBody = [];
let direction = "";
let gameStarted = false;

function updateSnakePosition() {
  snake.style.left = snakeX + "px";
  snake.style.top = snakeY + "px";
  const snakeBodyContainer = document.getElementById("snake-body-container");
  snakeBodyContainer.innerHTML = "";
  console.log(snakeBody);

  for (let i = 0; i < snakeBody.length; i++) {
    console.log(snakeBody);
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
}

function handleKeyPress(event) {
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

function gameLoop() {
  if (isCollisionWithBoard() || isSelfCollision()) {
    console.log("Game Over!");
    resetGame();
    return;
  }

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
  setTimeout(gameLoop, 100);
}

updateFoodPosition();
document.addEventListener("keydown", handleKeyPress);
