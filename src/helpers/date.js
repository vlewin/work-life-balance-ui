import addHours from "date-fns/add_hours"
import format from "date-fns/format"

export function getUTCDate(date = new Date()) {
  return new Date(date.toUTCString())
  // const date = new Date(dateString);
  //
  // return new Date(
  //   date.getUTCFullYear(),
  //   date.getUTCMonth(),
  //   date.getUTCDate(),
  //   date.getUTCHours(),
  //   date.getUTCMinutes(),
  //   date.getUTCSeconds(),
  // );
}

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

import startOfMonth from 'date-fns/start_of_month'
import endOfMonth from 'date-fns/end_of_month'
import setMonth from 'date-fns/set_month'

export function monthRange(month) {
  const date = setMonth(new Date(), month - 1)
  return eachDay(startOfMonth(date), endOfMonth(date))
}

export function isHappy(duration) {
  return duration >= 8 && duration <= 9
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

import startOfWeek from "date-fns/start_of_week"
import _isWeekend from "date-fns/is_weekend"

export function isWeekend(date = new Date()) {
  return _isWeekend(date)
}

export function getNextBusinessDay(date = new Date()) {
  if (isWeekend(date)) {
    console.warn("Return start of the week", startOfWeek(date, { weekStartsOn: 1 }))
    return startOfWeek(date, { weekStartsOn: 1 })
  }
  return date
}

export function roundTo(d = new Date(), minutes = 5) {
  let ms = 1000 * 60 * minutes // convert minutes to ms
  let roundedDate = new Date(Math.round(d.getTime() / ms) * ms)
  return roundedDate
}

export function parseDate(date) {
  const dmy = date.split(".")
  return new Date(dmy[2], dmy[1] - 1, dmy[0])
}

export function dateTimeToDate(datetime, dateFormat = "DD.MM.YYYY") {
  return format(datetime, dateFormat)
}

export function dateTimeToTime(datetime, dateFormat = "HH:mm") {
  return format(roundTo(datetime, 5), dateFormat)
}

export function dateToDateTime(date) {
  return new Date(date)
}

import germanHolidays from "german-holiday"
export function isHoliday(date) {
  // FIXME: Verify date format
  return germanHolidays.holidayCheck(new Date(date.toDateString()), "BY")
}
// timeToNumber: function(value) {
//   console.log("timeToNumber", value);
//   const splitted = value.split(":");
//   return parseInt(splitted[0]) * 60 + parseInt(splitted[1]);
// }
