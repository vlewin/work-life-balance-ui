<template>
  <div class="white flex flex-center flex-column blue">
    <i class="fa fa-spinner fa-large fa-10x spin text-white"></i>
    <h1 class="text-white">Please wait ...</h1>
  </div>
</template>

<script>
import AuthService from "../main"

export default {
  name: "Callback",
  created() {
    console.log('Handle auth in callback')
    AuthService.handleCallback()
  }
}
</script>
