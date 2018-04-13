<template>
  <card slot="left">
    <month-picker slot="header" class="uppercase green" v-on:date-change="setDate"></month-picker>
    <div class="height-100 width-100" slot="body">
      <div class="chart">
        <bar-chart slot="body"></bar-chart>
      </div>
      <div class="flex flex-row info">
        <div class="flex flex-center flex-column width-50">
          <h1>8.5</h1>
          <small>Average hours</small>
        </div>
        <div class="flex flex-center flex-align-start flex-column width-50">
          <div class="capitalize"><b>1</b> Holiday</div>
          <div class="capitalize"><b>0</b> Sickness</div>
          <div class="capitalize"><b>0</b> Vacation</div>
        </div>
      </div>
    </div>

    <button slot="footer" v-on:click="navigate('page-2')">BACK &raquo;</button>
  </card>
</template>


<script>
import { mapState, mapActions } from "vuex"

import Card from "./shared/Card"
import MonthPicker from "./shared/MonthPicker"
import BarChart from "./charts/BarChart"

export default {
  name: "OverviewPage",
  components: {
    Card,
    MonthPicker,
    BarChart
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState(["records"]),
  },

  methods: {
    ...mapActions([
      "navigate" // map `this.increment()` to `this.$store.dispatch('increment')`
    ]),

    setDate(date) {
      this.date = date
    }
  }
}
</script>

<style lang="sass" scoped>
  h1
    font-size: 470%
    padding: 0
    margin: 0
    color: #42b983

  .capitalize
    font-size: 120%
    line-height: 160%
    b
      color: #42b983

  .chart, .info
    width: 100%
    height: 50%
</style>
