<template>
  <card hcolor="tomato">
    <!-- <i slot="c-header-icon" class="fa fa-area-chart fa-6x" aria-hidden="true"></i> -->
    <i slot="c-header-icon" class="fas fa-chart-pie fa-5x"></i>

    <month-picker slot="c-body" class="flex flex-center uppercase" v-on:date-change="setDate"></month-picker>

    <h1 v-if="fetching" slot="c-body" class="flex flex-center height-50">
      LOADING...
    </h1>

    <h1 v-else-if="!fetching && !Object.keys(records).length" slot="c-body" class="flex flex-center height-50">
      NO DATA
    </h1>

    <bar-chart v-else class="height-50" slot="c-body" :values="values"></bar-chart>


    <div slot="c-body" class="flex flex-center v-height-10">
      <balance></balance>
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

  import { monthRange } from "../../../helpers/date"

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
      ...mapState(['page', 'fetching', 'balance', 'records']),

      values() {
        const dates = Object.keys(this.records)
        return monthRange(this.currentMonthNumber).map((date) => {
          let key = date.toDateString()
          if(dates.includes(key)) {
            return this.records[key]
          } else {
            return { date: key, duration: 0 }
          }
        })
      }
    },

    watch: {
      // FIXME: React on slide page event???
      page(val) {
        if (val === 'page-1') {
          setTimeout(() => {
            this.$store.dispatch("fetchMonthRecords", this.currentMonthNumber)
          }, 250)
        }
      }
    },

    methods: {
      ...mapActions(["navigate"]),

      async setDate(date) {
        await this.$store.dispatch("setCurrentDate", date)
        await this.$store.dispatch("fetchMonthRecords", this.currentMonthNumber)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .chart, .info
    width: 100%
    height: 50%
</style>
