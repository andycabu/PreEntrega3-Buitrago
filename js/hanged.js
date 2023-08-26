const words = ['javascript', 'programacion', 'html', 'css', 'desarrollo'];
let currentWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let remainingAttempts = 6;

const wordDisplay = document.getElementById('word-display');
const guessesDisplay = document.getElementById('guesses');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-button');

function displayWord() {
    wordDisplay.textContent = currentWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');
}

function updateGuesses() {
    guessesDisplay.textContent = `Tus intentos: ${guessedLetters.join(', ')}`;
}

function checkGuess() {
    const letter = letterInput.value.toLowerCase();
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!currentWord.includes(letter)) {
            remainingAttempts--;
        }
        displayWord();
        updateGuesses();
        letterInput.value = '';
        checkGameStatus();
    }
}

function checkGameStatus() {
    if (currentWord.split('').every(letter => guessedLetters.includes(letter) || remainingAttempts === 0)) {
        if (remainingAttempts > 0) {
            alert('¡Ganaste!');
        } else {
            alert('Perdiste. La palabra era: ' + currentWord);
        }
        resetGame();
    }
}

function resetGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingAttempts = 6;
    displayWord();
    updateGuesses();
}

guessButton.addEventListener('click', checkGuess);

displayWord();
updateGuesses();
