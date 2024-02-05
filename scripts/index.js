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
  cardImage.src = card.link;
  const cardName = card.name;
  cardElement.querySelector(".card__title").textContent = cardName;
  cardElement.querySelector(".card__img").alt = "An image of " + cardName;
  const likeButton = cardElement.querySelector(".card__heart-button");

  cardImage.addEventListener("click", () => {
    openImageViewer(cardImage.src, cardName);
  });
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__heart-button_clicked");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
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
  populateProfileForm();
}
editOpenButton.addEventListener("click", openEditProfileForm);

function populateProfileForm() {
  bioInput.value = currentBio.textContent;
  nameInput.value = currentName.textContent;
}

function editProfileFormSave(event) {
  event.preventDefault();
  currentName.textContent = nameInput.value;
  currentBio.textContent = bioInput.value;
  closeModal(editProfileForm);
}
editProfileForm
  .querySelector(".modal__form")
  .addEventListener("submit", editProfileFormSave);

editCloseButton.addEventListener("click", () => {
  closeModal(editProfileForm);
});

/** card modal variables */
const newCardForm = document.querySelector("#card-modal");
const addCardButton = document.querySelector(".profile__add-button");
const cardCloseFormButton = newCardForm.querySelector(
  ".modal__container-close-button"
);
newCardForm.querySelector(".modal__form").addEventListener("submit", addCard);

const titleInput = newCardForm.querySelector(".modal__container-input_title");
const linkInput = newCardForm.querySelector(".modal__container-input_url");

/** card modal functions */
function openNewCardForm() {
  openModal(newCardForm);
  newCardForm.querySelector(".modal__form").reset();
}
addCardButton.addEventListener("click", openNewCardForm);

function addCard(event) {
  event.preventDefault();
  const title = titleInput.value;
  const url = linkInput.value;
  const newCard = { name: title, link: url };
  cardDeck.prepend(getCardElement(newCard));
  closeModal(newCardForm, event);
}

cardCloseFormButton.addEventListener("click", () => {
  closeModal(newCardForm);
});

/** image viewer variables */
const imageViewer = document.querySelector("#photoViewModal");
const imageViewerImg = imageViewer.querySelector(".modal__container-image");
const imageViewerTitle = imageViewer.querySelector(
  ".modal__container-image-title"
);
const imageViewerCloseButton = imageViewer.querySelector(
  ".modal__container-close-button"
);
imageViewerCloseButton.addEventListener("click", () => {
  closeModal(imageViewer);
});

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
  addCloseEventListeners(modal);
}

function addCloseEventListeners(modal) {
  const popUpBox =
    modal.querySelector(".modal__container") ||
    modal.querySelector(".modal__container-image");
  modal.addEventListener("click", (evt) => {
    if (!popUpBox.contains(evt.target)) closeModal(modal);
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") closeModal(modal);
  });
}

/** universal close modal function */
function closeModal(modal) {
  modal.classList.add("modal_hidden");
}
