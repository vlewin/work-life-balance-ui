import axios from "axios"

export default class Record {
  static get endpoint() {
    return `${process.env.VUE_APP_BASE_URI}/records`
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

  static delete(record) {
    console.log('*** Delete', record)
    return axios.delete(`${this.endpoint}/${record.timestamp}`)
  }
}
