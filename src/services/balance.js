import axios from "axios"

export default class Record {
  static get endpoint() {
    // return "https://ve0ytkrvvc.execute-api.eu-central-1.amazonaws.com/development/balance"
    return "http://localhost:3000/balance"

  }

  static get(id) {
    console.log('*** GET /balance', `${this.endpoint}/${id}`)
    return axios.get(`${this.endpoint}/${id}`)
  }
}
