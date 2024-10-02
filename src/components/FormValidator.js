export default class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._config.formSelector = `#${formSelector.id}`;
    this._formEl = document.querySelector(config.formSelector);
    this._buttonEl = this._formEl.querySelector(
      this._config.submitButtonSelector
    );
    this._inputSelector = config.inputSelector;
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
  }

  _showInputError = (inputEl) => {
    const errorElement = this._formEl.querySelector(
      `.${inputEl.id}-error`
    );
    inputEl.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.showErrorElClass);
    errorElement.textContent = inputEl.validationMessage;
  };

  _hideInputError = (inputEl) => {
    const errorElement = this._formEl.querySelector(
      `.${inputEl.id}-error`
    );
    inputEl.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.showErrorElClass);
    errorElement.textContent = "";
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _disableButton = () => {
    this._buttonEl.classList.add(this._config.inactiveButtonClass);
    this._buttonEl.disabled = true;
  };

  _enableButton = () => {
    this._buttonEl.classList.remove(this._config.inactiveButtonClass);
    this._buttonEl.disabled = false;
  };
  
  _toggleButtonState(inputEls) {
    if (this._hasInvalidInput(inputEls)) {
      this._disableButton();
      return;
    }
    this._enableButton();
  }

  _checkValidity = (inputEl) => {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  };

  resetValidation() {
    console.log("resetting validation");
    this._toggleButtonState(this._inputEls);
    this._inputEls.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }

  _setEventListeners() {
    //const { inputSelector } = this._config;
    //const inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._toggleButtonState(this._inputEls, this._formEl);
        this._checkValidity(inputEl);
      });
    });
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.resetValidation();
      if (this._inputEls.length > 1) {
        this._disableButton();
      }
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}