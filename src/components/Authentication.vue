<template>
  <div>
    <vertical-slider :section="section">
      <div slot="top" class="flex flex-center flex-column height-80">
        <h1 class="text-white">WORK</h1>
        <h4 class="text-white">This is a demo Vue.js SPA/PWA application</h4>
      </div>

      <div slot="middle" class="flex flex-center flex-column height-80">
        <h1 class="text-white">WORK-LIFE</h1>
        <!-- <svg version="1.1" viewBox="0 0 500.00001 500.00001" xmlns="http://www.w3.org/2000/svg">
         <g transform="translate(0 -552.36)">
          <path d="m250 571.78 199.69 115.29-1e-5 230.58-199.69 115.29-199.69-115.29 7e-6 -230.58z" fill="none" stroke="#555" stroke-linecap="round" stroke-width="18.446"/>
          <g transform="translate(0 .020371)" fill="#555" fill-rule="evenodd" shape-rendering="auto">
           <path d="m185.61 740.19a9.9393 9.9393 0 0 0 -6.832 3.0059l-51.805 51.805a9.9393 9.9393 0 0 0 0 14.055l51.805 51.805a9.9393 9.9393 0 1 0 14.055 -14.055l-44.775-44.777 44.775-44.777a9.9393 9.9393 0 0 0 -7.2226 -17.061z" color="#000000" color-rendering="auto" image-rendering="auto" solid-color="#000000" style="block-progression:tb;isolation:auto;mix-blend-mode:normal;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-transform:none;white-space:normal"/>
           <path d="m314.09 740.19a9.9393 9.9393 0 0 0 -6.9238 17.066l44.775 44.777-44.775 44.777a9.9393 9.9393 0 1 0 14.055 14.055l51.805-51.805a9.9393 9.9393 0 0 0 0 -14.055l-51.805-51.805a9.9393 9.9393 0 0 0 -7.1309 -3.0117z" color="#000000" color-rendering="auto" image-rendering="auto" solid-color="#000000" style="block-progression:tb;isolation:auto;mix-blend-mode:normal;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-transform:none;white-space:normal"/>
           <path d="m262.01 724.5a9.9393 9.9393 0 0 0 -9.6406 8.0742l-27.861 135.57a9.9393 9.9393 0 1 0 19.471 4.002l27.861-135.57a9.9393 9.9393 0 0 0 -9.8301 -12.076z" color="#000000" color-rendering="auto" image-rendering="auto" solid-color="#000000" style="block-progression:tb;isolation:auto;mix-blend-mode:normal;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-transform:none;white-space:normal"/>
          </g>
         </g>
        </svg> -->
        <h4 class="text-white">This is a demo Vue.js SPA/PWA application</h4>

          <!-- <h2 class="text-white">WORK-LIFE-BALANCE</h2>

          <svg version="1.1" viewBox="0 0 500.00001 500.00001" xmlns="http://www.w3.org/2000/svg">
           <g transform="translate(0 -552.36)">
            <path d="m250 571.78 199.69 115.29-1e-5 230.58-199.69 115.29-199.69-115.29 7e-6 -230.58z" fill="none" stroke="#555" stroke-linecap="round" stroke-width="18.446"/>
            <g transform="translate(0 .020371)" fill="#555" fill-rule="evenodd" shape-rendering="auto">
             <path d="m185.61 740.19a9.9393 9.9393 0 0 0 -6.832 3.0059l-51.805 51.805a9.9393 9.9393 0 0 0 0 14.055l51.805 51.805a9.9393 9.9393 0 1 0 14.055 -14.055l-44.775-44.777 44.775-44.777a9.9393 9.9393 0 0 0 -7.2226 -17.061z" color="#000000" color-rendering="auto" image-rendering="auto" solid-color="#000000" style="block-progression:tb;isolation:auto;mix-blend-mode:normal;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-transform:none;white-space:normal"/>
             <path d="m314.09 740.19a9.9393 9.9393 0 0 0 -6.9238 17.066l44.775 44.777-44.775 44.777a9.9393 9.9393 0 1 0 14.055 14.055l51.805-51.805a9.9393 9.9393 0 0 0 0 -14.055l-51.805-51.805a9.9393 9.9393 0 0 0 -7.1309 -3.0117z" color="#000000" color-rendering="auto" image-rendering="auto" solid-color="#000000" style="block-progression:tb;isolation:auto;mix-blend-mode:normal;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-transform:none;white-space:normal"/>
             <path d="m262.01 724.5a9.9393 9.9393 0 0 0 -9.6406 8.0742l-27.861 135.57a9.9393 9.9393 0 1 0 19.471 4.002l27.861-135.57a9.9393 9.9393 0 0 0 -9.8301 -12.076z" color="#000000" color-rendering="auto" image-rendering="auto" solid-color="#000000" style="block-progression:tb;isolation:auto;mix-blend-mode:normal;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-transform:none;white-space:normal"/>
            </g>
           </g>
          </svg>

          <button class="btn-large dark-blue text-white" v-on:click="login">
            SIGN IN
          </button> -->
      </div>

      <div slot="bottom" class="flex flex-center flex-column height-80">
        <!-- <button class="btn-default btn-large" v-on:click="logout">LOGOUT</button> -->
        <h1 class="text-white">WORK-LIFE-BALANCE</h1>
        <p>
          <i class="fa fa-balance-scale fa-10x" aria-hidden="true"></i>
        </p>

        <!-- <svg version="1.1" viewBox="0 0 500.00001 500.00001" xmlns="http://www.w3.org/2000/svg">
         <g transform="translate(0 -552.36)">
          <path d="m250 571.78 199.69 115.29-1e-5 230.58-199.69 115.29-199.69-115.29 7e-6 -230.58z" fill="none" stroke="#555" stroke-linecap="round" stroke-width="18.446"/>
          <g transform="translate(0 .020371)" fill="#555" fill-rule="evenodd" shape-rendering="auto">
           <path d="m185.61 740.19a9.9393 9.9393 0 0 0 -6.832 3.0059l-51.805 51.805a9.9393 9.9393 0 0 0 0 14.055l51.805 51.805a9.9393 9.9393 0 1 0 14.055 -14.055l-44.775-44.777 44.775-44.777a9.9393 9.9393 0 0 0 -7.2226 -17.061z" color="#000000" color-rendering="auto" image-rendering="auto" solid-color="#000000" style="block-progression:tb;isolation:auto;mix-blend-mode:normal;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-transform:none;white-space:normal"/>
           <path d="m314.09 740.19a9.9393 9.9393 0 0 0 -6.9238 17.066l44.775 44.777-44.775 44.777a9.9393 9.9393 0 1 0 14.055 14.055l51.805-51.805a9.9393 9.9393 0 0 0 0 -14.055l-51.805-51.805a9.9393 9.9393 0 0 0 -7.1309 -3.0117z" color="#000000" color-rendering="auto" image-rendering="auto" solid-color="#000000" style="block-progression:tb;isolation:auto;mix-blend-mode:normal;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-transform:none;white-space:normal"/>
           <path d="m262.01 724.5a9.9393 9.9393 0 0 0 -9.6406 8.0742l-27.861 135.57a9.9393 9.9393 0 1 0 19.471 4.002l27.861-135.57a9.9393 9.9393 0 0 0 -9.8301 -12.076z" color="#000000" color-rendering="auto" image-rendering="auto" solid-color="#000000" style="block-progression:tb;isolation:auto;mix-blend-mode:normal;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-transform:none;white-space:normal"/>
          </g>
         </g>
        </svg> -->
        <br />
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

export default {
  name: "Authentication",
  components: { VerticalSlider },

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

  computed: {},

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
    // height: 10vh


</style>
