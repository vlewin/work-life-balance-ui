<template>
  <div>
    <report-card></report-card>
    <responsive-card></responsive-card>
    <absence-card></absence-card>
  </div>
</template>

<script>
  import ReportCard from "./ReportCard"
  import ResponsiveCard from "./ResponsiveCard"
  import AbsenceCard from "./AbsenceCard"

  export default {
    name: "Index",
    components: {
      ReportCard,
      ResponsiveCard,
      AbsenceCard
    }
  }
</script>
