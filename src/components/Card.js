

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

  deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
    this._handleDeleteApi(this._id);
  };

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLike);
    this._deleteButton.addEventListener("click", () => {
      this._confirmationModal.open();
      this._confirmationModal._form.addEventListener("submit", this.deleteCard);
    });
    document.addEventListener(this._confirmationModal.close, () => {
      this._confirmationModal._form.removeEventListener("submit", this.deleteCard);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._cardImgUrl, this._cardName);
    });
    this._confirmationModal._form.addEventListener("submit", () => {
      this._confirmationModal._handleSubmit();
     this._confirmationModal.close();
    });
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
    if (this._isLiked) {
      this._likeButton.classList.add("card__heart-button_clicked");
    }
    return this._cardElement;
  };
}
