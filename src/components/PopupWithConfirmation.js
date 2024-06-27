import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handelConfiirmation) {
    super(popUpSelector);
    this._popupSelector = popupSelector;
    this._handelConfiirmation = handelConfiirmation;
    this._form = this._popUpElement.querySelector(".modal__form");
  }

_handleSubmit(evt) {
    evt.preventDefault();
    this._handelConfiirmation();
    console.log("submit evetn for ",this);
    this.close();
}

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this._handleSubmit(evt);
    });
  }
}
