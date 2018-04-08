<template>
  <div class="calendar">
    <ul class="grid">
      <li class="grid-item label" v-for="weekday in weekdays" :class="{ weekend: ['SA', 'SU'].includes(weekday) }">
        {{ weekday }}
      </li>

      <li class="grid-item round day" v-for="(day, i) in days" v-on:click="select(day)" :class="addClasses(day)">
        {{ day | toNumber }}
        <!-- <span class="tooltiptext" v-if="isRecorded(day)">{{ record(day).absence }}</span> -->
        <span class="tooltiptext" v-if="isHoliday(day)">{{ isHoliday(day) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  Array.range = (start, end) => [...Array(end - start + 1)].map((_, i) => (start + i).toString().padStart(2, "0"))

  import Calendator from "calendator"
  import Holiday from "german-holiday"
  import { isWeekend } from "date-fns"

  const calendator = new Calendator(Calendator.MON)

  export default {
    name: "Calendar",
    data() {
      return {
        month: this.date.getMonth(),
        year: this.date.getFullYear(),
        weekdays: ["MO", "TU", "WE", "TH", "FR", "SA", "SU"],
        selected: []
      }
    },

    props: {
      date: {
        type: Date
      },

      value: {
        type: String
      },

      target: {
        required: false
      },

      records: {
        type: Object
      }
    },

    created() {},

    filters: {
      toNumber: function(value) {
        return value ? value.getDate() : null
      }
    },

    computed: {
      weeks() {
        return calendator.giveMeCalendarForMonthYear(this.date.getMonth(), this.date.getFullYear())
      },

      currentMonth() {
        return this.date.toLocaleString("en-US", { month: "long" })
      },

      days() {
        return this.weeks.reduce((a, b) => a.concat(b)).map(d => {
          return d ? new Date(this.date.getFullYear(), this.date.getMonth(), d) : null
        })
      },

      vacationRestDays() {
        // TODO: Number of vacation days from settings
        return 30 - this.selected.length
      },

      seeknessDays() {
        return this.selected.length
      }
    },

    watch: {},

    methods: {
      addClasses(date) {
        return {
          selected: this.isSelected(date),
          weekend: isWeekend(date),
          holiday: this.isHoliday(date),
          empty: this.isEmpty(date),
          vacation: this.isVacation(date),
          sickness: this.isSickeness(date)
        }
      },

      isSelected(date) {
        return this.selected.includes(date)
      },

      isWeekend(day) {
        return [5, 6].includes(day % 7)
      },

      isHoliday(date) {
        return date && (Holiday.holidayCheck(date, "BY") || this.record(date).absence === "holiday")
      },

      isEmpty(date) {
        return !date
      },

      isRecorded(date) {
        return date && this.records[date.toLocaleDateString("de-DE")]
      },

      isVacation(date) {
        return this.record(date).absence === "vacation"
      },

      isSickeness(date) {
        return this.record(date).absence === "sickness"
      },

      record(date) {
        if (this.isRecorded(date)) {
          return this.records[date.toLocaleDateString("de-DE")]
        }

        return {}
      },

      prevMonth() {
        if (this.month === 1) {
          this.month = 11
          this.year -= 1
        } else {
          this.month -= 1
        }

        console.log("prevMonth", this.month, this.year)

        this.weeks = calendator.giveMeCalendarForMonthYear(this.month, this.year)
      },

      nextMonth() {
        if (this.month === 11) {
          this.month = 0
          this.year += 1
        } else {
          this.month += 1
        }

        console.log("nextMonth", this.month, this.year)

        this.weeks = calendator.giveMeCalendarForMonthYear(this.month + 1, 2017)
      },

      select(date) {
        if (this.selected.includes(date)) {
          this.selected.splice(this.selected.indexOf(date), 1)
        } else {
          this.selected.push(date)
        }

        this.$emit("changed", this.selected)
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '~@/assets/_variables.sass'

  .calendar
    display: flex
    justify-content: space-around
    align-items: center
    flex-direction: column

  .month
    color: #444
    display: flex
    justify-content: space-around
    align-items: center
    padding: 2% 0
    min-width: 70%
    margin: 0
    text-transform: uppercase

  .grid
    display: grid
    grid-template-columns: repeat(7, 1fr)
    grid-template-rows: repeat(7, 1fr)
    grid-row-gap: 0.2rem
    grid-column-gap: 0.2rem
    width: 100%
    height: 100%
    margin: 0
    padding: 0.5em 1em
    justify-items: center
    align-items: center

  .grid-item
    display: inline-block
    color: #444
    list-style: none
    height: 1.2rem
    width: 1.2rem
    line-height: 1.2rem
    text-align: center
    font-size: 1.0em
    // border: 0.1rem solid #fff

    &:not(.label):not(.weekend)
      &:not(.holiday)
        cursor: pointer
      &:not(.selected):not(.holiday):hover
        background: rgba(0, 0, 0, 0.1)
    &.selected:not(.holiday)
      border: 0.1rem solid $blue
      color: $blue

  .label
    color: $dark-grey
    font-size: 80%
    font-weight: bold
    pointer-events: none

  .weekend:not(.holiday), .empty
    pointer-events: none

  .label.weekend
    color: tomato

  .day.weekend
    color: $mid-grey

  .holiday
    background: tomato
    border: 0.1rem solid tomato
    color: #fff !important

  .disabled
    color: $mid-grey
    pointer-events: none

  .comment
    display: flex
    justify-content: center
    align-items: center

  .comment-item
    background: #fff
    padding: 5px
    margin: 5px

  @media only screen and (min-width: 600px)
    .grid

  .vacation, .sickness, .holiday
    // pointer-events: none

  .vacation
    border: 0.1rem solid $green
    color: $green

  .sickness
    border: 0.1rem solid $amber
    color: $amber

  .holiday
    border: 0.1rem solid $red
    color: $red

  /* Tooltip container
  .holiday
    position: relative
    display: inline-block

    // border-bottom: 1px dotted black
    /* If you want dots under the hoverable text
    .tooltiptext
      visibility: hidden
      width: 5rem
      background-color: rgba(0, 0, 0, 0.5)
      color: #fff
      text-align: center
      position: absolute
      z-index: 1
      font-size: 0.2rem
      margin: -2.4rem -2.7rem
      padding: 0 0.2rem
      text-overflow: ellipsis
      white-space: nowrap
      border-radius: 1rem
      overflow: hidden

    &:hover .tooltiptext
      visibility: visible
</style>

<!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff6%2F27%2F91%2Ff62791a614fd3088b01ddd96756c6771.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F360217670180554802%2F&docid=YJuz1oGNIl5xnM&tbnid=xcixYzPxTJIKyM%3A&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800&h=600&bih=960&biw=1920&q=css3%20time%20picker&ved=0ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0&iact=mrc&uact=8#h=600&imgdii=Fir91c5_-DbctM:&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800 -->
<!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff6%2F27%2F91%2Ff62791a614fd3088b01ddd96756c6771.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F360217670180554802%2F&docid=YJuz1oGNIl5xnM&tbnid=xcixYzPxTJIKyM%3A&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800&h=600&bih=960&biw=1920&q=css3%20time%20picker&ved=0ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0&iact=mrc&uact=8 -->
<!-- http://www.cssscript.com/wp-content/uploads/2016/03/Beautiful-Material-Design-Date-Time-Picker.png -->
<!-- https://codepen.io/jaromvogel/pen/VeYqvB?page=2 -->
<!-- https://codepen.io/jaromvogel/pen/aNPRwG?page=3 -->
