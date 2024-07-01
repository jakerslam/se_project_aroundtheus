export default class Api {
  constructor(options) {
    // constructor body
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._headers.authorization,
      },
    })
    .then((res)=> {
      if (res.ok) {
        console.log("res in getInitialProfile:",res);
        //console.log("res.json() in getInitialProfile:",res.json());
        return res.json();
      }
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
      if (res.ok) {
        console.log("res in getInitialCards:",res);
        //console.log("JSON.parse(res) in getInitialCards:",JSON.parse(res.json()));
        //console.log("res.json() in getInitialCards:",res.json());
        return res.json();
      }
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
    });

  }

  deleteCard(cardId) {
    console.log("${this._baseUrl}/cards/${cardId}:",`${this._baseUrl}/cards/${cardId}`);
       return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: "DELETE",
          headers: {
            authorization: this._headers.authorization,
            "Content-Type": "application/json",
          }
        });
      }


  toggleCardLike = (cardId,likeButtonEl,isLiked) => {
    if (!isLiked) {
      fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._headers.authorization,
        "Content-type": "application/json",
      },
    });
    likeButtonEl.classList.add("card__heart-button_clicked");
    return true
  } else if (isLiked) {
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,
        "Content-type": "application/json",
      },
    });
    likeButtonEl.classList.remove("card__heart-button_clicked");
    return false;
    }
  };
}
