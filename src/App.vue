<template>
  <div id="app">
    <router-view class="content"></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    mounted() {
      setTimeout(function () {
        window.scrollTo(0, 1)
      }, 1000)

      window.addEventListener("online", () => {
        console.log("online")
        this.$store.dispatch("online", navigator.onLine)
      })

      window.addEventListener("offline", () => {
        console.log("offline")
        this.$store.dispatch("online", navigator.onLine)
      })
    }
  }
</script>

<style lang="sass" scoped>
  @media (min-width: 20em)
    #app
      grid-template-rows: 100vh
      grid-template-columns: 100vw


  // @media (min-width: 30em)
  //   /* smartphones, Android phones, landscape iPhone
  //   #app
  //     grid-template-columns: 90vw

  @media (min-width: 40em)
    /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android)
    #app
      grid-template-rows: 80vh
      grid-template-columns: 90vw

  @media (min-width: 40em) and (orientation: landscape)
    #app
      grid-template-rows: 100vh
      grid-template-columns: 100vw

  @media (min-width: 50em)
    /* tablet, landscape iPad, lo-res laptops ands desktops
    #app
      grid-template-rows: 80vh
      grid-template-columns: 80vw

  @media (min-width: 64em)
    /* big landscape tablets, laptops, and desktops
    #app
      grid-template-rows: 80vh
      grid-template-columns: 60vw

  @media (min-width: 80em)
    /* hi-res laptops and desktops
    #app
      grid-template-rows: 80vh
      grid-template-columns: 60vw

</style>
