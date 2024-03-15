import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._PopupImage = this._popUpElement.querySelector(
      ".modal__container-image"
    );
    this._PopupTitle = this._popUpElement.querySelector(
      ".modal__container-image-title"
    );
  }

  open(data) {
    this._PopupImage.src = data.cardImgUrl;
    this._PopupImage.alt = `A photo of ${data.cardName}`;
    this._PopupTitle.textContent = data.cardName;
    super.open();
  }
}
