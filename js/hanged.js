const words = ["javascript", "programacion", "html", "css", "desarrollo"];
let currentWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let remainingAttempts = 6;

const wordDisplay = document.getElementById("word-display");
const guessesDisplay = document.getElementById("guesses");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");

function playerName() {
  let playerName = prompt("¿Cuál es tu nombre?").toLocaleUpperCase();
  let player = document.getElementById("name");

  if (playerName != null) {
    // Agregar el texto ingresado al elemento p
    player.textContent += " " + playerName;
  }
}
function displayWord() {
  wordDisplay.textContent = currentWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

function updateGuesses() {
  guessesDisplay.textContent = `Tus intentos: ${guessedLetters.join(", ")}`;
}
function buttonDisabled() {
  guessButton.setAttribute("disabled", "true");
  guessButton.classList.remove("bg-emerald-400");
  guessButton.classList.add("bg-emerald-200");
}
function checkInput() {
  if (letterInput.value.length === 1) {
    guessButton.removeAttribute("disabled");
    guessButton.classList.remove("bg-emerald-200");
    guessButton.classList.add("bg-emerald-400");
  } else {
    buttonDisabled();
  }
}

function checkGuess() {
  const letter = letterInput.value.toLowerCase();
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    if (!currentWord.includes(letter)) {
      remainingAttempts--;
      guessButton.addEventListener("click", buttonDisabled());
    }
    displayWord();
    updateGuesses();
    letterInput.value = "";
    checkGameStatus();
  }
}

function checkGameStatus() {
  if (
    currentWord
      .split("")
      .every(
        (letter) => guessedLetters.includes(letter) || remainingAttempts === 0
      )
  ) {
    if (remainingAttempts > 0) {
      alert("¡Ganaste!");
    } else {
      alert("Perdiste. La palabra era: " + currentWord);
    }
    resetGame();
  }
}

function resetGame() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  remainingAttempts = 6;
  displayWord();
  buttonDisabled();
  updateGuesses();
}

guessButton.addEventListener("click", checkGuess);

playerName();
displayWord();
updateGuesses();
