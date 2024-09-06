import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handelConfirmation) {
    super(popUpSelector);
    this._popupSelector = popupSelector;
    this.handelConfirmation = handelConfirmation;
    this._form = this._popUpElement.querySelector(".modal__form");
  }

_handleSubmit(evt) {
    evt.preventDefault();
    this.handelConfirmation();
    //this.close();
}

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this._handleSubmit(evt);
    });
  }
}
