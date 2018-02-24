import axios from 'axios'

export default class Timestamp {
  static get endpoint() {
    return 'http://127.0.0.1:8000/api/timestamps'
  }

  static all(params = {}) {
    return axios.get(this.endpoint, params)
  }

  static get(id) {
    return axios.get(`${this.endpoint}/${id}`)
  }

  static update(id, timestamp) {
    return axios.put(`${this.endpoint}/${id}`, timestamp)
  }

  static save(timestamp) {
    return axios.post(this.endpoint, timestamp)
  }
}
