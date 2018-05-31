<template>
  <div class="calendar" :class="[mode]">
    <ul class="grid">
      <li class="grid-item label" v-for="(weekday, i) in weekdays" :key="i+1*0.1" :class="{ weekend: ['SA', 'SU'].includes(weekday) }">
        {{ weekday }}
      </li>

      <li class="grid-item day" v-for="(day, i) in days" :key="i+1*1" v-on:click="select(day)" :class="addClasses(day)">
        {{ day | toNumber }}
        <span class="tooltiptext" v-if="isHoliday(day)">{{ isHoliday(day) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import Calendator from "calendator"
  import { mapState } from "vuex"
  import { isWeekend, isHoliday } from "@/helpers/date"

  const calendator = new Calendator(Calendator.MON)

  export default {
    name: "Calendar",
    data() {
      return {
        month: this.date.getMonth(),
        year: this.date.getFullYear(),
        deleteMode: false,
        weekdays: ["MO", "TU", "WE", "TH", "FR", "SA", "SU"],
        selected: []
      }
    },

    props: {
      date: {
        type: Date
      },

      mode: {
        type: String
      }
    },

    created() {},

    filters: {
      toNumber: function(value) {
        return value ? value.getDate() : null
      }
    },

    computed: {
      ...mapState(['records']),

      weeks() {
        return calendator.giveMeCalendarForMonthYear(this.date.getMonth(), this.date.getFullYear())
      },

      days() {
        return this.weeks.reduce((a, b) => a.concat(b)).map(d => {
          return d ? new Date(this.date.getFullYear(), this.date.getMonth(), d) : null
        })
      }
    },

    watch: {
      mode(val) {
        if(!val) {
          this.selected = []
        }
      }
    },

    methods: {
      addClasses(date) {
        if(date) {
          return {
            selected: this.isSelected(date),
            weekend: this.isWeekend(date),
            holiday: this.isHoliday(date),
            empty: this.isEmpty(date),
            vacation: this.isVacation(date),
            sickness: this.isSickness(date),
            absence: this.isAbsence(date)
          }
        }

      },

      isSelected(date) {
        return this.selected.includes(date)
      },

      isWeekend(date) {
        return isWeekend(date)
      },

      isHoliday(date) {
        return date && isHoliday(date) || this.record(date).reason === "holiday"
      },

      isEmpty(date) {
        return !date
      },

      isAbsence(date) {
        return this.record(date).type === 'absence'
      },

      isRecorded(date) {
        return !!this.records[date.toDateString()]
      },

      isVacation(date) {
        return this.record(date).reason === "vacation"
      },

      isSickness(date) {
        return this.record(date).reason === "sickness"
      },

      record(date) {
        if (date && this.isRecorded(date)) {
          return this.records[date.toDateString()]
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
  @import '~@/assets/_animations.sass'
  @import '~@/assets/_variables.sass'

  .calendar
    display: flex
    justify-content: space-around
    align-items: center
    flex-direction: column
    width: 90%

    &.add, &.remove
      opacity: 1

      li.holiday, li.weekend
        opacity: 0.2

    &.add
      li.absence
        opacity: 0.2
        pointer-events: none

    &.remove
      li.absence:not(.selected)
        animation: jiggle 0.2s infinite
        will-change: transform
        background: tomato

      li.day:not(.absence)
        opacity: 0.2
        pointer-events: none

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
    // grid-template-rows: repeat(7, 1fr)
    grid-row-gap: 0.2rem
    grid-column-gap: 0.2rem
    width: 90%
    // height: 100%
    margin: 0
    // padding: 0.5em 1em
    padding: 0
    justify-items: center
    align-items: center

  .grid-item
    display: inline-block
    color: #444
    list-style: none

    text-align: center
    font-size: 1.0em
    z-index: 1

    transition: opacity 1s

    &:not(.label)
      height: 1.8rem
      width: 1.8rem
      line-height: 1.8rem
    //
    // &:not(.label):not(.weekend)
    //   &:not(.holiday)
    //     cursor: pointer
    //   &:not(.selected):not(.holiday):hover
    //     background: rgba(0, 0, 0, 0.1)
    //




  .label, .weekend, .holiday, .empty, .disabled
    pointer-events: none

  .label
    color: $dark-grey

  .day:not(.weekend)
    font-weight: bold

  .weekend
    color: tomato


  .selected
    background: $blue
    color: white

  .holiday
    background: tomato
    // border: 0.1rem solid tomato
    color: #fff !important

  .disabled
    color: $mid-grey

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
    // border: 0.1rem solid $green
    background: $green
    color: white

  .sickness
    // border: 0.1rem solid $amber
    background: $amber
    color: white

  .holiday
    // border: 0.1rem solid $red
    background: $red
    color: white

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
