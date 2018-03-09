<template>
  <card>
    <div class="header" slot="header">
      ssss
    </div>
    <date-picker slot="header"></date-picker>
    <simple-slider slot="body" :active="slider.open">
      <div class="simple-slider-item form" slot="up">
        <div class="form-input blue">
          <div v-if="absence" class="uppercase">
            {{ absence }}
          </div>
          <template v-else>
            <div class="form-trigger" v-on:click="openSlider({ open: true, target: 'start' })">
              <small><i class="fa fa-clock-o"></i>&nbsp;</small>
              {{ form.start }}
            </div>
            <div class="form-trigger" v-on:click="openSlider({ open: true, target: 'pause' })">
              <small><i class="fa fa-coffee"></i>&nbsp;</small>
              {{ form.pause | timeToNumber }}
            </div>
            <div class="form-trigger" v-on:click="openSlider({ open: true, target: 'finish' })">
              <small><i class="fa fa-clock-o"></i>&nbsp;</small>
              {{ form.finish }}
            </div>
          </template>
        </div>

        <div class="form-info flex flex-center" v-on:click="navigate('page-1')">
          <div v-if="fetching" class="center text-blue">
            <i class="fa fa-spinner fa-large fa-5x spin "></i>
            <h1 class="">Please wait ...</h1>
          </div>
          <div v-else>
            <info v-if="absence" :absence="absence" :duration="duration" :total="total"></info>
            <smiley v-else :mood="mood"></smiley>

            <!-- <div>
              {{ isRecorded }} {{ total }} {{ duration }}
              <pre>
                {{ form }}
              </pre>
            </div> -->
          </div>


        </div>
      </div>

      <time-picker class="simple-slider-item" slot="down" :init-value="form[slider.target]" :target="slider.target" v-on:changed="setValue" v-on:done="closeSlider"></time-picker>
    </simple-slider>

    <simple-switch v-show="!absence && !timepicker" slot="footer" class="vertical animated primary" :active="loading">
      <button slot="up" v-on:click="save">
        {{ isRecorded? 'UPDATE' : 'SAVE'}}
      </button>
      <button slot="down">
        <i class="fa fa-spinner spin"></i>
        SAVING ...
      </button>
    </simple-switch>

    <simple-switch slot="footer" class="horizontal animated" :active="timepicker">
      <button slot="up" v-on:click="navigate('page-3')">ABSENCE</button>
      <button slot="down" :class="{active: timepicker }" v-on:click="closeSlider">CANCEL</button>
    </simple-switch>
  </card>
</template>

<script>
// import axios from 'axios'
import differenceInMinutes from "date-fns/difference_in_minutes"
import format from "date-fns/format"
import addHours from "date-fns/add_hours"
import differenceInHours from "date-fns/difference_in_hours"
import isSameDay from "date-fns/is_same_day"

import { mapActions, mapGetters, mapState } from "vuex"
import { isHappy, timeToNumber, timeToDateTime, dateTimeToTime } from "../helpers/date"

import Card from "./shared/Card"
import DatePicker from "./shared/DatePicker"
import SimpleSlider from "./shared/SimpleSlider"
import SimpleSwitch from "./shared/SimpleSwitch"
import TimePicker from "./shared/TimePicker"
import Info from "./Info"
import Smiley from "./shared/Smiley"

export default {
  name: "HomePage",
  components: {
    Card,
    DatePicker,
    TimePicker,
    SimpleSlider,
    SimpleSwitch,
    Info,
    Smiley
  },

  data() {
    return {
      slider: {
        open: false,
        target: null
      },

      form: {
        start: "",
        pause: "",
        finish: ""
      },

      saved: false,
      timepicker: false
    }
  },

  created: async function() {
    console.log("CREATED")
    this.initForm()
  },

  computed: {
    ...mapGetters(["currentFomatedDate", "currentWeekNumber", "currentRecord"]),
    ...mapState(["fetching", "loading", "currentDate", "records"]),

    mood() {
      if (this.isRecorded) {
        return isHappy(this.duration) ? "good" : "bad"
      } else {
        return "neutral"
      }
    },

    isRecorded() {
      return !!this.currentRecord
    },

    absence() {
      if (this.isRecorded) {
        return this.currentRecord.absence
      }
    },

    duration() {
      const duration = this.total - timeToNumber(this.form.pause)
      console.log("Duration", duration, this.total, "-", timeToNumber(this.form.pause))

      this.form.duration = duration
      return duration
    },

    total() {
      const start = timeToDateTime(this.currentDate, this.form.start)
      const finish = timeToDateTime(this.currentDate, this.form.finish)
      const total = (differenceInMinutes(finish, start) / 60).toFixed(2)

      console.log("Total", total)
      return total

      // return differenceInHours(finish, start)
    }
  },

  watch: {
    "form.start"(val, oldVal) {
      if (val) {
        console.log("HomePage - start value changed", val)
        this.calculateEnd()
      }
    },

    "form.pause"(val, oldVal) {
      if (val) {
        console.log("HomePage - pause value changed", val)
        this.calculateEnd()
      }
    },

    "form.finish"(val, oldVal) {
      if (val) {
        console.log("HomePage - finish value changed", val)
        this.calculateDuration()
      }
    },

    currentDate() {
      console.log("HomePage - currentDate changed", this.currentDate)
      this.initForm()
    },

    currentRecord(oldVal, val) {
      console.log("HomePage - currentRecord changed", oldVal, val)
      this.initRecord()
    }
  },

  filters: {
    timeToNumber: function(value) {
      const splitted = value.split(":")
      return parseInt(splitted[0]) * 60 + parseInt(splitted[1])
    }
  },

  methods: {
    ...mapActions(["navigate"]),

    initRecord() {
      if (this.isRecorded) {
        console.log("this.isRecorded")
        console.log(JSON.stringify(Object.assign(this.form, this.currentRecord)))
        // Object.assign(this.form, this.currentRecord)
        this.form.start = this.currentRecord.start
        this.form.pause = this.currentRecord.pause
        this.form.finish = this.currentRecord.finish

        // this.$set(this, "form", this.currentRecord)
      }
    },

    initForm() {
      if (this.isRecorded) {
        console.log("this.isRecorded")
        console.log(JSON.stringify(Object.assign(this.form, this.currentRecord)))
        Object.assign(this.form, this.currentRecord)
      } else {
        console.log("initForm")
        this.form = {
          date: this.currentFomatedDate,
          week: this.currentWeekNumber,
          start: dateTimeToTime(new Date()),
          pause: "00:30",
          mood: this.mood
        }
        this.calculateEnd()
      }
    },

    calculateEnd() {
      if(this.isRecorded) {
        console.log('Skip end calculation')
      } else {
        const diff = 8 + timeToNumber(this.form.pause)
        const start = timeToDateTime(this.currentDate, this.form.start)
        const finish = format(addHours(start, diff))
        console.log(start, finish)
        if (isSameDay(start, finish)) {
          this.form.finish = format(addHours(start, diff), "HH:mm")
          console.log(this.form.finish)
        } else {
          this.form.finish = "23:55"
        }
      }

    },

    calculateDuration() {
      console.log("Duration", duration, this.total, "-", timeToNumber(this.form.pause))
      const start = timeToDateTime(this.currentDate, this.form.start)
      const finish = timeToDateTime(this.currentDate, this.form.finish)
      const total = (differenceInMinutes(finish, start) / 60).toFixed(2)
      const duration = total - timeToNumber(this.form.pause)

      console.log("Duration", duration, total, "-", timeToNumber(this.form.pause))

      this.$set(this.form, "duration", duration)
      return duration
    },

    openSlider(options) {
      this.slider = options
      this.togglePicker(true)
    },

    closeSlider() {
      this.slider = this.$options.data().slider
      this.togglePicker(false)
    },

    togglePicker(open = true) {
      this.timepicker = open
    },

    setValue(target, value) {
      console.log("Set Value", target, value)
      this.$set(this.form, target, value)

      if (["start", "pause"].includes(target)) {
        this.calculateEnd()
      }

      this.calculateDuration()
      console.log(JSON.stringify(this.form))
    },

    save: async function() {
      await this.$store.dispatch("saveRecord", this.form)
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '~@/assets/_variables.sass'

  .form
    display: flex
    height: 100%
    width: 100%
    align-items: center
    justify-content: center
    flex-direction: column
    overflow: hidden
    white-space: nowrap

  small
    font-size: 60%
    opacity: 0.5

  .form-input
    height: 20%
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    color: #fff
    font-size: 2rem
    font-weight: bold

    .form-trigger
      flex: 1 1 33%
      cursor: pointer
      display: flex
      align-items: center
      justify-content: center

  .form-info
    width: 100%
    height: 80%
    cursor: pointer
    flex-direction: column
</style>
