/** Card functions */
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

const cardTemplate = document.querySelector("#cardTemplate").content;
const cardDeck = document.querySelector(".cards");

/**
 * card pseudoclass constructor
 *  @constructor */
function getCardElement(card) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardName = card.name;
  const likeButton = cardElement.querySelector(".card__heart-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = card.link;
  cardImage.alt = "An image of " + cardName;
  cardTitle.textContent = cardName;
  cardImage.addEventListener("click", () => {
    openImageViewer(cardImage.src, cardName);
  });
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__heart-button_clicked");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  return cardElement;
}

function renderCards() {
  initialCards.forEach((card) => {
    cardDeck.append(getCardElement(card));
  });
}

renderCards();

/** Edit modal variables */
const editProfileForm = document.querySelector("#edit-modal");
const editOpenButton = document.querySelector(".profile__edit-button");
const editCloseButton = editProfileForm.querySelector(
  ".modal__container-close-button"
);
const nameInput = editProfileForm.querySelector(".modal__container-input_name");
const bioInput = editProfileForm.querySelector(".modal__container-input_bio");
const currentName = document.querySelector(".profile__author-title");
const currentBio = document.querySelector(".profile__subtext");

/** modal functions */
function openEditProfileForm() {
  openModal(editProfileForm);
  fillProfileInputs();
  editProfileForm
    .querySelector(".modal__form")
    .addEventListener("submit", saveEditProfileForm);
}
editOpenButton.addEventListener("click", openEditProfileForm);

function fillProfileInputs() {
  bioInput.value = currentBio.textContent;
  nameInput.value = currentName.textContent;
}

function saveEditProfileForm(event) {
  event.preventDefault();
  currentName.textContent = nameInput.value;
  currentBio.textContent = bioInput.value;
  closeModal(editProfileForm);
}

/** card modal variables */
const newCardModal = document.querySelector("#card-modal");
const addCardButton = document.querySelector(".profile__add-button");
const cardCloseFormButton = newCardModal.querySelector(
  ".modal__container-close-button"
);
newCardModal.querySelector(".modal__form").addEventListener("submit", addCard);

const titleInput = newCardModal.querySelector(".modal__container-input_title");
const linkInput = newCardModal.querySelector(".modal__container-input_url");

/** card modal functions */
function openNewCardForm() {
  openModal(newCardModal);
  // newCardModal.querySelector(".modal__form").reset();
}
addCardButton.addEventListener("click", openNewCardForm);

function addCard(evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const url = linkInput.value;
  const newCard = { name: title, link: url };
  cardDeck.prepend(getCardElement(newCard));
  newCardModal.querySelector(".modal__form").reset();
  closeModal(newCardModal);
}

/** image viewer variables */
const imageViewer = document.querySelector("#photoViewModal");
const imageViewerImg = imageViewer.querySelector(".modal__container-image");
const imageViewerTitle = imageViewer.querySelector(
  ".modal__container-image-title"
);
const imageViewerCloseButton = imageViewer.querySelector(
  ".modal__container-close-button"
);

/** opens image view modal */
function openImageViewer(imageSrc, title) {
  openModal(imageViewer);
  imageViewerImg.src = imageSrc;
  imageViewerTitle.textContent = title;
  imageViewerImg.alt = `A photo of ${title}`;
}

/** universal open modal function */
function openModal(modal) {
  modal.classList.remove("modal_hidden");
  toggleCloseEventListeners(modal, "add");
}

function toggleCloseEventListeners(modal, option) {
  const popUpBox =
    modal.querySelector(".modal__container") ||
    modal.querySelector(".modal__container-image");
  const closeButton = modal.querySelector(".modal__container-close-button");
  const closeWithEsc = (evt, modal) => {
    if (evt.key === "Escape") closeModal(modal);
  };
  const closeClickAway = (evt, popUpBox, modal) => {
    if (!popUpBox.contains(evt.target)) closeModal(modal);
  };
  if (option == "add") {
    modal.addEventListener("click", (evt) => {
      closeClickAway(evt, popUpBox, modal);
    });
    document.addEventListener("keydown", (evt) => {
      closeWithEsc(evt, modal);
    });
    closeButton.addEventListener("click", () => {
      closeModal(modal);
    });
  } else if (option == "remove") {
    document.removeEventListener("keydown", (evt) => {
      closeWithEsc(evt, modal);
    });
    closeButton.removeEventListener("click", () => {
      closeModal(modal);
    });
    modal.removeEventListener("click", (evt) => {
      closeClickAway(evt, popUpBox, modal);
    });
  }
}

/** universal close modal function */
function closeModal(modal) {
  modal.classList.add("modal_hidden");
  toggleCloseEventListeners(modal, "remove");
}
