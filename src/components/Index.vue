<template>
  <div>
    <page-slider>
      <report-page slot="left"></report-page>
      <time-page slot="center"></time-page>
      <absence-page slot="right"></absence-page>
    </page-slider>
  </div>
</template>

<script>
  import PageSlider from "./shared/PageSlider"
  import ReportPage from "./pages/report/ReportPage"
  import TimePage from "./pages/time/TimePage"
  import AbsencePage from "./pages/absence/AbsencePage"

  export default {
    name: "Index",
    components: {
      PageSlider,
      ReportPage,
      TimePage,
      AbsencePage
    }
  }
</script>
