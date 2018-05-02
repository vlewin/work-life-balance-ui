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
      <div>
        <i class="fa fa-gift" aria-hidden="true"></i>
        Holidays: 0
      </div>
      <div>
        <i class="fa fa-heartbeat" aria-hidden="true"></i>
        Sickness: 0
      </div>
      <div>
        <i class="fa fa-plane" aria-hidden="true"></i>
        Vacation: 0
      </div>
    </div>

    <template slot="c-sidebar-title">Week: 13</template>
    <i slot="c-sidebar-icon" class="fas fa-chart-pie fa-6x" aria-hidden="true"></i>

    <!-- <div slot="c-sidebar-actions" class="font-2" v-on:click="navigate('page-2')">
      <i class="fa fa-clock-o" aria-hidden="true"></i>
    </div>
    <div slot="c-sidebar-actions" class="font-2" v-on:click="navigate('page-3')">
      <i class="fa fa-calendar" aria-hidden="true"></i>
    </div>
    <div slot="c-sidebar-actions" class="font-2">
      <i class="fa fa-sliders" aria-hidden="true"></i>
    </div> -->

    <template slot="c-footer">
      TOTAL: +4h
    </template>
  </card>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex"
  import BarChart from "./BarChart"
  import Card from "../../shared/ResponsiveCard"
  import MonthPicker from "../../shared/MonthPicker"
  import { monthRange } from "../../../helpers/date"

  export default {
    name: "ReportPage",
    components: {
      Card,
      MonthPicker,
      BarChart,
    },
    data() {
      return {
      }
    },

    computed: {
      ...mapGetters(["currentMonthNumber"]),
      ...mapState(["page", "fetching", "records"]),

      // data() {
      //   // debugger
      //   const dates = Object.keys(this.records)
      //   return monthRange(this.currentMonthNumber).map((date) => {
      //     if(dates.includes(date.toLocaleDateString())) {
      //       return { duration: this.records[date.toLocaleDateString()].duration }
      //     } else {
      //       return { duration: 0 }
      //     }
      //   })
      // },

      // values() {
      //   return this.data.map((value) => value.duration)
      // }

      values() {
        const dates = Object.keys(this.records)
        return monthRange(this.currentMonthNumber).map((date) => {
          if(dates.includes(date.toLocaleDateString())) {
            return this.records[date.toLocaleDateString()]
          } else {
            return { date: date.toLocaleDateString(), duration: 0 }
          }
        })
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
