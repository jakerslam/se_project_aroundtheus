export default class Api {
  constructor(options) {
    // constructor body
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _proccessResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`); 
  }

  _request(url, options) {
    return fetch(url, options)
    .then(this._proccessResponse)
    .catch((err) => {
      console.error(err);
    })
  }

  getInitialProfile() {
    this._request(`${this._baseUrl}/users/me`,{
      method: "GET",
      headers: this._headers,
    });
  }

  getInitialCards() {
    this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  postProfileItem(item) {
    this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      })
    });
  }

  postCard(cardData) {
    this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      })
    });
  }

  editProfilePic(link) {
    this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar:link,
      })    
    });
  }
  
  deleteCard(cardId) {
    this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    });
      }


  toggleCardLike = (cardId,isLiked) => {
    if (isLiked) {
      this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      });
  } else if (!isLiked) {
    this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    }
  };
}
