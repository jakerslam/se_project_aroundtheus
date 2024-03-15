/** imports */
import "./index.css";
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
  profileEls,
} from "../utils/constants.js";

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

const userProfileInfo = new UserInfo(
  profileEls.profileNameEl,
  profileEls.profileBioEl
);

const createCard = (card) => {
  const newCard = new Card(
    card,
    newCardEls.cardTemplate,
    (cardImgUrl, cardName) => {
      imagePopUp.open({ cardImgUrl, cardName });
    }
  );
  return newCard.generateCard();
};

const createValidator = (modal) => {
  const newValidator = new FormValidator(genConfig, modal);
  newValidator.enableValidation();
  return newValidator;
};

// function handleImageClick(cardImgUrl, cardName) {
//   imagePopUp.open({ cardImgUrl, cardName });
// }

function fillProfileInputs() {
  const userInfo = userProfileInfo.getUserInfo();
  profileEls.profileBioInputEl.value = userInfo.userJob;
  profileEls.nameInput.value = userInfo.userName;
}

function saveEditProfileForm() {
  userProfileInfo.setUserInfo(
    profileEls.nameInput.value,
    profileEls.profileBioInputEl.value
  );
  profileEls.profileBioInputEl.value = "";
  profileEls.nameInput.value = "";
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
