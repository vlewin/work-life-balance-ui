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
          <info :duration="duration" :total="total"></info>
          <!-- <pre>
            {{ form }}
          </pre>
          <pre>
            {{ record }}
          </pre> -->
        </div>
      </div>

      <time-picker class="simple-slider-item" slot="down" :init-value="form[slider.target]" :target="slider.target" v-on:changed="setValue" v-on:done="closeSlider"></time-picker>
    </simple-slider>

    <simple-switch slot="footer" class="vertical animated primary">
      <button slot="up" v-on:click="save">SAVE</button>
      <button slot="down">DONE ;)</button>
    </simple-switch>

    <simple-switch slot="footer" class="horizontal animated primary" :active="timepicker">
      <button slot="up" v-on:click="navigate('page-3')">ABSENCE</button>
      <button slot="down" v-on:click="closeSlider">CANCEL</button>
    </simple-switch>
  </card>
</template>

<script>
// import axios from 'axios'
import differenceInMinutes from "date-fns/difference_in_minutes";
import format from "date-fns/format";
import addHours from "date-fns/add_hours";
import getISOWeek from "date-fns/get_iso_week";
import { mapActions } from "vuex";
import { timeToNumber } from "../helpers/date";

import Card from "./shared/Card";
import DatePicker from "./shared/DatePicker";
import SimpleSlider from "./shared/SimpleSlider";
import SimpleSwitch from "./shared/SimpleSwitch";
import TimePicker from "./shared/TimePicker";
import Info from "./Info";

import Timestamp from "../services/timestamp";
import Record from "../services/record";

export default {
  name: "HomePage",
  components: {
    Card,
    DatePicker,
    SimpleSlider,
    SimpleSwitch,
    Info,
    TimePicker
  },

  data() {
    return {
      slider: {
        open: false,
        target: null
      },

      form: {},

      timepicker: false
    };
  },

  created: async function() {
    this.initForm();
  },

  computed: {
    isRecorded() {
      return !!this.record;
    },

    record() {
      return this.$store.getters.findRecordByDate(this.date);
    },

    currentDate() {
      return this.$store.state.currentDate;
    },

    week() {
      return getISOWeek(this.currentDate);
    },

    date() {
      return format(this.currentDate, "DD.MM.YYYY");
    },

    start() {
      if (this.form.start && this.form.start.includes(":")) {
        return new Date(
          `${format(this.currentDate, "YYYY/MM/DD")} ${this.form.start}`
        );
      }

      return new Date();
    },

    pause() {
      return this.form.pause;
    },

    finish() {
      console.log(this.date);
      return new Date(
        `${format(this.currentDate, "YYYY/MM/DD")} ${this.form.finish}`
      );
    },

    duration() {
      return this.total - timeToNumber(this.pause);
    },

    total() {
      return (differenceInMinutes(this.finish, this.start) / 60).toFixed(2);
    }
  },

  watch: {
    start(val) {
      if (val) {
        console.log("HomePage - start value changed", val);
        this.calculateEnd();
      }
    },

    pause(val) {
      if (val) {
        console.log("HomePage - pause value changed", val);
        this.calculateEnd();
      }
    },

    currentDate() {
      this.initForm();
    }
  },

  filters: {
    timeToNumber: function(value) {
      const splitted = value.split(":");
      return parseInt(splitted[0]) * 60 + parseInt(splitted[1]);
    }
  },

  methods: {
    ...mapActions([
      "navigate" // map `this.increment()` to `this.$store.dispatch('increment')`
    ]),

    initForm() {
      if (this.isRecorded) {
        Object.assign(this.form, this.record);
      } else {
        this.form = {
          date: this.date,
          week: this.week,
          start: "09:00",
          pause: "00:30",
          finish: "17:30"
        };
      }
    },

    calculateEnd() {
      const diff = 8 + timeToNumber(this.pause);
      this.form.finish = format(addHours(this.start, diff), "HH:mm");
    },

    openSlider(options) {
      this.slider = options;
      this.togglePicker(true);
    },

    closeSlider() {
      this.slider = this.$options.data().slider;
      this.togglePicker(false);
    },

    togglePicker(open = true) {
      this.timepicker = open;
    },

    setValue(target, value) {
      this.form[target] = value;
    },

    setPause(value) {
      this.form.pause = value;
      this.closeSlider();
    },

    setDate(date) {
      this.currentDate = date;
    },

    update() {},

    save: async function() {
      this.form.duration = this.duration;
      await Record.save(this.form);
      this.$store.dispatch("fetchRecords", this.week);
    }
  }
};
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
