export class Api {
  constructor({ baseUrl, headers: { authorization } }) {
    this._baseUrl = baseUrl
    this._authorization = authorization

    this.putLike = this.putLike.bind(this)
    this.deleteLike = this.deleteLike.bind(this)
    this.removeCard = this.removeCard.bind(this)
  }

  _parseJson(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._parseJson)
  }

  postNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        ['Content-Type']: 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._parseJson)
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    }).then(this._parseJson)
  }

  putLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
      },
    }).then(this._parseJson)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '7a43c762-4e63-438c-856b-e056a5084ee3',
      },
    }).then(this._parseJson)
  }

  getUserdata() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._parseJson)
  }

  updateUserData({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._parseJson)
  }

  updateUserImg({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._parseJson)
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '7a43c762-4e63-438c-856b-e056a5084ee3',
    'Content-Type': 'application/json',
  },
})
