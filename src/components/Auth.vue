<template>
  <div class="form">
    <div class="form__header">
      <!-- <h3>
        <i class="fas fa-balance-scale fa-2x"></i>&nbsp;
      </h3> -->
      <h1> WORK-LIFE-BALANCE</h1>
      <h3>Enjoy Your Work And Your Life!</h3>
    </div>

    <div class="form__content">
      <input class="" type="email" v-model="email" />
      <input type="password" v-model="password" />
      <span> <a href="">Dont' remember your password?</a></span>
    </div>

    <div class="form__actions">
      <!-- <button v-on:click="login">LOGIN</button> -->
      <!-- <button v-on:click="signup">SIGNUP</button> -->
    </div>

    <div class="form__footer">
      <button v-on:click="login">LOGIN</button>
      <span> <a href="">Dont' have an account?</a></span>
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

  h1, h3
    margin: 0
    padding: 0

  a
    color: #98c2c2
    font-weight: bold
    text-decoration: none

  .form
    display: grid
    grid-template-rows: 20vh 1fr 10vh 20vh
    border: 1px dotted #000
    padding: 10px
    text-align: center
    background: url(http://vue-work-life-balance-development.s3-website.eu-central-1.amazonaws.com/img/night-background.cde2c8b0.svg)
    transform: translateZ(0)
    background-size: cover
    backface-visibility: hidden

    @include element('header')
      // background: yellow
      /* CSS declarations for `.block__element` */
      // FIXME: Remove dublications
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column

      h1
        // color: #eee
      // font-size: 2rem

    @include element('content')
      // FIXME: Remove dublications
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column

      input
        display: block
        box-sizing: border-box
        width: 90%
        height: 10vh
        margin: 10px 0
        text-align: center
        font-size: 1.2rem
        background: #46608f
        border: none
        color: white
        border-radius: 5px

    @include element('actions')
      // FIXME: Remove dublications
      display: flex
      align-items: center
      justify-content: space-around
      flex-direction: column

      button
        display: block
        box-sizing: border-box
        width: 90%
        height: 10vh
        margin: 10px 0
        font-size: 1rem
        background: #213345
        color: white
        border: none
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
        height: 50%
        margin: 10px 0
        font-size: 1rem
        background: #213345
        color: white
        border: none
        border-radius: 5px
</style>
