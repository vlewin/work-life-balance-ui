<template>
  <card hcolor="tomato">
    <i slot="c-header-icon" class="fa fa-area-chart fa-6x" aria-hidden="true"></i>
    <!-- <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-2')">
      <i class="fa fa-clock-o" aria-hidden="true"></i>
    </div>
    <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-3')">
      <i class="fa fa-calendar" aria-hidden="true"></i>
    </div>
    <div slot="c-header-actions" class="font-2">
      <i class="fa fa-sliders" aria-hidden="true"></i>
    </div> -->

    <div slot="c-body" class="flex flex-center v-height-15">
      <month-picker class="uppercase" v-on:date-change="setDate"></month-picker>
    </div>

    <bar-chart class="height-50" slot="c-body" :data="data"></bar-chart>

    <div slot="c-body" class="flex flex-center v-height-15">
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
    <i slot="c-sidebar-icon" class="fa fa-area-chart fa-5x" aria-hidden="true"></i>

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
  import Card from "./ResponsiveCard"
  import MonthPicker from "./MonthPicker"
  import BarChart from "../charts/BarChart"

  export default {
    name: "Index",
    components: {
      Card,
      MonthPicker,
      BarChart,
    },
    data() {
      return {
        data: []
      }
    },

    computed: {
      ...mapGetters(["currentFomatedDate", "currentWeekNumber", "currentRecord"]),
      ...mapState(["page"])
    },

    methods: {
      ...mapActions(["navigate"]),
      setDate(date) {
        this.$store.dispatch("setCurrentDate", date)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .chart, .info
    width: 100%
    height: 50%
</style>
