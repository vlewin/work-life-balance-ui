<template>
  <pager :active="page" v-else>
    <preview slot="left"></preview>
    <!-- <report-page slot="left"></report-page> -->
    <home-page slot="center"></home-page>
    <absence-page slot="right"></absence-page>
  </pager>
</template>

<script>
import Pager from "./shared/Pager"
import HomePage from "./HomePage"
import ReportPage from "./ReportPage"
import AbsencePage from "./AbsencePage"
import Preview from "./charts/Preview"

export default {
  name: "Index",
  components: {
    Pager,
    HomePage,
    ReportPage,
    Preview,
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
