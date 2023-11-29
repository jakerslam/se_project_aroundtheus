let editButton = document.querySelector(".profile__edit-button");
let modalCloseButton = document.querySelector(".modal__container-close-button");
let modal =  document.querySelector(".modal");

editButton.addEventListener("click", openModalBox);
modalCloseButton.addEventListener("click", closeModalBox);

function openModalBox() {
    console.log("called openModalBox()");
    modal.classList.remove("modal-hidden");

    console.log("Modal class list after openModalBox(): " + modal.classList);
}

function closeModalBox(event) {
    event.preventDefault();
    console.log("called closeModalBox()")
    modal.classList.add("modal-hidden");
    console.log("Modal class list after closeModalBox(): " + modal.classList);
}

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

console.log(initialCards);