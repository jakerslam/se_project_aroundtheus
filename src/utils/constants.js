export const initialCards = [
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

export const newCardEls = {
  cardModal: document.querySelector("#card-modal"),
  cardForm: document.forms["card-form"],
  titleInput: document.querySelector(".modal__container-input_card-title-js"),
  linkInput: document.querySelector(".modal__container-input_card-url-js"),
  cardTemplate: document.querySelector("#cardTemplate").content,
};

export const genConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__container-input",
  submitButtonSelector: ".modal__container-button",
  inactiveButtonClass: "modal__container-button_disabled",
  inputErrorClass: "modal__container-input_error",
  showErrorElClass: "modal__container_error-message_visible",
};

export const interfaceEls = {
  addCardButton: document.querySelector(".profile__add-button"),
  editOpenButton: document.querySelector(".profile__edit-button"),
};

export const profileEls = {
  editProfileModal: document.querySelector("#edit-modal"),
  nameInput: document.querySelector("#edit-modal").querySelector(".modal__container-input_name"),
  profileBioInputEl: document.querySelector("#edit-modal").querySelector(
    ".modal__container-input_bio"
  ),
  profileNameEl: document.querySelector(".profile__author-title"),
  profileBioEl: document.querySelector(".profile__subtext"),
  profilePic: document.querySelector(".profile__author-img"),
};
