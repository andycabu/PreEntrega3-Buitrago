const openModalButton = document.getElementById("openModal");
const modalName = document.getElementById("myModal");
const closeModalButton = document.querySelector(".close");
const nameInput = document.getElementById("nameInput");
const saveNameButton = document.getElementById("saveName");
const playerNameElement = document.getElementById("name");

modalName.style.display = "flex";
// Abrir el modal
openModalButton.addEventListener("click", function () {
  modalName.style.display = "flex";
});

// Cerrar el modal al hacer clic en la 'x'
closeModalButton.addEventListener("click", function () {
  modalName.style.display = "none";
});

// Guardar el nombre en Local Storage al hacer clic en el botón "Guardar"
saveNameButton.addEventListener("click", function () {
  const playerName = nameInput.value.trim();

  if (playerName !== "") {
    // Guardar el nombre en Local Storage
    localStorage.setItem("playerName", playerName);

    // Mostrar el nombre en el elemento p
    playerNameElement.textContent = playerName;

    // Cerrar el modal
    modalName.style.display = "none";
  }
});

// Verificar si hay un nombre guardado en Local Storage al cargar la página
const savedPlayerName = localStorage.getItem("playerName");
if (savedPlayerName) {
  playerNameElement.textContent = savedPlayerName;
}
