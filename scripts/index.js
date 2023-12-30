//Card functions

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardTemplate = document.querySelector("#cardTemplate").content;
const cardDeck = document.querySelector(".cards");

//card pseudoclass constructor
function getCardElement(card) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  cardImage.src = card.link;
  const cardName = card.name;
  cardElement.querySelector(".card__title").textContent = cardName;
  cardElement.querySelector(".card__img").alt = "An image of " + cardName;
  const likeButton = cardElement.querySelector(".card__heart-button");

  
  cardImage.addEventListener("click", () => {
    openImageModal(cardImage.src, cardName);
});
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__heart-button_clicked");
  });
  likeButton.addEventListener("hover", (likeButton) => {
    likeButton.classList.toggle("card__heart-button_hover");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {cardElement.remove();});
  return cardElement;
} 

function renderCards() {
  /*for (let i=0; i < initialCards.length;i++) {
        cardDeck.append(getCardElement(initialCards[i]));
    }*/
  initialCards.forEach((card) => {
    cardDeck.append(getCardElement(card));
  });
}

renderCards();

//Edit modal variables
const editModal = document.querySelector("#edit-modal");
const editOpenButton = document.querySelector(".profile__edit-button");
const editCloseButton = editModal.querySelector(
  ".modal__container-close-button"
);
const nameInput = editModal.querySelector(".modal__container-input_field_name");
const bioInput = editModal.querySelector(".modal__container-input_field_bio");
const currentName = document.querySelector(".profile__author-title");
const currentBio = document.querySelector(".profile__subtext");

//modal functions
function openEditModal() {
  editModal.classList.remove("modal_hidden");
  bioInput.value = currentBio.textContent;
  nameInput.value = currentName.textContent;
  editModal3
    .querySelector(".modal__form")
    .addEventListener("submit", editModalSave);
}
editOpenButton.addEventListener("click", openEditModal);

function editModalSave(event) {
  event.preventDefault;
  console.log("editModalSave");
  currentName.textContent = nameInput.value;
  currentBio.textContent = bioInput.value;
  closeEditModal(event);
}

function closeEditModal(event) {
  event.preventDefault();
  console.log("closeEditModal");
  editModal.classList.add("modal_hidden");
}
editCloseButton.addEventListener("click", closeEditModal);

//card modal variables
const cardModal = document.querySelector("#card-modal");
const addCardButton = document.querySelector(".profile__add-button");
const cardCloseButton = cardModal.querySelector(
  ".modal__container-close-button"
);
const titleInput = cardModal.querySelector(
  ".modal__container-input_field_title"
);
const linkInput = cardModal.querySelector(".modal__container-input_field_link");

//card modal functions
function openCardModal() {
  cardModal.classList.remove("modal_hidden");
  titleInput.value = "";
  linkInput.value = "";
  cardModal.querySelector(".modal__form").addEventListener("submit", addCard);
}
addCardButton.addEventListener("click", openCardModal);

function addCard(event) {
  event.preventDefault;
  console.log("addCard");
  const title = titleInput.value;
  const url = linkInput.value;
  const newCard = { name: title, link: url };
  initialCards.push(newCard);
  cardDeck.append(getCardElement(newCard));
  closeCardModal(event);
}

function deleteCard (card) {
    initialCards.pop(card);
    cardDeck.pop(card);
}

function closeCardModal(event) {
  event.preventDefault();
  console.log("closeCardModal");
  cardModal.classList.add("modal_hidden");
}
cardCloseButton.addEventListener("click", closeCardModal);

const imageModal = document.querySelector("#photoViewModal");
const imageModalImg = imageModal.querySelector(".modal__container-image");
const imageModalTitle = imageModal.querySelector(".modal__container-image-title");
const imageModalCloseButton = imageModal.querySelector(".modal__container-close-button");
imageModalCloseButton.addEventListener("click", closeImageModal)

function openImageModal(imageSrc, title) {
    imageModal.classList.remove("modal_hidden");
    imageModalImg.src = imageSrc;
    imageModalTitle.textContent = title;
}

function closeImageModal() {
    imageModal.classList.add("modal_hidden");
}