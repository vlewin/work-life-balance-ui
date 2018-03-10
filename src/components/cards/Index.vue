<template>
  <div>
    <pager :active="page">
      <report-card slot="left"></report-card>
      <time-card slot="center"></time-card>
      <absence-card slot="right"></absence-card>
    </pager>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import Pager from "../shared/Pager"
  import ReportCard from "./ReportCard"
  import TimeCard from "./TimeCard"
  import AbsenceCard from "./AbsenceCard"

  export default {
    name: "Index",
    components: {
      Pager,
      ReportCard,
      TimeCard,
      AbsenceCard
    },

    computed: {
      ...mapState(["page"])
    }
  }
</script>
