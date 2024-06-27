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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      }).then(res => {
        if (res.ok) {
        return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
       });
  }

  postProfileItem(item) {
    //console.log("item in postProfileItem:",item);
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
    }).then(res => {
      if (res.ok) {
      return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
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
    }).then(res => {
      if (res.ok) {
      return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
     });
  }

  editProfilePic(link,userInfo) {
console.log("link in editProfilePic:",link); // console logs the correct link I'm trying to upload
    return fetch(`${this._baseUrl}/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar:link,
        // name: userInfo.userJob,
        // about: userInfo.userName,
      })    
    }).then(res => {
      if (res.ok) {
      return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
     });

  }

  deleteCard(cardId) {
    //console.log("link in editProfilePic:",link);
       return fetch(`${this._baseUrl}/${cardId}`, {
          method: "DELETE",
          headers: {
            authorization: this._headers.authorization,
            "Content-Type": "application/json",
          }
        }).then(res => {
          if (res.ok) {
          return res.json();
          }
          // if the server returns an error, reject the promise
          return Promise.reject(`Error: ${res.status}`);
         });
      }
  // other methods for working with the API
}
