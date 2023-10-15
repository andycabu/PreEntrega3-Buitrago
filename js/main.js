const openModalButton = document.getElementById("openModal");
const modalName = document.getElementById("myModal");
const closeModalButton = document.querySelector(".close");
const nameInput = document.getElementById("nameInput");
const saveNameButton = document.getElementById("saveName");
const playerNameElement = document.getElementById("name");

modalName.style.display = "flex";

openModalButton.addEventListener("click", function () {
  modalName.style.display = "flex";
});

closeModalButton.addEventListener("click", function () {
  modalName.style.display = "none";
});

saveNameButton.addEventListener("click", function () {
  const playerName = nameInput.value.trim();

  if (playerName !== "") {
    localStorage.setItem("playerName", playerName);

    playerNameElement.textContent = playerName;

    modalName.style.display = "none";
  }
});

const savedPlayerName = localStorage.getItem("playerName");
if (savedPlayerName) {
  playerNameElement.textContent = savedPlayerName;
}
