<template>
  <div id="login-form" class="flex flex-column">
    <vertical-slider class="login-form-body">
      <div slot="top" class="">

        <h4>SIGN UP</h4>
        <small>Login to existing account</small>

        USERNAME
        PASSWORD
        <p>
          Forgot your password?
        </p>
      </div>

      <div slot="middle" class="">
        <h4>SIGN IN</h4>
        <small>Don't have an account? - Sign Up</small>
        USERNAME
        PASSWORD
        <button v-on:click="login">LOGIN</button>
        <p>
          Forgot your password?
        </p>
      </div>

      <div slot="bottom">
        Forgot password?
      </div>

    </vertical-slider>
  </div>
</template>

<script>
import AuthService from "../services/authentication"
import VerticalSlider from "./shared/VerticalSlider.vue"
import auth from "../main"

export default {
  name: "Authentication",
  components: { VerticalSlider },

  data() {
    return {}
  },

  mounted() {
    console.log("CREATED")
  },

  computed: {},

  methods: {
    login() {
      auth.authorize()
    }
  }
}
</script>

<style lang="sass">
  #login-form
    justify-content: center
    align-items: center
    background: #fff

  #login-form-header
    height: 20%
    width: 100%
    background: #eee

  #login-form-body
    height: 80%

  #login-form-footer
    height: 20%
</style>
