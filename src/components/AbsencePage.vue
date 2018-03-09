<template>
  <card>
    <month-picker slot="header" class="uppercase dark-blue" v-on:date-change="setDate"></month-picker>

    <slider slot="body" class="height-20 horizontal text-white" :focused="sliderMap[reason]">
      <h4 slot="left" v-on:click="toggleReason('vacation')">
        <i class="fa fa-plane"></i>
        VACATION
      </h4>
      <h4 slot="center" v-on:click="toggleReason('sickness')">
        <i class="fa fa-heartbeat"></i>
        SICKNESS
      </h4>
      <h4 slot="right" v-on:click="toggleReason('holiday')">
        <i class="fa fa-gift" aria-hidden="true"></i>
        HOLIDAY
      </h4>
    </slider>

    <calendar slot="body" class="height-70 white" :date="date" :records="records" v-on:changed="setSelectedDates"></calendar>

    <div slot="body" class="balance light-grey height-10">
      <template v-if="this.dates.length">
        CLEAR
      </template>

      <template v-else>
        <span>VACATION: {{ vacationRestDays }} days</span>
        <span>SICKNESS: {{ seeknessDays }} days</span>
      </template>
    </div>

    <simple-switch slot="footer" class="vertical animated">
      <button slot="up" v-on:click="save">SAVE</button>
      <button slot="down">DONE ;)</button>
    </simple-switch>

    <simple-switch slot="footer" class="vertical animated" :active="!!reason">
      <button slot="up" v-on:click="navigate('page-2')">&laquo; BACK </button>
      <button class="active" slot="down" v-on:click="reset">CANCEL</button>
    </simple-switch>
  </card>
</template>

<script>
import { mapState, mapActions } from "vuex"

import Card from "./shared/Card"
import MonthPicker from "./shared/MonthPicker"
import Slider from "./shared/Slider"
import Calendar from "./shared/Calendar"
import SimpleSwitch from "./shared/SimpleSwitch"
import getISOWeek from "date-fns/get_iso_week"

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
      dates: [],
      sliderMap: {
        vacation: 0,
        sickness: 1,
        holiday: 2
      }
    }
  },

  computed: {
    ...mapState(["records"]),
    // ...mapGetters(["currentWeekNumber"]),

    items() {
      return this.dates.map(date => {
        return {
          date: date.toLocaleDateString(),
          week: getISOWeek(date),
          absence: this.reason,
          duration: 8
        }
      })
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

    setSelectedDates(dates) {
      this.dates = dates
    },

    async save() {
      await this.$store.dispatch("saveRecord", { records: this.items })
    },

    reset() {
      Object.assign(this.$data, this.$options.data.call(this))
    }
  }
}
</script>

<style lang="sass" scoped>
  .balance
    display: flex
    justify-content: space-around
    align-items: center
    font-size: 80%
    width: 100%

  i
    margin-right: 5px
    vertical-align: middle
    height: 1.1em
</style>
