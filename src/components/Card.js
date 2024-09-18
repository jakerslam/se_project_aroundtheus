export default class Card {
  constructor(
    data,
    cardTemplate,
    handleImageClick,
    cardLikeHandeler,
    openDelConfirmation
  ) {
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
    this._cardLikeHandeler = cardLikeHandeler;
    this._openDelConfirmation = openDelConfirmation;
  }

  handleDelete = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _setEventListeners() {
    this._likeButton.addEventListener("click", this.setIsLiked);

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._cardImgUrl, this._cardName);
    });

    this._deleteButton.addEventListener("click", () => {
      this._openDelConfirmation(this);
    });

  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  setIsLiked = () => {
    this._isLiked = !this._isLiked;
    this.renderLikes();
  };
  
  renderLikes = () => {
    if (this._id) {  
      this._cardLikeHandeler(this._id, this._isLiked);
    if (this.isLiked()) {
      this._likeButton.classList.add("card__heart-button_clicked");
    } else if (!this.isLiked()) {
      this._likeButton.classList.remove("card__heart-button_clicked");
    }
    } else {
      this._isLiked = false;
    }
  }

  generateCard = () => {
    this.renderLikes();
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
