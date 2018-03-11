<template>
  <div>
    <pager :active="page">
      <report-card slot="left" :class="{ active: page === 'page-1'}"></report-card>
      <time-card slot="center" :class="{ active: page === 'page-2'}"></time-card>
      <absence-card slot="right" :class="{ active: page === 'page-3'}"></absence-card>
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
