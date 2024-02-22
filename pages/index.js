/** Card functions */
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
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
const genConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__container-input",
  submitButtonSelector: ".modal__container-button",
  inactiveButtonClass: "modal__container-button_disabled",
  inputErrorClass: "modal__container-input_error",
  showErrorElClass: "modal__container_error-message_visible",
};
const cardEls = {
  cardTemplate : document.querySelector("#cardTemplate").content,
  cardDeck : document.querySelector(".cards"),
};

const interfaceEls = {
  addCardButton : document.querySelector(".profile__add-button"),
  editOpenButton : document.querySelector(".profile__edit-button"),
};

function renderCards() {
  initialCards.forEach((card) => {
    const newCard = createCard(card);
    cardEls.cardDeck.append(newCard);
  });
}

const createCard = (card) => {
  const cardElement = cardEls.cardTemplate.querySelector(".card");
  const newCard = new Card(card, cardElement, handleImageClick);
  return newCard.generateCard();
};

const createValidator = (modal) => {
  const newValidator = new FormValidator(genConfig, modal);
  newValidator.enableValidation();
  return newValidator;
};

function handleImageClick(cardImgUrl, cardName) {
  openImageViewer(cardImgUrl, cardName);
}

/** Edit modal variables */
const editProfileModal = document.querySelector("#edit-modal");
const profileForm = document.forms["bio-form"];
const nameInput = editProfileModal.querySelector(
  ".modal__container-input_name"
);
const bioInput = editProfileModal.querySelector(".modal__container-input_bio");
const currentName = document.querySelector(".profile__author-title");
const currentBio = document.querySelector(".profile__subtext");

/** modal functions */
function openEditProfileForm() {
  openModal(editProfileModal);
  fillProfileInputs();
}
profileForm.addEventListener("submit", saveEditProfileForm);
interfaceEls.editOpenButton.addEventListener("click", openEditProfileForm);

function fillProfileInputs() {
  bioInput.value = currentBio.textContent;
  nameInput.value = currentName.textContent;
}

function saveEditProfileForm(event) {
  event.preventDefault();
  currentName.textContent = nameInput.value;
  currentBio.textContent = bioInput.value;
  bioInput.value = "";
  nameInput.value = "";
  closeModal(editProfileModal);
}

/** card modal variables */
const newCardEls = {
  cardModal : document.querySelector("#card-modal"),
  cardForm : document.forms["card-form"],
  titleInput : document.querySelector("#card-modal").querySelector(".modal__container-input_title"),
  linkInput : document.querySelector("#card-modal").querySelector(".modal__container-input_url"),
};
/** card modal functions */
function openNewCardForm() {
  openModal(newCardEls.cardModal);
}

function addCard(evt) {
  evt.preventDefault();
  const title = newCardEls.titleInput.value;
  const url = newCardEls.linkInput.value;
  const cardData = { name: title, link: url };
  const newCard = createCard(cardData);
  cardEls.cardDeck.prepend(newCard);
  newCardEls.cardForm.reset();
  newCardEls.titleInput.value = "";
  newCardEls.linkInput.value = "";
  closeModal(newCardEls.cardModal);
}

/** image viewer variables */
const imgViewEls = {
  imageViewer : document.querySelector("#photoViewModal"),
  imageViewerImg : document.querySelector("#photoViewModal").querySelector(".modal__container-image"),
  imageViewerTitle : document.querySelector("#photoViewModal").querySelector(
    ".modal__container-image-title"
  ),
};

/** opens image view modal */
function openImageViewer(imageSrc, title) {
  openModal(imgViewEls.imageViewer);
  imgViewEls.imageViewerImg.src = imageSrc;
  imgViewEls.imageViewerTitle.textContent = title;
  imgViewEls.imageViewerImg.alt = `A photo of ${title}`;
}

/** universal open modal function */
function openModal(modal) {
  modal.classList.remove("modal_hidden");
  modal.classList.add("modal_visible-js");
  document.addEventListener("keydown", handleEscEvent);
}

const handleEscEvent = (evt) => {
  if (evt.key === "Escape") {
    const currentModal = document.querySelector(".modal_visible-js");
    closeModal(currentModal);
  }
};

function addCloseEventListener(modal) {
  const popUpBox = modal.querySelector(".modal__container_js");
  const closeButton = modal.querySelector(".modal__container-close-button");
  const closeNormally = () => {
    closeModal(modal);
  };
  const closeClickAway = (evt) => {
    if (!popUpBox.contains(evt.target)) closeModal(modal);
  };
  modal.addEventListener("click", closeClickAway);
  closeButton.addEventListener("click", closeNormally);
}

const addValidators = () => {
  Array.from(document.querySelectorAll(".modal")).forEach((modal)=>{
    createValidator(modal);
  });
};

const addInitEventListeners = () => {
  interfaceEls.addCardButton.addEventListener("click", openNewCardForm);
  addCloseEventListener(imgViewEls.imageViewer);
  newCardEls.cardForm.addEventListener("submit", addCard);
  addCloseEventListener(editProfileModal);
  addCloseEventListener(newCardEls.cardModal);
}
/** universal close modal function */
function closeModal(modal) {
  modal.classList.add("modal_hidden");
  modal.classList.remove("modal_visible-js");
  document.removeEventListener("keydown", handleEscEvent);
}

renderCards();
addValidators();
addInitEventListeners();