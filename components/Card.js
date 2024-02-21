//import {} from

class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._handleImageClick = handleImageClick;
    this._cardImgUrl = data.link;
    this._cardName = data.name;
    this._cardElement = cardSelector.cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__heart-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__img");
    this._cardTitle = this._cardElement.querySelector(".card__title");
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLike);
    this._deleteButton.addEventListener("click", this._handleDelete);
    this._cardImage.addEventListener("click", ()=> {

    this._handleImageClick(this._cardImgUrl, this._cardName);
    });
  }
  _handleLike = () => {
    this._likeButton.classList.toggle("card__heart-button_clicked");
  }
  _handleDelete = () => {
    this._cardElement.remove();
  }
 
  populateCard = () => {
    this._cardImage.src = this._cardImgUrl;
    this._cardImage.alt = "An image of " + this._cardName;
    this._cardTitle.textContent = this._cardName;
    this._setEventListeners();
    return this._cardElement;
  }
}

export { Card };
