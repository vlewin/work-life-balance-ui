<template>
  <pager :active="page">
    <report-page slot="left"></report-page>
    <home-page slot="center"></home-page>
    <absence-page slot="right"></absence-page>
  </pager>
</template>

<script>
  import HomePage from './HomePage'
  import ReportPage from './ReportPage'
  import AbsencePage from './AbsencePage'
  import Pager from './shared/Pager'

  export default {
    name: 'Index',
    components: {
      HomePage,
      ReportPage,
      AbsencePage,
      Pager
    },

    data () {
      return {
        page: 'page-2',
      }
    },

    created () {
      console.log('CREATED')
    },

    computed: {
    },

    methods: {
      navigate (page) {
        this.page = page
      },
    }
  }
</script>
