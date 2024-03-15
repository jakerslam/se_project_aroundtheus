import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popUpSelector, HandleSubmit) {
    super(popUpSelector);
    this._HandleSubmit = HandleSubmit;
    this._form = this._popUpElement.querySelector(".modal__form");
  }
 
  _getInputValues() {
    const inputVals = {};
    // const inputs = Array.from(this._form.getElementsByTagName("input"));
    // inputs.forEach((input)=>{inputVals.push(input.value);});
    return inputVals;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._HandleSubmit();
      this._getInputValues();
    });
  }
}
