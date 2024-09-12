import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popUpSelector,handelConfirmation);
    this._popupSelector = popupSelector;
    //this.handelConfirmation = handelConfirmation;
    this._form = this._popUpElement.querySelector(".modal__form");
  }


  setSubmitAction (action) {
    // Store the function passed as action
    console.log(action);
    //this.handleConfirmation = action;
  }

_handleSubmit(evt) {
  console.log("_handleSubmit in PopupWithConfirmation");
    evt.preventDefault();
        if (this.handleConfirmation) {
      this.handleConfirmation();
    }
    //this.close();
}

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this._handleSubmit(evt);
    });
  }
}
