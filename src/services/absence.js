import axios from "axios"

export default class Absence {
  static get endpoint() {
    // return "https://ve0ytkrvvc.execute-api.eu-central-1.amazonaws.com/development/absences"
    return "http://localhost:3000/absences"

  }

  static all(params = {}) {
    console.log('fetch absences', params)
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
