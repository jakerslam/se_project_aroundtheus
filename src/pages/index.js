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

const profilePicFormBtn = document
  .querySelector("#profile-pic-modal")
  .querySelector(".modal__container-button");

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

userApi
  .getInitialContent()
  .then((res) => {
    return checkServerResponse(res);
  })
  .then((userData) => {
    reloadProfile(userData);
    //console.log("userApi userData:", userData);
  })
  .catch((err) => {
    console.error(err);
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
  // console.log(
  //   "picLink in editProfilePicBox: ",
  //   picLink["modal__container-input_url"]
  // );
  // console.log(
  //   "profileEls.profilePic.src in editProfilePicBox before: ",
  //   profileEls.profilePic.src
  // );
  profileEls.profilePic.src = picLink["modal__container-input_url"];
  console.log(
    "profileEls.profilePic.src in editProfilePicBox after: ",
    profileEls.profilePic.src
  );
  //this.close();
  const userInfo = userProfileInfo.getUserInfo();
  //console.log("profilePicFormBtn:",profilePicFormBtn);
  profilePicFormBtn.value = "Saving...";
  userApi
    .editProfilePic(picLink["modal__container-input_url"], userInfo)
    .then((result) => {
      profilePicFormBtn.value = "Save";
    })
    .then((res) => {
      editProfilePicBox.close();
    });
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

const checkServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

//api cards
cardApi
  .getInitialContent()
  .then((res) => {
    return checkServerResponse(res);
  })
  .then((cardObjects) => {
    cardSection.renderItems(cardObjects);
  })
  .catch((err) => {
    console.error(err);
  });

const userProfileInfo = new UserInfo(
  profileEls.profileNameEl,
  profileEls.profileBioEl
);

const confirmationModal = new PopupWithConfirmation(
  "#confirm-delete-modal",
  () => {}
);

confirmationModal.setEventListeners();

const createCard = (card) => {
  const newCard = new Card(
    card,
    newCardEls.cardTemplate,
    (cardImgUrl, cardName) => {
      imagePopUp.open({ cardImgUrl, cardName });
    },
    (cardId) => {
      console.log("Handeling delete api for card in index", cardId);
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

  profileEls.editProfileButton.value = "Saving...";
  userApi.postProfileItem(userData).then((result) => {
    profileEls.editProfileButton.value = "Save";
  })
  .then(res => {
    editProfileForm.close();
  });
}

function addCard(inputValues) {
  const title = inputValues["modal__container-input_title"];
  const url = inputValues["modal__container-input_url"];
  const cardData = { name: title, link: url };
  const newCard = createCard(cardData);
  cardSection.addItem(newCard);
  newCardEls.cardForm.reset();
  newCardEls.cardSubmit.value = "Saving...";
  cardApi.postCard(cardData).then((results) => {
    newCardEls.cardSubmit.value = "Create";
  })
  .then(res => {
    newCardForm.close();
  });
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
