<template>
  <ul class="opacity-90">
    <li class="arrow" v-on:click="prevWeek">
      <i class="fa fa-chevron-left" aria-hidden="true"></i>
    </li>
    <li class="uppercase" v-for="(item, index) in dates" :key="index" :data-hours="label(item)" :class="addClasses(item)" v-on:click="selectDay(item.date)">
      {{ item.weekday }}
    </li>
    <li class="arrow" v-on:click="nextWeek">
      <i class="fa fa-chevron-right" aria-hidden="true"></i>
    </li>
  </ul>
</template>

<script>
// FIXME: replace with date-fns
// import addHours from "date-fns/add_hours"
// import getDay from 'date-fns/get_day'
// FIXME: Check bundle size
import holiday from "german-holiday"
import { isWeekend, addHours } from "date-fns"
import { weekNumber, weekStartDay, weekDaysRange, isHappy, isHoliday } from "../../helpers/date"
import { mapGetters, mapState } from "vuex"

export default {
  name: "DatePicker",
  data() {
    return {
      current: weekNumber(),
      // FIXME
      year: new Date().getFullYear(),
      week: [],
      weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    }
  },

  created: async function() {
    // NOTE: Return only working days, include Sa?
    this.week = weekDaysRange(this.selected).filter(d => {
      return !isWeekend(d)
    })
    if (isWeekend(this.currentDate)) {
      this.$store.dispatch("setCurrentDate", addHours(this.week[0], 1))
    }

    await this.$store.dispatch("fetchRecords")
  },

  computed: {
    ...mapGetters(["currentWeekNumber", "currentFomatedDate", "currentRecord"]),
    ...mapState(["currentDate", "records"]),
    dates() {
      return this.week.map(date => {
        let formattedDate = date.toLocaleDateString()
        let record = this.records[formattedDate] || {}
        return {
          date: date,
          formattedDate: formattedDate,
          weekday: this.weekdays[date.getDay()],
          selected: this.isSelected(date),
          weekend: this.isWeekend(date),
          holiday: this.isHoliday(date),
          duration: record.duration,
          absence: record.absence,
          positive: isHappy(record.duration),
          recorded: !!record.date
        }
      })
      // return Object.keys(this.records).map(key => {
      //   let record = this.records[key];
      //   return this.records[key];
      // });
    },



    selected() {
      return this.$store.state.currentDate
    }
  },

  methods: {
    addClasses(date) {
      return {
        selected: date.selected,
        weekend: date.weekend,
        holiday: date.holiday,
        recorded: date.recorded,
        positive: date.positive
      }
    },

    label(item) {
      const mapping = {
        "vacation": "V",
        "holiday": "H",
        "sickness": "S"
      }

      if(this.isRecorded(item.date)) {
        if(item.absence) {
          return item.absence[0]
        } else {
          return item.duration
        }
      }
    },

    isSelected(date) {
      return this.currentDate.toLocaleDateString() === date.toLocaleDateString()
    },

    isWeekend(date) {
      return isWeekend(date)
      // return date.getDay() == 6 || date.getDay() == 0
    },

    isHoliday(date) {
      return isHoliday(date)
    },

    isRecorded(date) {
      return !!this.records[date.toLocaleDateString()]
    },

    isPositive(date) {
      const record = this.records[date.toLocaleDateString()]
      return record ? record.duration >= 8 && record.duration <= 9 : null
    },

    selectDay(date) {
      this.$store.dispatch("setCurrentDate", date)
    },

    hours(date) {
      const record = this.records[date.toLocaleDateString()]
      return record ? record.duration : null
    },

    // FIXME: Use date-fns
    prevWeek() {
      if (this.current > 0) {
        this.current = this.current - 1
      } else {
        this.current = 52
        this.year -= 1
      }

      this.week = weekDaysRange(weekStartDay(this.current, this.year)).filter(d => {
        return !isWeekend(d)
      })
      this.$store.dispatch("setCurrentDate", addHours(this.week[0], 1))
      this.$store.dispatch("fetchRecords", this.current)
      this.$emit("prevWeek")
    },

    // FIXME: Use date-fns
    nextWeek() {
      if (this.current === 52) {
        this.current = 0
        this.year += 1
      } else {
        this.current = this.current + 1
      }

      this.week = weekDaysRange(weekStartDay(this.current, this.year)).filter(d => {
        return !isWeekend(d)
      })

      this.$store.dispatch("setCurrentDate", addHours(this.week[0], 1))
      this.$store.dispatch("fetchRecords", this.current)
      this.$emit("nextWeek")
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '~@/assets/_variables.sass'

  ul
    padding: 0
    margin: 0
    display: flex
    justify-content: space-between
    align-items: center
    // width: 100%

  li
    cursor: pointer
    list-style: none
    font-weight: bold

  .selected
    background: $light-grey
    color: $green

  .weekend
    color: #607d8d
    pointer-events: none
    border: none

  .holiday
    background: tomato
    color: #fff
    pointer-events: none
    border: none
</style>
