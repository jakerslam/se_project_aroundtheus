
//Card functions

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
const cardDeck = document.querySelector('.cards');
function getCardElement(card){
    
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        const imageLink = card.link;
        cardElement.querySelector(".card__img").src = imageLink;
        const cardName = card.name;
        cardElement.querySelector(".card__title").textContent = cardName;
        cardElement.querySelector(".card__img").alt = "An image of " + cardName;
        return cardElement;
}

function renderCards() {
    for (let i=0; i < initialCards.length;i++) {
        cardDeck.append(getCardElement(initialCards[i]));
    }
}

renderCards();



//Modal variables
const editButton = document.querySelector(".profile__edit-button");
const modalCloseButton = document.querySelector(".modal__container-close-button");
const modal =  document.querySelector(".modal");
const nameInput = modal.querySelector(".modal__container-input_name");
const bioInput = modal.querySelector(".modal__container-input_bio");
const currentName = document.querySelector(".profile__author-title");
const currentBio = document.querySelector(".profile__subtext");
//const saveButton = modal.querySelector(".modal__container-button");


//modal listeners
//saveButton.addEventListener("click", modalSave);

//modal functions
function openModalBox() {
    modal.classList.remove("modal_hidden");
    bioInput.value = currentBio.textContent;
    nameInput.value = currentName.textContent;

    //saveButton.addEventListener("click", modalSave);
}
editButton.addEventListener("click", openModalBox);

function modalSave(event) {
    event.preventDefault;
    console.log("calling modalSave()");
    currentName.textContent = nameInput.value;
    currentBio.textContent = bioInput.value;
    console.log(currentName.textContent);
    console.log(currentBio.textContent);
    closeModalBox(event);
}
modal.querySelector(".modal__form").addEventListener("submit", modalSave);

function closeModalBox(event) {
    event.preventDefault();
    modal.classList.add("modal_hidden");
}
modalCloseButton.addEventListener("click", closeModalBox);
