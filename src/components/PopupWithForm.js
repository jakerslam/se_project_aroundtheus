import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popUpSelector, handleSubmit) {
    super(popUpSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popUpElement.querySelector(".modal__form");
  }
 
  _getInputValues() {
    const inputEls = Array.from(this._form.querySelectorAll(".modal__container-input"));
    const inputVals = {};
    inputEls.forEach((input,index)=>{
      inputVals[input.id] = input.value;
    });
    return inputVals;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}
