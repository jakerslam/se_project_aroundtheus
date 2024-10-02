/** API token:
 * "token":"99084de7-d532-4ca6-836e-6f6bea8ffc16"
 *  */

/** imports */
import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  cardFormEls,
  genConfig,
  interfaceEls,
  profileEls,
  apiVars,
  cardEls,
} from "../utils/constants.js";

const profilePicFormBtn = document
  .querySelector("#profile-pic-modal")
  .querySelector(".modal__container-button");

const mainApi = new Api({
  baseUrl: apiVars.baseUrl,
  headers: {
    authorization: apiVars.apiToken,
    "Content-Type": "application/json",
  },
});

mainApi
  .getInitialProfile()
  .then((userData) => {
    setUserInfo(userData);
  })
  .catch((err) => {
    console.error(err);
  });

const setUserInfo = (userData) => {
  userProfileInfo.setUserInfo(userData.name, userData.about, userData.avatar);
};

const editProfileForm = new PopupWithForm("#edit-modal", (inputValues) => {
  saveEditProfileForm(inputValues);
});

const newCardForm = new PopupWithForm("#card-modal", (inputValues) => {
  addCard(inputValues);
});

const editProfilePicBox = new PopupWithForm("#profile-pic-modal", (picLink) => {
  renderSaveVisual(profilePicFormBtn, true);
  mainApi
    .editProfilePic(picLink["modal__container-input_url"])
    .then(() => {
      userProfileInfo.setAvatar(picLink["modal__container-input_url"]);
      editProfilePicBox.close();
    })
    .finally(() => {
      renderSaveVisual(profilePicFormBtn, false);
    })
    .catch((err) => {
      console.error(err);
    });
});

const imagePopUp = new PopupWithImage("#photoViewModal");
const cardSection = new Section(
  {
    items: {},
    renderer: (card) => {
      const newCard = createCard(card);
      cardSection.addItem(newCard);
    },
  },
  ".cards"
);

//api cards
mainApi
  .getInitialCards()
  .then((cardObjects) => {
    cardSection.renderItems(cardObjects);
  })
  .catch((err) => {
    console.error(err);
  });

const userProfileInfo = new UserInfo(
  profileEls.profileNameEl,
  profileEls.profileBioEl,
  profileEls.profilePic
);

const confirmationModal = new PopupWithConfirmation("#confirm-delete-modal");

const openDelConfirmation = (card) => {
  confirmationModal.open();
  confirmationModal.setSubmitAction(() => {
    mainApi
      .deleteCard(card._id)
      .then(() => {
        card.handleDelete();
        confirmationModal.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

const createCard = (card) => {
  const newCard = new Card(
    card,
    cardFormEls.cardTemplate,
    handleImageClick,
    toggleCardLike,
    openDelConfirmation
  );
  return newCard.generateCard();
};

const toggleCardLike = (cardId, isLiked) => {
  mainApi.toggleCardLike(cardId, isLiked);
};

const handleImageClick = (cardImgUrl, cardName) => {
  imagePopUp.open({ cardImgUrl, cardName });
};

const createValidator = (modal) => {
  const newValidator = new FormValidator(genConfig, modal);
  newValidator.enableValidation();
  console.log(newValidator);
  return newValidator;
};

function fillProfileInputs() {
  const userInfo = userProfileInfo.getUserInfo();
  profileEls.profileBioInputEl.value = userInfo.userJob;
  profileEls.nameInput.value = userInfo.userName;
}

function saveEditProfileForm(inputValues) {
  const userData = {
    name: inputValues["modal__container-input_name"],
    about: inputValues["modal__container-input_bio"],
  };
  renderSaveVisual(profileEls.editProfileButton, true);
  mainApi
    .postProfileItem(userData)
    .then(() => {
      userProfileInfo.setUserInfo(
        inputValues["modal__container-input_name"],
        inputValues["modal__container-input_bio"]
      );
      editProfileForm.close();
      formValidators['editProfileForm'].resetValidation();
        })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderSaveVisual(profileEls.editProfileButton, false);
      // profileEls.profileBioInputEl.value = "";
      // profileEls.nameInput.value = "";
    });
}

const renderSaveVisual = (el, isSaving, altText) => {
  if (isSaving) {
    altText ? (el.value = altText) : (el.value = "Saving...");
  } else {
    altText ? (el.value = altText) : (el.value = "Save");
  }
};

function addCard(inputValues) {
  const title = inputValues["modal__container-input_title"];
  const url = inputValues["modal__container-input_url"];
  const cardData = { name: title, link: url };
  renderSaveVisual(cardFormEls.cardSubmit, true);
  mainApi
    .postCard(cardData)
    .then((card) => {
      const newCard = createCard(card);
      cardSection.addItem(newCard);
      newCardForm.close();
      cardFormEls.cardForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderSaveVisual(cardFormEls.cardSubmit, false, "Create");
      //newValidator.resetValidation();
    });
}

const addValidators = () => {
  return Array.from(document.querySelectorAll(".modal")).forEach((modal) => {
    formValidators[modal] = createValidator(modal);
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
  confirmationModal.setEventListeners();
};

const formValidators = {};
addValidators();
console.log("formValidators: ",formValidators);
addInitEventListeners();
