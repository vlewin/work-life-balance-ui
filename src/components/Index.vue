<template>
  <page-slider>
    <report-page slot="left" :class="{ active: page === 'page-1'}"></report-page>
    <time-page slot="center" :class="{ active: page === 'page-2'}"></time-page>
    <absence-page slot="right" :class="{ active: page === 'page-3'}"></absence-page>
  </page-slider>
</template>

<script>
  import { mapActions, mapState } from "vuex"

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
    },

    props: ['page'],

    created() {
      this.navigate(this.page)
    },

    computed: {
      ...mapState(['balance']),
    },

    watch: {
      page(val) {
        if (val) {
          this.navigate(val)
        }
      }
    },

    mounted() {
      // FIXME: Remove
      if(!this.balance.total) {
        console.log('*** Fetch balance on mounted', this.balance.total)
        this.$store.dispatch('fetchBalance')
      }
    },

    methods: {
      ...mapActions(["navigate"])
    }
  }
</script>
