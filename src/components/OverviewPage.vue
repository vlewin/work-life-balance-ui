<template>
  <card slot="left">
    <month-picker slot="header" class="uppercase dark-blue" v-on:date-change="setDate"></month-picker>
    <bar-chart slot="body"></bar-chart>
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

<style lang="sass">

</style>
