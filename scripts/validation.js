const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__container-input",
  submitButtonSelector: ".modal__container-button",
  inactiveButtonClass: "modal__container-button_disabled",
  inputErrorClass: "modal__container-input_error",
  showErrorElClass: "modal__container_error-message_visible",
};

showInputError = (formElement, inputEl) => {
  const errorElement = formElement.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.showErrorElClass);
  errorElement.textContent = inputEl.validationMessage;
};

hideInputError = (formElement, inputEl) => {
  const errorElement = formElement.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.showErrorElClass);
  errorElement.textContent = "";
};

checkValidity = (formElement, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formElement, inputEl);
  } else {
    hideInputError(formElement, inputEl);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputEls, formElement) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  if (hasInvalidInput(inputEls)) {
    disableButton(buttonElement);
    return;
  }
  enableButton(buttonElement);
}

const enableButton = (button) => {
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = false;
};

const disableButton = (button) => {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
};

function setEventListeners(formElement, config) {
  const { inputSelector } = config;
  const inputEls = [...formElement.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      toggleButtonState(inputEls, formElement);
      checkValidity(formElement, inputEl);
    });
  });
}

function enableValidation(config) {
  const formElements = Array.from(
    document.querySelectorAll(config.formSelector)
  );
  formElements.forEach((formElement, indexID) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
}

enableValidation(config);
