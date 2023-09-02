const snake = document.getElementById("snake");
const food = document.getElementById("food");
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const gameContainer = document.getElementById("game-container");
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
let board = window.getComputedStyle(gameContainer);
let height = (parseInt(board.height) / screenHeight) * 100;
let width = (parseInt(board.width) / screenWidth) * 100;
let boardWidth = Math.floor(screenWidth * (width / 100));
let boardHeight = Math.floor(screenHeight * (height / 100));
let touchStartX = 0;
let touchStartY = 0;

function levelPop() {
  if (level >= 1) {
    popElement.classList.remove("hidden");
    popElement.classList.add("flex")
    setTimeout(() => {
      popElement.classList.add("animate-fade-out");
      setTimeout(() => {
        popElement.classList.add("hidden");
        popElement.classList.remove("flex")
        popElement.classList.remove("animate-fade-out");
      }, 300);
    }, 3000);
    levelDisplay.textContent = "Estas en el nivel: " + level;
  }
}

function calculateBoardSize() {
  board = window.getComputedStyle(gameContainer);
  height = (parseInt(board.height) / screenHeight) * 100;
  width = (parseInt(board.width) / screenWidth) * 100;
  boardWidth = Math.floor(screenWidth * (width / 100));
  boardHeight = Math.floor(screenHeight * (height / 100));
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
      segmentElement.className = " prueba absolute w-8 h-8 rounded-full";
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

function snakeMovement(){

  if (direction === "up") {
    snakeY -= 20;
    snake.classList.remove("rotate-0", "rotate-90", "rotate-90");
    snake.classList.add("rotate-180");
  } else if (direction === "down") {
    snakeY += 20;
    snake.classList.remove("rotate-180", "rotate-90", "rotate-90");
    snake.classList.add("rotate-0");
  } else if (direction === "left") {
    snakeX -= 20;
    snake.classList.remove("rotate-180", "rotate-0", "rotate-90");
    snake.classList.add("rotate-90");
  } else if (direction === "right") {
    snakeX += 20;
    snake.classList.remove("rotate-180", "rotate-0", "rotate-90");
    snake.classList.add("-rotate-90");
  }
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

function handleScreenTouch(d) {
  direction = d;
  gameStarted = true;
  gameLoop();
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
  if (!collision) {
    if (timestamp - lastTimestamp >= frameInterval) {
      lastTimestamp = timestamp;
      
      gameOver();
  
    snakeMovement()
  
      if (snakeX === foodX && snakeY === foodY) {
        growSnake();
        updateFoodPosition();
      }
  
      updateSnakePosition();
    }
  
    requestAnimationFrame(gameLoop);
  }
 
}

updateFoodPosition();
document.addEventListener("keydown", handleKeyPress);
window.addEventListener('resize', calculateBoardSize);
