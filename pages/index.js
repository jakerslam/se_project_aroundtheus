/** Card functions */
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
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
// const cardConfig = {

// };
const cardTemplate = document.querySelector("#cardTemplate").content;
const cardDeck = document.querySelector(".cards");

function renderCards() {
  initialCards.forEach((card) => {  
    const cardName = card.name;
    const cardSrc = card.link;
    const cardData = { name: cardName, link: cardSrc };
    const cardSelector = cardTemplate.querySelector(".card");
    const newCard = new Card(cardData, cardSelector, handleImageClick);
    cardDeck.append(newCard.populateCard());
  });
}

function handleImageClick(cardImgUrl,cardName) {
  openImageViewer(cardImgUrl, cardName);
}

renderCards();

/** Edit modal variables */
const editProfileForm = document.querySelector("#edit-modal");
const editOpenButton = document.querySelector(".profile__edit-button");
addCloseEventListener(editProfileForm);
const nameInput = editProfileForm.querySelector(".modal__container-input_name");
const bioInput = editProfileForm.querySelector(".modal__container-input_bio");
const currentName = document.querySelector(".profile__author-title");
const currentBio = document.querySelector(".profile__subtext");

/** modal functions */
function openEditProfileForm() {
  openModal(editProfileForm);
  fillProfileInputs();
}
editProfileForm
  .querySelector(".modal__form")
  .addEventListener("submit", saveEditProfileForm);
editOpenButton.addEventListener("click", openEditProfileForm);

function fillProfileInputs() {
  bioInput.value = currentBio.textContent;
  nameInput.value = currentName.textContent;
}

function saveEditProfileForm(event) {
  event.preventDefault();
  const submitButton = editProfileForm.querySelector(genConfig.submitButtonSelector);
  currentName.textContent = nameInput.value;
  currentBio.textContent = bioInput.value;
  disableButton(submitButton);
  closeModal(editProfileForm);
}

/** card modal variables */
const newCardModal = document.querySelector("#card-modal");
const addCardButton = document.querySelector(".profile__add-button");
newCardModal.querySelector(".modal__form").addEventListener("submit", addCard);
addCloseEventListener(newCardModal);
const titleInput = newCardModal.querySelector(".modal__container-input_title");
const linkInput = newCardModal.querySelector(".modal__container-input_url");

/** card modal functions */
function openNewCardForm() {
  openModal(newCardModal);
}
addCardButton.addEventListener("click", openNewCardForm);

function addCard(evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const url = linkInput.value;
  const cardData = { name: title, link: url };
  const cardSelector = cardTemplate.querySelector(".card");
  const newCard = new Card(cardData, cardSelector, handleImageClick);
  const submitButton = newCardModal.querySelector(genConfig.submitButtonSelector);
  cardDeck.prepend(newCard.populateCard());
  newCardModal.querySelector(".modal__form").reset();
  disableButton(submitButton);
  closeModal(newCardModal);
}

/** image viewer variables */
const imageViewer = document.querySelector("#photoViewModal");
const imageViewerImg = imageViewer.querySelector(".modal__container-image");
const imageViewerTitle = imageViewer.querySelector(
  ".modal__container-image-title"
);
addCloseEventListener(imageViewer);

/** opens image view modal */
function openImageViewer(imageSrc, title) {
  openModal(imageViewer);
  imageViewerImg.src = imageSrc;
  imageViewerTitle.textContent = title;
  imageViewerImg.alt = `A photo of ${title}`;
}

/** universal open modal function */
function openModal(modal) {
  const validator = new FormValidator(genConfig,modal);
  validator.enableValidation();
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

/** universal close modal function */
function closeModal(modal) {
  modal.classList.add("modal_hidden");
  modal.classList.remove("modal_visible-js");
  document.removeEventListener("keydown", handleEscEvent);
}

const disableButton = (button) => {
  button.classList.add(genConfig.inactiveButtonClass);
  button.disabled = true;
}
// const enableButton = (button) => {
//   button.classList.remove(genConfig.inactiveButtonClass);
//   button.disabled = false;
// }