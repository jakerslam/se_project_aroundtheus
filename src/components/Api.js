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

  getInitialProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._headers.authorization,
      },
    })
    .then((res)=> {
      return this._proccessResponse(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: this._headers.authorization,
      },
    })
    .then((res)=> { 
      return this._proccessResponse(res);
    });
  }

  postProfileItem(item) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      })
    })
    .then((res)=> {
      return this._proccessResponse(res);
    });
  }

  postCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      })
    })
    .then((res)=> {
      return this._proccessResponse(res);
    });
  }

  editProfilePic(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar:link,
      })    
    })
    .then((res)=> {
      return this._proccessResponse(res);
    });

  }

  getId() {

  }
  
  deleteCard(cardId) {
    console.log("${this._baseUrl}/cards/${cardId}:",`${this._baseUrl}/cards/${cardId}`);
       return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: "DELETE",
          headers: {
            authorization: this._headers.authorization,
            "Content-Type": "application/json",
          }
        })
        .then((res)=> {
          return this._proccessResponse(res);
        });
      }


  toggleCardLike = (cardId,isLiked) => {
    if (isLiked) {
      fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._headers.authorization,
        "Content-type": "application/json",
      },
    })
    .then((res)=> {
      return this._proccessResponse(res);
    });
  } else if (!isLiked) {
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,
        "Content-type": "application/json",
      },
    })
    .then((res)=> {
      return this._proccessResponse(res);
    });
    }
  };
}
