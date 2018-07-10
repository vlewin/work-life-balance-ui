import axios from "axios"

export default class Record {
  static get endpoint() {
    return `${process.env.VUE_APP_BASE_URI}/balance`
  }

  static get(id) {
    console.log('*** GET /balance', `${this.endpoint}/${id}`)
    return axios.get(`${this.endpoint}/${id}`)
  }
}
