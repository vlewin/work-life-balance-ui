<template>
  <div>
    <vertical-slider class="dark-blue" :section="currentSection">
      <div slot="top" class="flex flex-center flex-column">
        <h1 class="text-white">READY</h1>
        <i class="fa fa-clock-o fa-10x text-white" aria-hidden="true"></i>
        <h2 class="text-white">Record you time</h2>
      </div>

      <div slot="middle" class="flex flex-center flex-column">
        <h1 class="text-white">STEADY</h1>
        <i class="fa fa-calendar-check-o fa-10x text-white" aria-hidden="true"></i>
        <h2 class="text-white">Record your absence</h2>
      </div>

      <div slot="bottom" class="flex flex-center flex-column background-animation">
        <h1 class="text-white center">
          WORK-LIFE-BALANCE
          <br />
          <small>Enjoy Your Life And Your Job!</small>
        </h1>
        <p class="">
          <i class="fa fa-balance-scale fa-10x" aria-hidden="true"></i>
        </p>

        <br />
        <!-- <button v-on:click="slideUp">3</button>
        <button v-on:click="slideMiddle">2</button> -->

        <button class="btn-large dark-blue text-white" v-on:click="login">
          SIGN IN
        </button>
      </div>

    </vertical-slider>
  </div>
</template>

<script>
import AuthService from "../main"
import VerticalSlider from "./shared/VerticalSlider.vue"
// import VueLogo from "./VueLogo.vue"

export default {
  name: "Authentication",
  components: { VerticalSlider },
  // components: { VerticalSlider, VueLogo },

  data() {
    return {
      section: this.initSection
    }
  },

  props: ["initSection"],

  beforeEnter() {
    console.log(this.$router)
  },

  mounted() {
    console.log("CREATED")
    setTimeout(() => {
      this.slideMiddle()
      setTimeout(() => {
        this.slideDown()
      }, 1000)
    }, 1000)
  },

  computed: {
    currentSection() {
      return this.$store.state.online ? "bottom" : "top"
    }
  },

  methods: {
    slideUp() {
      this.section = "top"
    },

    slideMiddle() {
      this.section = "middle"
    },
    slideDown() {
      this.section = "bottom"
    },

    login() {
      AuthService.login()
    },

    logout() {
      AuthService.logout()
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
    border: none
    background-color: #213345
    border-radius: 1em

    &:hover
      background-color: #0d1d26
    // height: 10vh

  h1
    small
      font-size: 0.5em

  i.fa-balance-scale
    color: #46608F

  .background-animation
    background: #fff
    background: url('./../assets/night-background.svg')
    transform: translateZ(0)
    background-size: cover
    backface-visibility: hidden


  @media (min-width: 20em)
    .background-animation
      animation: bk 30s -5s linear infinite
      transform: translateZ(0)

  @media (min-width: 40em)
    .background-animation
      animation: bk 60s -5s linear infinite
      transform: translateZ(0)

  @keyframes bk
    100%
      background-position: 200vw 0




</style>
