const apiUrl = "https://api.api-ninjas.com/v1/randomword";
const apiKey = "k8hrYeMeVLMNbwzRVhVr+Q==A2NTU6Qtl0jcvjTI";
let word;
let currentWord = "";
let guessedLetters = [];
let remainingAttempts = 6;

const wordDisplay = document.getElementById("word-display");
const guessesDisplay = document.getElementById("guesses");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");

async function getWord() {
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    word = data.word;
    currentWord = word.toLowerCase();
    displayWord();
  } catch (error) {
    console.error("Error obteniendo la palabra:", error);
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
      buttonDisabled();
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
      Swal.fire("¡Ganaste!", "", "success");
    } else {
      Swal.fire("Perdiste", `La palabra era: ${currentWord}`, "error");
    }
    resetGame();
  }
}

function resetGame() {
  guessedLetters = [];
  remainingAttempts = 6;
  getWord();
  buttonDisabled();
  updateGuesses();
}

guessButton.addEventListener("click", checkGuess);
letterInput.addEventListener("input", checkInput);

getWord();
