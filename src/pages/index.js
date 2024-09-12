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
    setAvatar(userData);
  })
  .catch((err) => {
    console.error(err);
  });

const setAvatar = (userData) => {
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
    console.log("cardObjects:", cardObjects);
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

const confirmationModal = new PopupWithConfirmation(
  "#confirm-delete-modal",
  ()=>{}
);

const randomFunction = ()=> {
  console.log("random function");
}
//confirmationModal.setSubmitAction(randomFunction);
//console.log("confirmationModal.handleConfirmation:",confirmationModal.handleConfirmation);
const handleDeleteClick = (card) => {
  console.log("card id in handleDeleteClick:",card._id);
  confirmationModal.open();
  // confirmationModal.setSubmitAction(() => {
  //   console.log("Submit handler for confirmationModal");
  //   confirmationModal.close();
  //   card.handleDelete();
  // });
  // confirmationModal._form.addEventListener(
  //   "submit",
  //   card.handleDelete
  // );
  // confirmationModal.addEventListener(confirmationModal.close, () =>
  //   confirmationModal._form.removeEventListener(
  //     "submit",
  //     card.handleDelete
  //   )
  // );
};

confirmationModal.setEventListeners();

const createCard = (card) => {
  const newCard = new Card(
    card,
    cardFormEls.cardTemplate,
    handleImageClick,
    deleteCard,
    toggleCardLike,
    handleDeleteClick
  );
  return newCard.generateCard();
};

const toggleCardLike = (cardId, isLiked) => {
  mainApi.toggleCardLike(cardId, isLiked);
};

const handleImageClick = (cardImgUrl, cardName) => {
  imagePopUp.open({ cardImgUrl, cardName });
};

const deleteCard = (card) => {
  console.log("deleteCard in index");
  mainApi.deleteCard(card._id);
  confirmationModal.close();
  confirmationModal._handleSubmit();
  confirmationModal._form.removeEventListener(
    "submit",
    card.handleDelete
  );
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

  renderSaveVisual(profileEls.editProfileButton, true);
  mainApi
    .postProfileItem(userData)
    .then(() => {
      editProfileForm.close();
    })
    .finally(() => {
      renderSaveVisual(profileEls.editProfileButton, false);
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
  const newCard = createCard(cardData);
  cardSection.addItem(newCard);
  cardFormEls.cardForm.reset();
  renderSaveVisual(cardFormEls.cardSubmit, true);
  mainApi
    .postCard(cardData)
    // .then((res) => {
    //   return checkServerResponse(res);
    // })
    .then(() => {
      newCardForm.close();
    })
    .finally(() => {
      renderSaveVisual(cardFormEls.cardSubmit, false, "Create");
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
  confirmationModal.setEventListeners();
};

addValidators();
addInitEventListeners();
