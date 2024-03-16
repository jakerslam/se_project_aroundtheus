import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._popupImage = this._popUpElement.querySelector(
      ".modal__container-image"
    );
    this._popupTitle = this._popUpElement.querySelector(
      ".modal__container-image-title"
    );
  }

  open(data) {
    this._popupImage.src = data.cardImgUrl;
    this._popupImage.alt = `A photo of ${data.cardName}`;
    this._popupTitle.textContent = data.cardName;
    super.open();
  }
}
