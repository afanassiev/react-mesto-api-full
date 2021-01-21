import {apiAuthConfig} from "./constants";

class Auth {
  constructor(authConfig) {
    this.url = authConfig.baseUrl
    this.headers = authConfig.headers
  }

  _resultHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status)
  }

  register(email, password) {
    return fetch(`${this.url}/signup`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({password, email})
      })
      .then(this._resultHandler)
  }

  authorize(email, password) {
    return fetch(`${this.url}/signin`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({password, email})
      })
      .then(this._resultHandler)
  }

  getContent(token) {
    return fetch(`${this.url}/users/me`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(this._resultHandler)
  }
}

const auth = new Auth(apiAuthConfig);

export default auth;
