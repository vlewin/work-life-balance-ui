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

  constructor (date, start, end) {
    console.info('Init - date:', date, 'start:', start, 'end:', end)
    this.hoursPerDay = 8
    this.regularPauseTime = 30
    this.date = date || new Date()
    this.startTime = start || this.date.getTime()
    this.endTime = end || this.calculateEnd()
  }

  get start () {
    return this.constructor.toTime(this.startTime)
  }

  get end () {
    return this.constructor.toTime(this.endTime)
  }

  get pause () {
    return this.calculatePause()
  }

  get duration () {
    return this.constructor.convertTime(this.calculateDuration())
  }

  valid () {
    return !!(this.start && this.end)
  }

  calculatePause () {
    if (this.end) {
      if (this.duration <= 6) {
        return 0
      } else if (this.duration > 6 && this.duration <= 8) {
        return 30
      } else if (this.duration > 9) {
        return 45
      }
    }

    return 30
  }

  calculateDuration () {
    return this.endTime - this.startTime
  }

  calculateEnd () {
    return this.startTime + (this.hoursPerDay * 60 * 60 * 1000) + this.regularPauseTime * 60 * 1000
  }
}
