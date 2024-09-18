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
      headers: this._headers,
    })
    .then((res)=> {
      return this._proccessResponse(res);
    })  
    .catch((err) => {
      console.error(err);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then((res)=> { 
      return this._proccessResponse(res);
    })  
    .catch((err) => {
      console.error(err);
    });
  }

  postProfileItem(item) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      })
    })
    .then((res)=> {
      return this._proccessResponse(res);
    })  
    .catch((err) => {
      console.error(err);
    });
  }

  postCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      })
    })
    .then((res)=> {
      return this._proccessResponse(res);
    })  
    .catch((err) => {
      console.error(err);
    });
  }

  editProfilePic(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar:link,
      })    
    })
    .then((res)=> {
      return this._proccessResponse(res);
    })  
    .catch((err) => {
      console.error(err);
    });

  }

  // getId() {
  // }
  
  deleteCard(cardId) {
    console.log("cardId: ",cardId);
       return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: "DELETE",
          headers: this._headers
        })
        .then((res)=> {
          return this._proccessResponse(res);
        })  
        .catch((err) => {
          console.error(err);
        });
      }


  toggleCardLike = (cardId,isLiked) => {
    if (isLiked) {
      fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then((res)=> {
      return this._proccessResponse(res);
    })  
    .catch((err) => {
      console.error(err);
    });
  } else if (!isLiked) {
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res)=> {
      return this._proccessResponse(res);
    })  
    .catch((err) => {
      console.error(err);
    });
    }
  };
}
