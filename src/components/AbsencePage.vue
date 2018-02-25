<template>
  <card>
    <month-picker slot="header" class="uppercase dark-blue" v-on:date-change="setDate"></month-picker>

    <slider slot="body" class="height-20 horizontal text-white" :focused="sliderMap[reason]">
      <h4 slot="left" v-on:click="toggleReason('vacation')">VACATION</h4>
      <h4 slot="center" v-on:click="toggleReason('sickness')">SICKNESS</h4>
      <h4 slot="right" v-on:click="toggleReason('holiday')">HOLIDAY</h4>
    </slider>

    <calendar slot="body" class="height-70 white" :date="date"></calendar>

    <div slot="body" class="balance light-grey height-10">
      <span>VACATION: {{ vacationRestDays }} days</span>
      <span>SICKNESS: {{ seeknessDays }} days</span>
    </div>

    <simple-switch slot="footer" class="vertical animated">
      <button slot="up">SAVE</button>
      <button slot="down">DONE ;)</button>
    </simple-switch>

    <simple-switch slot="footer" class="vertical animated" :active="!!reason">
      <button slot="up" v-on:click="navigate('page-2')">&laquo; BACK </button>
      <button class="active" slot="down" v-on:click="reset">CANCEL</button>
    </simple-switch>
  </card>
</template>

<script>
import { mapActions } from "vuex"

import Card from "./shared/Card"
import MonthPicker from "./shared/MonthPicker"
import Slider from "./shared/Slider"
import Calendar from "./shared/Calendar"
import SimpleSwitch from "./shared/SimpleSwitch"

export default {
  name: "AbsencePage",
  components: {
    Card,
    MonthPicker,
    Slider,
    Calendar,
    SimpleSwitch
  },

  data() {
    return {
      page: "page-2",
      reason: null,
      date: new Date(),
      vacationRestDays: 28,
      seeknessDays: 2,
      sliderMap: {
        vacation: 0,
        sickness: 1,
        holiday: 2
      }
    }
  },

  methods: {
    ...mapActions([
      "navigate" // map `this.increment()` to `this.$store.dispatch('increment')`
    ]),

    setDate(date) {
      this.date = date
    },

    toggleReason(reason) {
      this.reason = this.reason === reason ? null : reason
    },

    reset() {
      Object.assign(this.$data, this.$options.data.call(this))
    }
  }
}
</script>

<style lang="sass">
  .balance
    display: flex
    justify-content: space-around
    align-items: center
    font-size: 80%
    width: 100%
</style>
