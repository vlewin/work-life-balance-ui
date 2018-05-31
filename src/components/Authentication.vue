<template>
  <div>
    <vertical-slider class="blue" :section="currentSection">
      <div slot="top" class="flex flex-center flex-column">
        <template v-if="online">
          <i class="far fa-clock fa-10x text-white" aria-hidden="true"></i>
          <h2 class="text-white">Record you time</h2>
        </template>
        <template v-else>
          <i class="far fa-exclamation-circle fa-10x text-white" aria-hidden="true"></i>
          <h2 class="text-white">You are offline.</h2>
        </template>
      </div>

      <div slot="middle" class="flex flex-center flex-column">
        <i class="far fa-calendar-check fa-10x text-white" aria-hidden="true"></i>
        <h2 class="text-white">Track your absence</h2>
      </div>

      <div slot="bottom" class="flex flex-center flex-column background-animation">
        <svg id="moon" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
          <g>
            <filter inkscape:collect="always" id="filter4412" x="-0.24474119" width="1.4894824" y="-0.22916524" height="1.4583305">
              <feGaussianBlur inkscape:collect="always" stdDeviation="8.2730041" id="feGaussianBlur4414" />
            </filter>

            <path
             style="opacity:0.57009343;fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3;marker:none;visibility:visible;display:inline;overflow:visible;filter:url(#filter4412);enable-background:accumulate"
             d="M 181.40625,40.53125 C 181.30935,40.55157 181.21474,40.5831 181.125,40.625 C 165.09026,47.541608 153.875,63.505237 153.875,82.0625 C 153.875,106.95605 174.0752,127.15625 198.96875,127.15625 C 213.5285,127.15625 226.50545,120.24847 234.75,109.53125 C 235.09027,109.08215 235.08598,108.40389 234.74,107.95913 C 234.39407,107.51437 233.73774,107.34325 233.2187,107.5625 C 228.05915,109.78751 222.38569,111.03125 216.4062,111.03125 C 192.90797,111.03125 173.87495,91.998229 173.87495,68.5 C 173.87495,58.750115 177.14651,49.762523 182.6562,42.59375 C 183.29318,41.774557 182.42716,40.345627 181.4062,40.53125 L 181.40625,40.53125 z"
             id="path4354"
             sodipodi:nodetypes="ccsscscsscc"
             transform="matrix(1.245855,0,0,1.245855,-49.536048,-0.3080361)" />

            <path
               style="opacity:0.0;fill:#000;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate"
               d="M 198.35018,47.345919 C 190.69597,47.345919 183.3929,48.900883 176.78131,51.745343 C 169.68752,60.956079 165.49074,72.508295 165.49074,85.033034 C 165.49074,115.1776 189.9302,139.61704 220.07476,139.61704 C 227.74549,139.61704 235.02068,138.03478 241.64365,135.17869 C 248.72622,125.97194 252.93419,114.44376 252.93419,101.92994 C 252.93419,71.785373 228.49474,47.345919 198.35018,47.345919 L 198.35018,47.345919 z"
               id="path4317" />

            <path
               style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate"
               d="M 176.74237,51.784275 C 157.34076,60.153191 143.76615,79.457892 143.76615,101.92994 C 143.76615,132.07452 168.20559,156.51396 198.35018,156.51396 C 215.98094,156.51396 231.66497,148.15013 241.64365,135.17869 C 235.02068,138.03478 227.74549,139.61704 220.07476,139.61704 C 189.9302,139.61704 165.49074,115.1776 165.49074,85.033034 C 165.49074,72.527903 169.66876,60.98791 176.74237,51.784275 L 176.74237,51.784275 z M 241.64365,135.17869 C 242.08466,134.6054 242.50999,134.0177 242.92842,133.42671 C 242.50855,134.01994 242.08629,134.60327 241.64365,135.17869 z M 228.87362,56.650899 C 230.32557,57.631842 231.73047,58.692054 233.07839,59.804467 C 231.73053,58.692127 230.32551,57.63177 228.87362,56.650899 z M 235.06397,61.517519 C 235.71019,62.104881 236.31537,62.729997 236.93275,63.34737 C 236.30918,62.723159 235.71702,62.111084 235.06397,61.517519 z M 240.47565,67.201732 C 241.58805,68.549653 242.64827,69.954543 243.62921,71.406492 C 242.64833,69.954614 241.58799,68.549578 240.47565,67.201732 z M 252.15553,111.11812 C 252.02931,111.86422 251.8835,112.60184 251.72727,113.3373 C 251.88386,112.60236 252.02881,111.86369 252.15553,111.11812 z"
               id="path4315" />
          </g>
        </svg>

        <h1 class="text-white center">
          WORK-LIFE-BALANCE
          <br />
          <small>Enjoy Your Work And Your Life!</small>
        </h1>

        <div id="login-container" class="flex flex-center">
          <i class="fas fa-balance-scale fa-10x" aria-hidden="true"></i>

          <br />

          <button class="btn-large text-white" v-on:click="login">
            SIGN IN ({{ navigator.standalone }}) {{ (storage.access_token || '').length }}
          </button>
        </div>

        <div v-if="message" id="authentication-message" class="text-white">
          {{ message }}
        </div>
      </div>

    </vertical-slider>
  </div>
</template>

<script>
import AuthService from "../main"
import VerticalSlider from "./shared/VerticalSlider.vue"

export default {
  name: "Authentication",
  components: { VerticalSlider },

  data() {
    return {
      section: this.initSection,
      navigator: window.navigator,
      storage: window.localStorage
    }
  },

  props: ['initSection', 'message'],

  mounted() {
    setTimeout(() => {
      this.slideMiddle()
      setTimeout(() => {
        this.slideDown()
      }, 1000)
    }, 1000)
  },

  computed: {
    online() {
      return this.$store.state.online
    },

    currentSection() {
      return this.online ? this.section : "top"
    }
  },

  methods: {
    toggleFullScreen() {
      var doc = window.document
      var docEl = doc.documentElement

      var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
      var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen

      if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl)
      }
      else {
        cancelFullScreen.call(doc)
      }
    },

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
      // this.toggleFullScreen()
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
      background-color: #071c27

  #authentication-message
    background: tomato
    padding: 2rem
    position: absolute
    bottom: 0

  h1
    small
      font-size: 0.5em

  i.fa-balance-scale
    color: #46608F

  .btn-large
    font-weight: bold
    font-size: 1em
    padding: 0 4em
    height: 6em
    line-height: 6em

  .background-animation
    background: url('./../assets/night-background.svg')
    transform: translateZ(0)
    background-size: cover
    backface-visibility: hidden

  @media (min-width: 20em) and (orientation: portrait)
    .background-animation
      animation: bk 60s -5s linear infinite
      transform: translateZ(0)

  @keyframes bk
    100%
      background-position: -100vw 0

  @keyframes opacity
    0%
      opacity: 1
    100%
      opacity: 0

  @keyframes move
    0%
      transform: translate(-70vw, 5vh)
    100%
      transform: translate(40vw, 10vh)

  #moon
    top: 0
    height: 34vh
    width: 69vh
    transform: translate(-150vw, 0vh)
    position: absolute
    animation: move 15s -3s linear infinite
    transform: translateZ(0)

  @media screen and (orientation: portrait)
    #login-container
      flex-direction: column

  @media screen and (orientation: landscape)
    #login-container
      flex-direction: row

      i.fa-balance-scale
        display: none

</style>
