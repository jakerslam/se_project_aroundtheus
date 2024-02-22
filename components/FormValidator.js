class FormValidator {
    constructor(config, formSelector) {
      this._config = config;
      this._config.formSelector = `#${formSelector.id}`;
      this._formElement = document.querySelector(this._config.formSelector);
    }
    _showInputError = (inputEl) => {
      const errorElement = this._formElement.querySelector(`.${inputEl.id}-error`);
      inputEl.classList.add(this._config.inputErrorClass);
      errorElement.classList.add(this._config.showErrorElClass);
      errorElement.textContent = inputEl.validationMessage;
    }
  
    _hideInputError = (inputEl) => {
      const errorElement = this._formElement.querySelector(`.${inputEl.id}-error`);
      inputEl.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.showErrorElClass);
      errorElement.textContent = "";
    }
    _hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }
    _disableButton = (button) => {
      button.classList.add(this._config.inactiveButtonClass);
      button.disabled = true;
    }
    _enableButton = (button) => {
      button.classList.remove(this._config.inactiveButtonClass);
      button.disabled = false;
    }
    _toggleButtonState(inputEls) {
      const buttonElement = this._formElement.querySelector(
          this._config.submitButtonSelector
      );
  
      if (this._hasInvalidInput(inputEls)) {
        this._disableButton(buttonElement);
        return;
      }
      this._enableButton(buttonElement);
    }
    _checkValidity = (inputEl) => {
      if (!inputEl.validity.valid) {
        this._showInputError(inputEl);
      } else {
        this._hideInputError(inputEl);
      }
    };
    _resetValidation(inputEls) {
        this._toggleButtonState(inputEls);
        inputEls.forEach((inputEl) => {
            this._hideInputError(inputEl); 
          });
    }
    _setEventListeners() {
      const { inputSelector } = this._config;
      const inputEls = [...this._formElement.querySelectorAll(inputSelector)];
      inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", () => {
          this._toggleButtonState(inputEls, this._formElement);
          this._checkValidity(inputEl);
        });
      });        
      this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._resetValidation(inputEls);
      });
    }
    enableValidation() {  
        this._setEventListeners();
  }
}
  export {FormValidator};
