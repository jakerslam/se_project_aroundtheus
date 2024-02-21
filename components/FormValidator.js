class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._config.formSelector = `#${formElement.id}`;
  }
  _showInputError = (formElement, inputEl) => {
    const errorElement = formElement.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.showErrorElClass);
    errorElement.textContent = inputEl.validationMessage;
  }

  _hideInputError = (formElement, inputEl) => {
    const errorElement = formElement.querySelector(`.${inputEl.id}-error`);
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
  _toggleButtonState(inputEls, formElement) {
    const buttonElement = formElement.querySelector(
        this._config.submitButtonSelector
    );

    if (this._hasInvalidInput(inputEls)) {
      this._disableButton(buttonElement);
      return;
    }
    this._enableButton(buttonElement);
  }
  _checkValidity = (formElement, inputEl) => {
    if (!inputEl.validity.valid) {
      this._showInputError(formElement, inputEl);
    } else {
      this._hideInputError(formElement, inputEl);
    }
  };
  _setEventListeners(formElement) {
    const { inputSelector } = this._config;
    const inputEls = [...formElement.querySelectorAll(inputSelector)];
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._toggleButtonState(inputEls, formElement);
        this._checkValidity(formElement, inputEl);
      });
    });
  }
  enableValidation() {
    const formElements = Array.from(
      document.querySelectorAll(this._config.formSelector)
    );
    formElements.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });

      this._setEventListeners(formElement, this._config);
    });
  }
}

export {FormValidator};