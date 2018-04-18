<template>
  <div class="white flex flex-center flex-column blue">
    <i class="fa fa-spinner fa-large fa-10x spin text-white"></i>
    <h1 class="text-white">Please wait ...</h1>
  </div>
</template>

<script>
import AuthService from "../main"

export default {
  name: "Authentication",
  components: {},

  data() {
    return {}
  },

  beforeEnter() {
    console.log(this.$router)
  },

  mounted() {
    console.log('Handle auth in callback')
    AuthService.handleCallback()
  },

  computed: {},

  methods: {
    slideUp() {
      this.section = "top"
    }
  }
}
</script>

<style lang="sass" scoped>
  h2
    height: 10vh
  svg
    height: 40vh
  button
    // height: 10vh


</style>
