<template>
  <div class="form">
    <div class="form__header">
      <!-- <h3>
        <i class="fas fa-balance-scale fa-2x"></i>&nbsp;
      </h3> -->
      <h1> WORK-LIFE-BALANCE</h1>
      <h3>Enjoy Your Work And Your Life!</h3>

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
    </div>

    <div class="form__content">
      <input class="" type="email" v-model="email" />
      <!-- <span> <a href="">Dont' remember your password?</a></span> -->
      <input type="password" v-model="password" />
      <!-- <span> <a href="">Dont' remember your password?</a></span> -->
    </div>

    <div class="form__footer">
      <button v-on:click="login">LOGIN</button>
      <!-- <span> <a href="">Dont' have an account?</a></span> -->
    </div>
  </div>
</template>

<script>
  // import { mapState } from "vuex"
  import auth0 from "auth0-js"
  import AuthService from "../main"


  export default {
    name: "Auth",
    data() {
      return {
        email: "test-signup@example.com",
        password: "Password1234",
        auth: new auth0.WebAuth({
          domain: 'work-life-balance.eu.auth0.com',
          clientID: 'Uwn1T7EyBw83RQ5FEVRzHoc0E6MB1UaT',
          responseType: 'token id_token',
          audience: 'https://work-life-balance.eu.auth0.com/api/v2/',
          responseMode: 'fragment',
          scope: 'openid',
        })
      }
    },

    methods: {
      login() {
        console.log('Login')
        AuthService.login(this.email, this.password)
      },

      signup() {
        console.log('signup')
        console.log(this.email, this.password)
        this.auth.signup({
            realm: 'Username-Password-Authentication',
            connection: 'Username-Password-Authentication',
            email: this.email,
            password: this.password,
            user_metadata: { plan: 'silver', team_id: 'a111' }
        }, (err) => {
            if (err) {
              return alert('Something went wrong: ' + err.message)
            }

            return alert('success signup without login!')
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  /// Block Element
  /// @access public
  /// @param {String} $element - Element's name
  @mixin element($element)
      &__#{$element}
          @content

  /// Block Modifier
  /// @access public
  /// @param {String} $modifier - Modifier's name
  @mixin modifier($modifier)
      &--#{$modifier}
          @content

  @keyframes move
    0%
      transform: translate(-70vw, 5vh)
    100%
      transform: translate(40vw, 10vh)





  h1, h3
    margin: 0
    padding: 0

  a
    color: #98c2c2
    font-weight: bold
    text-decoration: none

  .form
    display: grid

    grid-template-rows: 1fr 1fr 1fr
    width: 100%
    height: 100%

    // border: 1px dotted #000
    // padding: 10px
    text-align: center
    background: url(http://vue-work-life-balance-development.s3-website.eu-central-1.amazonaws.com/img/night-background.cde2c8b0.svg)
    transform: translateZ(0)
    background-size: cover
    backface-visibility: hidden
    // animation: bk 120s -5s linear infinite

    @keyframes bk
      100%
        background-position: -100vw 0

    @include element('header')
      // background: yellow
      /* CSS declarations for `.block__element` */
      // FIXME: Remove dublications
      position: relative
      // overflow: hidden
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column

      h1
        // color: #eee
        font-size: 2.1rem

      #moon
        top: -8vh
        height: 30vh
        width: 60vh
        z-index: -1
        transform: translate(-110vw, 0vh)
        position: absolute
        animation: move 30s -3s linear infinite
        transform: translateZ(0)

    @include element('content')
      // FIXME: Remove dublications
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column

      input
        display: block
        box-sizing: border-box
        width: 80%
        height: 10vh
        margin: 10px 0
        text-align: center
        font-size: 1.2rem
        background: #46608f
        border: none
        color: white
        border-radius: 5px

    @include element('footer')
      // font-size: 2rem
      color: #fff

      // FIXME: Remove dublications
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      /* CSS declarations for `.block__element` */

      button
        display: block
        box-sizing: border-box
        width: 80%
        height: 10vh
        margin: 10px 0
        font-size: 1rem
        background: #213345
        color: white
        border: none
        border-radius: 5px
</style>
