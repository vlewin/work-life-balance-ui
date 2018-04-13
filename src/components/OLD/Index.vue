<template>
  <pager :active="page">
    <overview-page slot="left"></overview-page>
    <home-page slot="center"></home-page>
    <absence-page slot="right"></absence-page>
  </pager>
</template>

<script>
import Pager from "./shared/Pager"
import HomePage from "./HomePage"
import ReportPage from "./ReportPage"
import AbsencePage from "./AbsencePage"
import BarChart from "./charts/BarChart"
import OverviewPage from "./OverviewPage"

export default {
  name: "Index",
  components: {
    Pager,
    OverviewPage,
    HomePage,
    AbsencePage
  },

  data() {
    return {}
  },

  created() {
    console.log("CREATED")
  },

  computed: {
    page() {
      return this.$store.state.page
    }
  },

  methods: {}
}
</script>
