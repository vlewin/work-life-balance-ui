<template>
  <card>
    <date-picker slot="header"></date-picker>
    <simple-slider slot="body" :active="slider.open">
      <div class="simple-slider-item form" slot="up">
        <div class="form-input blue">
          <div class="form-trigger" v-on:click="openSlider({ open: true, target: 'start' })">
            {{ form.start }}
          </div>
          <div class="form-trigger" v-on:click="openSlider({ open: true, target: 'pause' })">
            {{ form.pause | timeToNumber }}
          </div>
          <div class="form-trigger" v-on:click="openSlider({ open: true, target: 'finish' })">
            {{ form.finish }}
          </div>
        </div>

        <div class="form-info flex flex-center" v-on:click="navigate('page-1')">
          <div v-if="fetching" class="center text-blue">
            <i class="fa fa-spinner fa-large fa-5x spin "></i>
            <h1 class="">Please wait ...</h1>
          </div>
          <div v-else>
            <!-- <h3 class="center">
              <i class="wi wi-night-sleet"></i>
              &nbsp;+20&deg;C
            </h3> -->
            <smiley :mood="mood"></smiley>
            <!-- <h3 class="center">{{ duration }} Hours</h3> -->
          </div>

          <!-- <info v-if="isRecorded" :duration="duration" :total="total"></info> -->
          <!-- <div v-else>
            {{ isRecorded }} {{ total }} {{ duration }}
            <pre>
              {{ form }}
            </pre>
          </div> -->
        </div>
      </div>

      <time-picker class="simple-slider-item" slot="down" :init-value="form[slider.target]" :target="slider.target" v-on:changed="setValue" v-on:done="closeSlider"></time-picker>
    </simple-slider>

    <simple-switch v-show="!timepicker" slot="footer" class="vertical animated primary" :active="loading">
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
import { mapActions, mapGetters, mapState } from "vuex"
import { isHappy, timeToNumber, timeToDateTime } from "../helpers/date"

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
    console.log("HomePage: create")
    this.initForm()
  },

  computed: {
    ...mapGetters(["currentFomatedDate", "currentWeekNumber", "currentRecord"]),
    ...mapState(["fetching", "loading", "currentDate", "records"]),

    mood() {
      if (this.isRecorded) {
        return isHappy(this.form.duration) ? "good" : "bad"
      }

      return "neutral"
      // if (this.duration < 8 || this.duration > 9) {
      //   return "bad"
      // } else if (this.duration >= 8 && this.duration <= 9) {
      //   return "good"
      // } else {
      //   return "neutral"
      // }
    },

    isRecorded() {
      console.log("RECTIVE ???")
      return !!this.currentRecord
    },

    duration() {
      return this.total - timeToNumber(this.form.pause)
    },

    total() {
      const start = timeToDateTime(this.currentDate, this.form.start)
      const finish = timeToDateTime(this.currentDate, this.form.finish)
      return (differenceInMinutes(finish, start) / 60).toFixed(2)
    }
  },

  watch: {
    "form.start"(val) {
      if (val) {
        console.log("HomePage - start value changed", val)
        this.calculateEnd()
      }
    },

    "form.pause"(val) {
      if (val) {
        console.log("HomePage - pause value changed", val)
        this.calculateEnd()
      }
    },

    currentDate() {
      this.initForm()
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

    initForm() {
      if (this.isRecorded) {
        console.log("isRecorded", JSON.stringify(this.currentRecord))
        Object.assign(this.form, this.currentRecord)
      } else {
        console.log("NOT recorded", this.duration)

        this.form = {
          date: this.currentFomatedDate,
          week: this.currentWeekNumber,
          start: "09:00",
          pause: "00:30",
          finish: "17:30"
        }
      }
    },

    calculateEnd() {
      const diff = 8 + timeToNumber(this.form.pause)
      const start = timeToDateTime(this.currentDate, this.form.start)
      this.form.finish = format(addHours(start, diff), "HH:mm")
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
      this.form[target] = value
    },

    save: async function() {
      this.form.duration = this.duration
      await this.$store.dispatch("saveRecord", this.form)
    }
  }
}
</script>

<style lang="sass" scoped>
  .form
    display: flex
    height: 100%
    width: 100%
    align-items: center
    justify-content: center
    flex-direction: column
    overflow: hidden
    white-space: nowrap

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
