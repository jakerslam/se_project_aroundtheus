export default class Popup {
  constructor(popUpSelector) {
    this._popUpElement = document.querySelector(popUpSelector);
  }
  open() {
    this._popUpElement.classList.remove("modal_hidden");
    this._popUpElement.classList.add("modal_visible-js");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popUpElement.classList.add("modal_hidden");
    this._popUpElement.classList.remove("modal_visible-js");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("keydown", 
    this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton = this._popUpElement.querySelector(
      ".modal__container-close-button"
    );
    this._popUpBox = this._popUpElement.querySelector(".modal__container_js");
    document.addEventListener("keydown", 
    this._handleEscClose.bind(this));
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popUpElement.addEventListener("click", (evt) => {
      if (!this._popUpBox.contains(evt.target)) this.close();
    });
  }
}
