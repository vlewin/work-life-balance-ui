import axios from "axios"

export default class Record {
  static get endpoint() {
    // return "https://ve0ytkrvvc.execute-api.eu-central-1.amazonaws.com/development/records"
    return "http://localhost:3000/records"

  }

  static all(params = {}) {
    return axios.get(this.endpoint, { params: params })
  }

  static get(id) {
    return axios.get(`${this.endpoint}/${id}`)
  }

  static save(record) {
    console.log('POST', record)
    return axios.post(this.endpoint, record)
  }

  static update(id, record) {
    return axios.put(`${this.endpoint}/${id}`, record)
  }

  static delete(id) {
    return axios.delete(`${this.endpoint}/${id}`)
  }
}
