<template>
  <login-form v-if="false"></login-form>
  <pager :active="page" v-else>
    <report-page slot="left"></report-page>
    <home-page slot="center"></home-page>
    <absence-page slot="right"></absence-page>
  </pager>
</template>

<script>
import LoginForm from "./LoginForm";
import Pager from "./shared/Pager";
import HomePage from "./HomePage";
import ReportPage from "./ReportPage";
import AbsencePage from "./AbsencePage";

export default {
  name: "Index",
  components: {
    LoginForm,
    Pager,
    HomePage,
    ReportPage,
    AbsencePage
  },

  data() {
    return {};
  },

  created() {
    console.log("CREATED");
  },

  computed: {
    page() {
      return this.$store.state.page;
    }
  },

  methods: {}
};
</script>
