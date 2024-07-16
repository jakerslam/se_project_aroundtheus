
export const newCardEls = {
  cardModal: document.querySelector("#card-modal"),
  cardForm: document.forms["card-form"],
  cardSubmit: document.querySelector("#card-modal").querySelector(".modal__container-button"),
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
  editProfileButton: document.querySelector("#edit-modal").querySelector(".modal__container-button"),
  profileBioInputEl: document.querySelector("#edit-modal").querySelector(
    ".modal__container-input_bio"
  ),
  profileNameEl: document.querySelector(".profile__author-title"),
  profileBioEl: document.querySelector(".profile__subtext"),
  profilePic: document.querySelector(".profile__author-img"),
};

export const apiVars = {
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  apiToken: "99084de7-d532-4ca6-836e-6f6bea8ffc16",
}