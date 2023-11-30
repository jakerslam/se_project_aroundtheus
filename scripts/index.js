
//Modal variables
let editButton = document.querySelector(".profile__edit-button");
let modalCloseButton = document.querySelector(".modal__container-close-button");
let modal =  document.querySelector(".modal");
let saveButton = modal.querySelector(".modal__container-button");
let nameInput = modal.querySelector(".modal__container-input-name");
let bioInput = modal.querySelector(".modal__container-input-bio");
let currentName = document.querySelector(".profile__author-title");
let currentBio = document.querySelector(".profile__subtext");

editButton.addEventListener("click", openModalBox);

//modal listeners
modalCloseButton.addEventListener("click", closeModalBox);
saveButton.addEventListener("click", modalSave);

//modal functions
function openModalBox() {
    modal.classList.remove("modal-hidden");
    bioInput.value = currentBio.innerText;
    nameInput.value = currentName.innerText;

    saveButton.addEventListener("click", modalSave);
}

function modalSave(event) {
    event.preventDefault();
    console.log("called modalSave");
    currentName.innerText = nameInput.value;
    currentBio.innerText = bioInput.value;
    closeModalBox(event);
}

function closeModalBox(event) {
    event.preventDefault();
    console.log("called closeModalBox()")
    modal.classList.add("modal-hidden");
    console.log("Modal class list after closeModalBox(): " + modal.classList);
}


//Card functions



let cardData1 = {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

let cardData2 = {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};

let cardData3 = {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
};

let cardData4 = {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
};

let cardData5 = {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
};

let cardData6 = {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
};

let initialCards = [cardData1,cardData2,cardData3,cardData4,cardData5,cardData6];
getCardElement();
function getCardElement(){
    let cardTemplate = document.querySelector("#cardTemplate").content;
    let cardDeck = document.querySelector('.cards');
    for (let i=0; i < initialCards.length;i++) {
    let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        cardElement.querySelector(".card__img").src = initialCards[i].link;
        cardElement.querySelector(".card__title").textContent = initialCards[i].name;
        cardDeck.append(cardElement);
    }
}



/*let cardTemplate = document.querySelector("#cardTemplate").content;
let cardDeck = document.querySelector('.cards');
let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
cardElement.querySelector('.card__img').src = initialCards[0].link;
console.log(cardElement.querySelector('.card__img').src);
cardDeck.append(cardElement);*/
