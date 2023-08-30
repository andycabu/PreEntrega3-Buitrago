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
let snakeBody = [{ x: snakeX, y: snakeY }];
let direction = "";
let gameStarted = false;

function updateSnakePosition() {
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = { ...snakeBody[i - 1] };
  }
  snakeBody[0] = { x: snakeX, y: snakeY };

  snake.style.left = snakeX + "px";
  snake.style.top = snakeY + "px";
}
function isCollisionWithBoard() {
  return (
    snakeX < 0 || snakeY < 0 || snakeX >= boardWidth || snakeY >= boardHeight
  );
}

function updateFoodPosition() {
  foodX = Math.floor(Math.random() * (boardWidth / 20)) * 20;
  foodY = Math.floor(Math.random() * (boardHeight / 20)) * 20;
  food.style.left = foodX + "px";
  food.style.top = foodY + "px";
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
  snakeBody = [{ x: snakeX, y: snakeY }];
  direction = "";
  gameStarted = false;

  snake.style.left = snakeX + "px";
  snake.style.top = snakeY + "px";

  updateFoodPosition();
}

function gameLoop() {
  if (isCollisionWithBoard()) {
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
    snakeBody.push({ x: snakeX, y: snakeY });
    updateFoodPosition();
  }

  updateSnakePosition();
  setTimeout(gameLoop, 100);
}

updateFoodPosition();
document.addEventListener("keydown", handleKeyPress);
