const cards = [
  "/assets/images/pirata-con-bandera.png",
  "/assets/images/pirata-con-bandera.png",
  "/assets/images/cofre.png",
  "/assets/images/cofre.png",
  "/assets/images/mapa-tesoro.png",
  "/assets/images/mapa-tesoro.png",
  "/assets/images/mujer-pirata.png",
  "/assets/images/mujer-pirata.png",
  "/assets/images/mujer-pirata-con-bandera.png",
  "/assets/images/mujer-pirata-con-bandera.png",
  "/assets/images/pirata-con-espada.png",
  "/assets/images/pirata-con-espada.png",
  "/assets/images/pirata-con-espada-madera.png",
  "/assets/images/pirata-con-espada-madera.png",
  "/assets/images/pirata-con-loro.png",
  "/assets/images/pirata-con-loro.png",
  "/assets/images/pirata-con-mono.png",
  "/assets/images/pirata-con-mono.png",
  "/assets/images/pirata-con-perro.png",
  "/assets/images/pirata-con-perro.png",
];

const memoryBoard = document.querySelector(".memory-board");
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(imagePath) {
  const card = document.createElement("div");
  card.className =
    "card relative w-40 max-[768px]:w-24   max-[768px]:h-32 h-52 bg-emerald-400 flex cursor-pointer border border-solid border-emerald-400  duration-500";

  const front = document.createElement("div");
  front.className = "front";

  const back = document.createElement("div");
  back.className = "back";

  const img = document.createElement("img");
  img.src = imagePath;
  back.appendChild(img);

  card.appendChild(back);
  card.appendChild(front);

  card.addEventListener("click", () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (
    !flippedCards.includes(card) &&
    flippedCards.length < 2 &&
    !matchedCards.includes(card)
  ) {
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkForMatch, 1000);
    }
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  const image1 = card1.querySelector(".back img").src;
  const image2 = card2.querySelector(".back img").src;

  if (image1 === image2) {
    matchedCards.push(card1, card2);
    flippedCards = [];

    if (matchedCards.length === cards.length) {
      alert("¡Has ganado!");
      resetGame();
    }
  } else {
    setTimeout(() => {
      flippedCards.forEach((card) => card.classList.remove("flipped"));
      flippedCards = [];
    }, 1000);
  }
}

function resetGame() {
  memoryBoard.innerHTML = "";
  initializeGame(cards);
}

function initializeGame(cards) {
  shuffle(cards);
  cards.forEach((imagePath) => {
    const card = createCard(imagePath);
    memoryBoard.appendChild(card);
  });
}
initializeGame(cards);
