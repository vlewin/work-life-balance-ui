// Service Information
// service: aws-work-life-balance-api
// stage: developement
// region: eu-central-1
// stack: aws-work-life-balance-api-developement
// api keys:
//   None
// endpoints:
//   GET - https://64lkq5hm1k.execute-api.eu-central-1.amazonaws.com/developement/records
//   GET - https://64lkq5hm1k.execute-api.eu-central-1.amazonaws.com/developement/records/{id}
//   POST - https://64lkq5hm1k.execute-api.eu-central-1.amazonaws.com/developement/records
//   PUT - https://64lkq5hm1k.execute-api.eu-central-1.amazonaws.com/developement/records
//   DELETE - https://64lkq5hm1k.execute-api.eu-central-1.amazonaws.com/developement/records
// functions:
//   index: aws-work-life-balance-api-developement-index
//   show: aws-work-life-balance-api-developement-show
//   create: aws-work-life-balance-api-developement-create
//   update: aws-work-life-balance-api-developement-update
//   destroy: aws-work-life-balance-api-developement-destroy

import axios from "axios"

export default class Record {
  static get endpoint() {
    return "https://6jq5tvia8d.execute-api.eu-central-1.amazonaws.com/development/records"
  }

  static all(params = {}) {
    params['user_id'] = 'github|611466'
    return axios.get(this.endpoint, { params: params })
  }

  static get(id) {
    return axios.get(`${this.endpoint}/${id}`)
  }

  static save(record) {
    record['user_id'] = 'github|611466'

    return axios.post(this.endpoint, record)
  }

  static update(id, record) {
    return axios.put(`${this.endpoint}/${id}`, record)
  }

  static delete(id) {
    return axios.delete(`${this.endpoint}/${id}`)
  }
}
