

export default class Card {
  constructor(data, cardTemplate, handleImageClick, handleDeleteApi,confirmationModal,cardApi) {
    this._handleImageClick = handleImageClick;
    this._cardImgUrl = data.link;
    this._cardName = data.name;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__heart-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__img");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._handleDeleteApi = handleDeleteApi;
    this._confirmationModal = confirmationModal
    this._authorizationVar = cardApi._headers.authorization;
    this._apiUrl = cardApi._baseUrl;

  }

  _handleDelete = () => {
    console.log("_handleDelete in card class for card ",this._id);
    this._cardElement.remove();
    this._cardElement = null;
    this._handleDeleteApi(this._id);
  };

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLike);
    this._deleteButton.addEventListener("click", () => {
      this._confirmationModal.open();
      this._confirmationModal._form.addEventListener("submit", this._handleDelete);
    });
    document.addEventListener(this._confirmationModal.close, () => {
      console.log("removing _handleDelete event listener");
      this._confirmationModal._form.removeEventListener("submit", this._handleDelete);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._cardImgUrl, this._cardName);
    });
    this._confirmationModal._form.addEventListener("submit", () => {
      this._confirmationModal._handleSubmit();
     this._confirmationModal.close();
    });
    //console.log("this._confirmationModal._form in card:",this._confirmationModal._form);
    //console.log("this._confirmationModal._form:",this._confirmationModal._form);
  }

  _handleLike = () => {
    if (!this._isLiked) {
      fetch(`${this._apiUrl}/${this._id}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorizationVar,
        "Content-type": "application/json",
      },
    });
    this._likeButton.classList.add("card__heart-button_clicked");
  } else {
    fetch(`${this._apiUrl}/${this._id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorizationVar,
        "Content-type": "application/json",
      },
    });
    this._likeButton.classList.remove("card__heart-button_clicked");
    }
  };

  generateCard = () => {
    this._cardImage.src = this._cardImgUrl;
    this._cardImage.alt = "An image of " + this._cardName;
    this._cardTitle.textContent = this._cardName;
    this._setEventListeners();
    //console.log("this._isLiked:",this._isLiked);
    //this._confirmDeleteBox.setEventListeners();
    if (this._isLiked) {
      this._likeButton.classList.add("card__heart-button_clicked");
    }
    //console.log("this._confirmDeleteBox in card.js:",this._confirmDeleteBox);
    return this._cardElement;
  };
}
