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
import { addHours } from "date-fns"
import { weekNumber, weekStartDay, weekDaysRange, isHappy, isWeekend, isHoliday } from "@/helpers/date"
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
      return !this.isWeekend(d)
    })

    if (this.isWeekend(this.currentDate)) {
      this.$store.dispatch("setCurrentDate", addHours(this.week[0], 1))
    }

    await this.$store.dispatch("fetchRecords")
  },

  computed: {
    ...mapGetters(["currentWeekNumber", "currentFomatedDate", "currentRecord"]),
    ...mapState(["currentDate", "page", "records"]),

    dates() {
      return this.week.map(date => {
        let formattedDate = date.toDateString()
        let record = this.records[formattedDate] || {}

        return {
          date: date,
          formattedDate: record.date,
          weekday: this.weekdays[date.getDay()],
          selected: this.isSelected(formattedDate),
          weekend: isWeekend(date),
          holiday: isHoliday(date),
          duration: record.duration,
          absence: record.absence,
          positive: isHappy(record.duration),
          recorded: !!record.date
        }
      })
    },



    selected() {
      return this.$store.state.currentDate
    }
  },

  watch: {
    // FIXME: React on slide page event???
    page(val) {
      if (val === 'page-2') {
        setTimeout(() => {
          this.$store.dispatch("fetchRecords")
        }, 500)
      }
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
      if(this.isRecorded(item.formattedDate)) {
        if(item.absence) {
          return item.absence[0]
        } else {
          return item.duration
        }
      }
    },

    isSelected(date) {
      return this.currentFomatedDate === date
    },

    isWeekend(date) {
      return isWeekend(date)
    },

    isHoliday(date) {
      return isHoliday(date)
    },

    isRecorded(date) {
      return !!this.records[date]
    },

    isPositive(date) {
      const record = this.records[date]
      return record ? record.duration >= 8 && record.duration <= 9 : null
    },

    selectDay(date) {
      this.$store.dispatch("setCurrentDate", date)
    },

    hours(date) {
      const record = this.records[date]
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
    width: 100%
    background: #eee
    height: 10vh


  li
    cursor: pointer
    list-style: none
    font-weight: bold
    position: relative
    height: 2.5em
    width: 2.5em
    line-height: 2.5em
    text-align: center

  .selected
    background: $green
    color: white

  .weekend
    color: #607d8d
    pointer-events: none
    border: none

  .holiday
    background: tomato
    color: #fff
    pointer-events: none
    border: none

  .recorded
    &::after
      content: attr(data-hours)
      font-size: 0.4rem
      display: block
      position: absolute
      width: 1rem
      height: 1rem
      line-height: 1rem
      border-radius: 100%
      top: 1.5rem
      right: -0.5rem
      border: 0.2rem solid #eee
      // background: tomato
      // color: white
      background: #fff
      color: tomato
      font-weight: bold
      z-index: 1
      text-align: center

    &.positive::after
      // background: #42b983
      color: #42b983

  @media screen and (max-width: 50em) and (orientation: landscape)
    ul
      height: 15vh

</style>
