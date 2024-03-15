/** imports */
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  newCardEls,
  genConfig,
  interfaceEls,
} from "../utils/constants.js";

/** Edit modal variables */
const editProfileModal = document.querySelector("#edit-modal");
const nameInput = editProfileModal.querySelector(
  ".modal__container-input_name"
);
const profileBioInputEl = editProfileModal.querySelector(".modal__container-input_bio");
const profileNameEl = document.querySelector(".profile__author-title");
const profileBioEl = document.querySelector(".profile__subtext");

const editProfileForm = new PopupWithForm("#edit-modal", () => {
  saveEditProfileForm();
});

const newCardForm = new PopupWithForm("#card-modal", () => {
  addCard();
});

const imagePopUp = new PopupWithImage("#photoViewModal");

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const newCard = createCard(card);
      cardSection.addItem(newCard);
    },
  },
  ".cards"
);


const userProfileInfo = new UserInfo(profileNameEl,profileBioEl);

const createCard = (card) => {
  const newCard = new Card(card, newCardEls.cardTemplate, handleImageClick);
  return newCard.generateCard();
};

const createValidator = (modal) => {
  const newValidator = new FormValidator(genConfig, modal);
  newValidator.enableValidation();
  return newValidator;
};

function handleImageClick(cardImgUrl, cardName) {
  imagePopUp.open({ cardImgUrl, cardName });
}

function fillProfileInputs() {
  const userInfo = userProfileInfo.getUserInfo();
  profileBioInputEl.value = userInfo.userJob;
  nameInput.value = userInfo.userName;
}

function saveEditProfileForm() {
  userProfileInfo.setUserInfo(nameInput.value, profileBioInputEl.value);
  profileBioInputEl.value = "";
  nameInput.value = "";
  editProfileForm.close();
}

function addCard() {
  const title = newCardEls.titleInput.value;
  const url = newCardEls.linkInput.value;
  const cardData = { name: title, link: url };
  const newCard = createCard(cardData);
  cardSection.addItem(newCard);
  newCardEls.cardForm.reset();
  newCardForm.close();
}

const addValidators = () => {
  Array.from(document.querySelectorAll(".modal")).forEach((modal) => {
    createValidator(modal);
  });
};

const addInitEventListeners = () => {
  interfaceEls.addCardButton.addEventListener("click", () => {
    newCardForm.open();
  });
  interfaceEls.editOpenButton.addEventListener("click", () => {
    editProfileForm.open();
    fillProfileInputs();
  });
  newCardForm.setEventListeners();
  editProfileForm.setEventListeners();
  imagePopUp.setEventListeners();
};

cardSection.renderItems();
addValidators();
addInitEventListeners();
