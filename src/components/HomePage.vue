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

        <div class="form-info" v-on:click="navigate('page-1')">
          <smiley v-if="isRecorded" :mood="mood"></smiley>
          <smiley v-else mood="neutral"></smiley>

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
import { timeToNumber, timeToDateTime } from "../helpers/date"

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

      loading: false,
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
    ...mapState(["currentDate", "records"]),

    mood() {
      if (this.duration < 6.5 || this.duration >= 9.5) {
        return "dead"
      } else if (this.duration < 8 || this.duration >= 8.5) {
        return "bad"
      } else if (this.duration >= 8 && this.duration < 8.5) {
        return "good"
      } else if (this.duration >= 6.5 && this.duration < 9.5) {
        return "neutral"
      } else {
        return "dead"
      }
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
      this.loading = true
      this.form.duration = this.duration
      // await Record.save(this.form);

      await this.$store.dispatch("saveRecord", this.form)

      setTimeout(() => {
        this.loading = false
      }, 500)
      // this.$store.dispatch("fetchRecords", this.currentWeekNumber);
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
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
</style>
