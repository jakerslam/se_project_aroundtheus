/** API token:
 * "token":"99084de7-d532-4ca6-836e-6f6bea8ffc16"
 *  */

/** imports */
import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  initialCards,
  newCardEls,
  genConfig,
  interfaceEls,
  profileEls,
} from "../utils/constants.js";

const apiToken = "99084de7-d532-4ca6-836e-6f6bea8ffc16";
const cardApi = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/cards",
  headers: {
    authorization: apiToken,
    "Content-Type": "application/json",
  },
});

const userApi = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/users/me",
  headers: {
    authorization: apiToken,
    "Content-Type": "application/json",
  },
});



userApi.getInitialContent()
.then((userData) => {
  reloadProfile(userData);
  console.log("userApi userData:",userData);
});


const reloadProfile = (userData) => {
  userProfileInfo.setUserInfo(userData.name, userData.about);
  userData.avatar
    ? (document.querySelector(
        ".profile__author-img"
      ).src = `${userData.avatar}`)
    : false;
};

const editProfileForm = new PopupWithForm("#edit-modal", (inputValues) => {
  saveEditProfileForm(inputValues);
});

const newCardForm = new PopupWithForm("#card-modal", (inputValues) => {
  addCard(inputValues);
});

const editProfilePicBox = new PopupWithForm("#profile-pic-modal", (picLink) => {
  console.log("picLink in editProfilePicBox: ",picLink['modal__container-input_url']);
  console.log("profileEls.profilePic.src in editProfilePicBox before: ",profileEls.profilePic.src);
  profileEls.profilePic.src = picLink['modal__container-input_url'];//'https://cdn.pornify.cc/img_new/dd6663f42f1055a441c64c74327e544bd6009c3b77a2861c93c202bdefa1cb56.jpg';
  console.log("profileEls.profilePic.src in editProfilePicBox after: ",profileEls.profilePic.src);
  //this.close();
  const userInfo = userProfileInfo.getUserInfo();
  userApi.editProfilePic(picLink['modal__container-input_url'],userInfo);
  editProfilePicBox.close();
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

//api cards
cardApi
  .getInitialContent()
  .then((cardObjects) => {
    cardSection.renderItems(cardObjects);
  });

const userProfileInfo = new UserInfo(
  profileEls.profileNameEl,
  profileEls.profileBioEl
);

const confirmationModal = new PopupWithConfirmation("#confirm-delete-modal", () => {
});

confirmationModal.setEventListeners();

const createCard = (card) => {
  const newCard = new Card(
    card,
    newCardEls.cardTemplate,
    (cardImgUrl, cardName) => {
      imagePopUp.open({ cardImgUrl, cardName });
    },
    (cardId) => {
      console.log("Handeling delete api for card in index",cardId);   
      cardApi.deleteCard(cardId);
    },
    confirmationModal,
    cardApi
  );
  return newCard.generateCard();
};

const createValidator = (modal) => {
  const newValidator = new FormValidator(genConfig, modal);
  newValidator.enableValidation();
  return newValidator;
};

function fillProfileInputs() {
  const userInfo = userProfileInfo.getUserInfo();
  profileEls.profileBioInputEl.value = userInfo.userJob;
  profileEls.nameInput.value = userInfo.userName;
}

function saveEditProfileForm(inputValues) {
  userProfileInfo.setUserInfo(
    inputValues["modal__container-input_name"],
    inputValues["modal__container-input_bio"]
  );
  profileEls.profileBioInputEl.value = "";
  profileEls.nameInput.value = "";
  const userData = {
    name: inputValues["modal__container-input_name"],
    about: inputValues["modal__container-input_bio"],
  };
  userApi.postProfileItem(userData);
  editProfileForm.close();
}

function addCard(inputValues) {
  const title = inputValues["modal__container-input_title"];
  const url = inputValues["modal__container-input_url"];
  const cardData = { name: title, link: url };
  const newCard = createCard(cardData);
  cardSection.addItem(newCard);
  newCardEls.cardForm.reset();
  cardApi.postCard(cardData);
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
  profileEls.profilePic.addEventListener("click", () => {
    editProfilePicBox.open();
   });
  newCardForm.setEventListeners();
  editProfileForm.setEventListeners();
  imagePopUp.setEventListeners();
  editProfilePicBox.setEventListeners();
};

//cardSection.renderItems();
addValidators();
addInitEventListeners();
