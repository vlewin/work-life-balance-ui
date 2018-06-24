<template>
  <div id="settings-page">
    <div class="font-6">
      Settings
    </div>

    <p>
      Base URL: {{ baseUri }}
    </p>

    <router-link to="/">Back</router-link>
  </div>
</template>

<script>
  import { mapGetters, mapState } from "vuex"

  export default {
    name: "Settings",

    data() {
      return {
        icons: {
          'sickness': 'fa-briefcase-medical',
          'vacation': 'fa-suitcase'
        }
      }
    },

    props: {
      text: {
        type: String
      }
    },

    computed: {
      ...mapGetters(['currentRecord']),
      ...mapState(['baseUri'])
    }
  }
</script>

<style lang="sass">
  #settings-page
    height: 100%
    background: #fff
</style>
