<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="info">
          <div class="date left-align">
            {{ date }}
          </div>
          <div class="time right-align">
            {{ time | toTimeWithSeconds | leadingZero }}
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="day-selector">
          <div class="arrow left"><<</div>
          <div class="day">1</div>
          <div class="day">2</div>
          <div class="day">3</div>
          <div class="day today selected">4</div>
          <div class="day">5</div>
          <div class="day">6</div>
          <div class="day">7</div>
          <div class="arrow right">>></div>
        </div>

        <div class="form">
          <div class="form-element start">
            <span v-on:click="showTimePicker('start')">{{ start }}</span>
            <!-- <vue-timepicker format="HH:mm" :minute-interval="5" v-model="day.start"></vue-timepicker> -->
          </div>

          <div class="form-element pause">
            30
          </div>

          <div class="form-element end">
            <span v-on:click="showTimePicker('end')">{{ end }}</span>
            <!-- <vue-timepicker :minute-interval="5" v-model="day.end"></vue-timepicker> -->
          </div>
        </div>

        <time-picker :target="target" v-on:selected="setTime"></time-picker>

        <div class="balance">
          <div class="current">
            Today: {{ today }}
          </div>
          <div class="overall">
            Balance: 1.25h
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="actions">
          <div class="button primary">
            Start / Stop
          </div>
          <div class="button default">
            Day off
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import TimePicker from './TimePicker'
  import Timestamp from '../models/timestamp'

  export default {
    name: 'Time',
    components: { VueTimepicker, TimePicker },
    data () {
      return {
        time: new Date(),
        target: null,
        weekdays: ['Mo', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        timepickers: {
          start: false,
          end: false
        },
        day: {
          start: this.startTime,
          pause: null,
          end: this.endTime
        }
      }
    },

    filters: {
      leadingZero: (value) => {
        const formated = value.split(':').map((value) => {
          const intValue = value
          if (intValue > 0 && intValue < 10) {
            return `0${intValue}`
          }
          return intValue
        })

        return formated.join(':')
      },

      toTime: function (value) {
        return Timestamp.toTime(value)
      },

      toTimeWithSeconds: function (value) {
        return Timestamp.toTime(value, { seconds: true })
      }
    },

    created () {
      window.Timestamp = Timestamp
      this.day = {
        start: this.startTime,
        end: this.endTime
      }

      setInterval(() => {
        this.time = new Date()
      }, 1000)
    },

    computed: {
      date () {
        return `${this.weekdays[this.time.getDay() - 1]}, ${this.time.toLocaleDateString()}`
      },

      start () {
        return this.day.start || '08:00'
      },

      end () {
        return this.day.end || '17:00'
      },

      today () {
      },

      startTime () {
        return {
          HH: this.start.getHours(),
          mm: this.start.getMinutes()
        }
      },

      endTime () {
        return {
          HH: this.end.getHours(),
          mm: this.end.getMinutes()
        }
      }
    },

    methods: {
      showTimePicker (target) {
        this.target = target
      },

      setTime (value) {
        this.day[this.target] = value
        this.target = null
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  // helpers
  .left-align
    text-align: left
  .right-align
    text-align: right

  .picker
    height: 10em
    overflow: hidden
    display: flex
    flex-flow: row
    align-items: stretch
    justify-content: space-between
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15)

    .dropdown
      padding: 0
      margin: 0
      list-style: none
      flex: 1
      overflow-x: hidden
      overflow-y: auto
      li
        text-align: center
        padding: 0.5em 0
        color: #161616

  .display-time
    text-align: center

  .container
    display: grid
    grid-template-columns: repeat(3, 1fr)
    align-self: center
    justify-content: center
    grid-template-areas: ". a ." ". a ."

  .card
    grid-area: a
    width: 60vw
    align-self: center
    justify-self: center

  .card-header
    border: 1px solid #ccc
    border-bottom: none
    border-radius: 5px 5px 0 0
    overflow: hidden

    .info
      display: grid
      grid-template-columns: repeat(2, 1fr)
      font-size: 2vw
      padding: 0.5vw

  .card-body
    padding: 0.5vw
    border: 1px solid #ccc

    .day-selector
      display: grid
      grid-template-columns: repeat(9, 1fr)


      .arrow, .day
        border: 1px solid #ccc

      .day
        border-right: none

        &.selected
          background-color: #42b983
          color: #fff

      .arrow:first-child
        border-right: none


    .form
      display: grid
      grid-template-columns: 2fr 1fr 2fr
      padding: 2vw 4vw
      position: relative
      align-items: center

      .form-element
        font-size: 4vw

        &.pause

    .balance
      display: grid
      grid-template-columns: 1fr 1fr
      border: 1px solid #ccc

  .card-footer
    border: 1px solid #ccc
    border-top: none
    border-radius: 0 0 5px 5px
    overflow: hidden

    .actions
      font-size: 2vw
      display: grid
      grid-template-columns: 1fr 1fr

      .button:first-child
        border-right: 1px solid #ccc

      .button
        padding: 0.5vw

        &.default
          background: #eee
        &.primary
          background: #42b983
          color: #fff

</style>
