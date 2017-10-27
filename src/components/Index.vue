<template>
  <pager :active="page">
    <report-page slot="left"></report-page>
    <home-page slot="center"></home-page>
    <absence-page slot="right"></absence-page>
  </pager>
</template>

<script>
  import Pager from './Pager'
  import HomePage from './HomePage'
  import ReportPage from './ReportPage'
  import AbsencePage from './AbsencePage'

  export default {
    name: 'Index',
    components: {
      Pager,
      HomePage,
      ReportPage,
      AbsencePage
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
