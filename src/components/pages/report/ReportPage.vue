<template>
  <card hcolor="tomato">
    <i slot="c-header-icon" class="fas fa-chart-pie fa-5x"></i>
    <template slot="c-header-title">
      REPORT
    </template>

    <month-picker slot="c-body" class="flex flex-center uppercase" v-on:date-change="setDateAndFetch"></month-picker>
    <div slot="c-body" class="flex flex-between container">
      <div class="flex flex-center content" slot="c-body">
        <h1 v-if="fetching" class="flex flex-center height-50">
          LOADING...
        </h1>

        <h1 v-else-if="!fetching && !Object.keys(timestamps).length" class="flex flex-center height-50">
          NO DATA
        </h1>

        <bar-chart v-else class="height-50"  :values="values"></bar-chart>
      </div>

      <balance class="info"></balance>

    </div>

    <template slot="c-sidebar-title">Week: 13</template>
    <i slot="c-sidebar-icon" class="fas fa-chart-pie fa-6x" aria-hidden="true"></i>

    <template slot="c-footer">
      TOTAL: {{ balance.total }}h
    </template>
  </card>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex"
  import BarChart from "./BarChart"
  import Card from "../../shared/ResponsiveCard"
  import MonthPicker from "../../shared/MonthPicker"
  import Balance from "../../shared/Balance"
  import { monthRange, isWeekend } from "../../../helpers/date"

  export default {
    name: "ReportPage",
    components: {
      Card,
      MonthPicker,
      BarChart,
      Balance
    },
    data() {
      return {
      }
    },

    computed: {
      ...mapGetters(['currentMonthNumber']),
      ...mapState(['fetching', 'balance', 'records', 'absences']),

      timestamps() {
        return { ...this.records, ...this.absences}
      },

      values() {
        const dates = Object.keys(this.timestamps)
        return monthRange(this.currentMonthNumber).map((date) => {
          let key = date.toDateString()
          let timestamp = { date: key, duration: 0 }
          timestamp.weekend = isWeekend(date)

          if(dates.includes(key)) {
            timestamp = this.timestamps[key]
            timestamp.duration = timestamp.duration || 8
          }

          return timestamp
        })
      }
    },

    methods: {
      ...mapActions(["setDateAndFetch"])
    }
  }
</script>

<style lang="sass" scoped>
  .container
    height: calc(100% - 10vh)
    display: flex

  .content
    flex: auto

  @media screen and (orientation: portrait)
    .container
      flex-direction: column

    .info
      height: 10vh
      width: 100%

  @media screen and (orientation: landscape)
    .container
      flex-direction: row

    .content
      width: 80%

    .info
      width: 20%
</style>
