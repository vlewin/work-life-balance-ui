<template>
  <card slot="left">
    <month-picker slot="header" class="uppercase dark-blue" v-on:date-change="setDate"></month-picker>
    <h3 class="text-grey-blue" slot="body">
      <!-- <i class="fa fa-line-chart" aria-hidden="true"></i> -->
      TREND
    </h3>
    <vue-trend slot="body" :data="trend" :stroke-width="4" :key='date.toLocaleDateString()' :height="30" :width="chartWidth" :gradient="trendGradient" auto-draw smooth />
    <h3 class="text-grey-blue" slot="body">
      <!-- <i class="fa fa-bar-chart" aria-hidden="true"></i> -->
      MONTH OVERVIEW
    </h3>

    <vue-bars slot="body" :data="data" :bar-width="8" :key='getRandomInt()' :width="chartWidth" :gradient="barsGradient" :growDuration="1"></vue-bars>
    <h3 class="text-grey-blue" slot="body">
      <!-- <i class="fa fa-balance-scale" aria-hidden="true"></i> -->
      BALANCE: 2 HOURS
    </h3>

    <button slot="footer" v-on:click="navigate('page-2')">BACK &raquo;</button>
  </card>
</template>

<script>
import { mapActions } from "vuex"

import VueTrend from "vuetrend"
import VueBars from "vuebars"

import Card from "./shared/Card"
import MonthPicker from "./shared/MonthPicker"

export default {
  name: "ReportPage",
  components: {
    Card,
    MonthPicker,
    VueTrend,
    VueBars
  },

  data() {
    return {
      date: new Date(),
      trendGradient: ["#98c2c2", "#50a7c2", "#42b983"],
      barsGradient: ["#50a7c2", "#42b983"],
      trend: [],
      data: []
    }
  },

  created() {
    this.generate()
    this.generateTrend()
  },

  computed: {
    chartWidth() {
      return document.getElementById("app").offsetWidth - 50
    }
  },

  watch: {
    date() {
      this.generate()
      this.generateTrend()
      this.$forceUpdate()
    }
  },

  methods: {
    ...mapActions([
      "navigate" // map `this.increment()` to `this.$store.dispatch('increment')`
    ]),

    generateTrend() {
      this.trend = [
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt()
      ]
    },

    generate() {
      this.data = [
        0,
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        0,
        0,
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        0,
        0,
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        0,
        0,
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt()
      ]
    },

    getRandomInt(min = 6, max = 10) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },

    setDate(date) {
      this.date = date
    }
  }
}
</script>
