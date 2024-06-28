export default class Api {
  constructor(options) {
    // constructor body
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialContent() {
    return fetch(this._baseUrl, {
      method: "GET",
      headers: {
        authorization: this._headers.authorization,
      },
    });
  }

  postProfileItem(item) {
    return fetch(this._baseUrl, {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      })
    });
  }

  postCard(cardData) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      })
    });
  }

  editProfilePic(link) {
    return fetch(`${this._baseUrl}/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar:link,
      })    
    });

  }

  deleteCard(cardId) {
       return fetch(`${this._baseUrl}/${cardId}`, {
          method: "DELETE",
          headers: {
            authorization: this._headers.authorization,
            "Content-Type": "application/json",
          }
        });
      }
  // other methods for working with the API
}
