export default class Timestamp {
  static toTime (value, options = {}) {
    if (!value) return 'XX:XX'
    if (typeof (value) === 'number') {
      value = new Date(value)
    }

    if (options.seconds) {
      return `${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`
    }

    return `${value.getHours()}:${value.getMinutes()}`
  }

  static convertTime (value, unit = 'hh') {
    switch (unit) {
      case 'hh':
        return value / (60 * 60 * 1000)
      case 'mm':
        return value / (60 * 1000)
      case 'ss':
        return value / (1000)
      default:
        return value
    }
  }

  static numberToTime (value) {
    const hh = parseInt(value)
    const mm = Math.round(60 * (value % 1))
    console.log(hh, mm)
    return `${hh}:${mm}`
  }

  static toNumber (value) {
    return value.split(':').reduce((hh, mm) => {
      return this.numberToTime((parseInt(hh) + 8 + 0.5 + parseInt(mm) / 60))
    })
  }

  static timeToNumber (value) {
    if (value.includes(':') && !value.endsWith(':')) {
      return value.split(':').reduce((hh, mm) => {
        return parseInt(hh) + parseInt(mm) / 60
      })
    }

    return parseFloat(value)
  }

  static now () {
    const time = new Date()
    return `${time.getHours()}:${time.getMinutes()}`
  }

  static estimateEnd () {
    console.info('estimateEnd - ', start)
    const start = this.timeToNumber(this.now())
    const estimation = start + 8.5
    return estimation > 24 ? '24:00' : this.numberToTime(estimation)
  }

  static estimatePause () {
    console.info('estimatePause - ', start)
    const start = this.timeToNumber(this.now())
    const estimation = start + 8.5
    return estimation > 24 ? '00:00' : this.numberToTime(estimation)
  }

  static calculateEnd (timestamp) {
    console.info('calculateEnd - ', JSON.stringify(timestamp))
    const start = this.timeToNumber(timestamp.start)
    const pause = (timestamp.pause || 30) / 60

    return this.numberToTime(start + 8 + pause)
  }

  static calculateDuration (timestamp) {
    console.info('calculateDuration - ', JSON.stringify(timestamp))
    if (timestamp.end) {
      return this.timeToNumber(timestamp.end) - this.timeToNumber(timestamp.start) - timestamp.pause / 60
    }
  }

  static calculateTotal (timestamp) {
    console.info('calculateTotal - ', JSON.stringify(timestamp))
    return this.timeToNumber(timestamp.end) - this.timeToNumber(timestamp.start)
  }

  static calculatePause (duration) {
    console.log('calculatePause -', duration)
    if (duration <= 6) {
      return 0
    } else if (duration > 6 && duration <= 8) {
      return 30
    } else if (duration > 9) {
      return 45
    }

    return 30
  }

  constructor (payload) {
    const timestamp = payload || {}
    this.date = timestamp.date || new Date()
    this.start = timestamp.start || this.constructor.now()
    this.end = timestamp.end || this.constructor.estimateEnd()
    this.pause = timestamp.pause || this.constructor.estimatePause()
    this.duration = timestamp.duration
  }

  valid () {
    return !!(this.start && this.end)
  }

  toObject () {
    return {
      date: this.date,
      start: this.start,
      end: this.end,
      pause: this.pause,
      duration: this.duration
    }
  }
}
