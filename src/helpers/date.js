import addHours from "date-fns/add_hours"
import format from "date-fns/format"

// Get ISO8601 week number by date
export function weekNumber(date = new Date()) {
  const cur = new Date(date).getTime()
  const prev = new Date(date.getFullYear(), 0, 1)
  return Math.ceil((cur - prev + 1) / (86400000 * 7))
}

// Get start of the by ISO8601 week number
export function weekStartDay(w, y = new Date().getFullYear()) {
  var date = new Date(y, 0, 1 + (w - 1) * 7)
  var start = date
  if (date.getDay() <= 4) {
    start.setDate(date.getDate() - date.getDay() + 1)
  } else {
    start.setDate(date.getDate() + 8 - date.getDay())
  }
  return start
}

import startOfISOWeek from "date-fns/start_of_iso_week"
import endOfISOWeek from "date-fns/end_of_iso_week"
import eachDay from "date-fns/each_day"

// Get range of weekdays by date
export function weekDaysRange(date = new Date()) {
  return eachDay(startOfISOWeek(date), endOfISOWeek(date)).map(d => addHours(d, 1))
}

export function timeToNumber(time) {
  if (time) {
    const split = time.split(":")
    return parseFloat(parseInt(split[0], 10) + "." + parseInt(split[1] / 6 * 10, 10))
  }
}

export function timeToDateTime(date, time) {
  if (date && time) {
    return new Date(`${format(date, "YYYY/MM/DD")} ${time}`)
  }

  return new Date()
}

export function dateTimeToDate(datetime, dateFormat = "DD.MM.YYYY") {
  return format(datetime, dateFormat)
}

export function dateToDateTime(date) {
  return new Date(date)
}

// timeToNumber: function(value) {
//   console.log("timeToNumber", value);
//   const splitted = value.split(":");
//   return parseInt(splitted[0]) * 60 + parseInt(splitted[1]);
// }
