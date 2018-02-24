<template>
  <div id="login-form" class="flex flex-column">
    <div id="login-form-header" class="flex flex-column flex-center width-100">
      <b>SIGN IN</b>
      <small>Don't have an account? - Sign Up</small>
      <!-- <h4>SIGN UP</h4>
      <small>Login to existing account</small> -->
    </div>
    <div id="login-form-body" class="flex flex-column flex-center width-100">
      USERNAME
      PASSWORD

      <p>
        Forgot your password?
      </p>
    </div>
    <div id="login-form-footer" class="flex flex-column flex-center width-100 primary text-white">
      SIGN IN / SIGN UP
    </div>
  </div>
</template>

<script>
import LoginForm from "./LoginForm";

export default {
  name: "Index",
  components: {
    LoginForm
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
