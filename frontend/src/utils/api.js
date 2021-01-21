import {apiConfig} from "./constants";

class Api {
  constructor(apiConfig) {
    this.url = apiConfig.baseUrl;
    this.headers = apiConfig.headers;
    this.authorizedUserId = apiConfig.authorizedUserId;
  }

  _resultHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(`${this.url}users/me`,
      {
        method: 'GET',
        headers: this.headers
      })
      .then(this._resultHandler)
  }

  setUserInfo(data) {
    return fetch(`${this.url}users/me`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
      })
    })
      .then(this._resultHandler)
  }

  getInitialCards() {
    return fetch(`${this.url}cards`,
      {
        method: 'GET',
        headers: this.headers
      })
      .then(this._resultHandler)
  }

  addNewCard(item) {
    return fetch(`${this.url}cards`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: item.name,
          link: item.link
        })
      })
      .then(this._resultHandler)
  }

  changeLikeCardStatus (cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this.url}cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers
          })
            .then(this._resultHandler)
            .catch(this._errorHandler)
        } else {
        return fetch(`${this.url}cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: this.headers
          })
          .then(this._resultHandler)
    }
  }

  deleteCard(cardId) {
    return fetch(`${this.url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this._resultHandler)
  }

  setUserAvatar(avatar) {
    return fetch(`${this.url}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar.avatar
      })
    })
        .then(this._resultHandler)
  }
}

const api = new Api(apiConfig);

export default api;