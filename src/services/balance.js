import axios from "axios"

export default class Record {
  static get endpoint() {
    return `${process.env.VUE_APP_BASE_URI}/balance`
  }

  static get() {
    console.log('*** GET /balance')
    return axios.get(`${this.endpoint}`)
  }
}
