<template>
  <div id="app" :class="{ standalone: standalone }">
    <router-view class="content"></router-view>
  </div>
</template>

<script>
  import { mapState } from "vuex"

  export default {
    name: "App",

    computed: {
      ...mapState(["standalone"])
    },

    mounted() {
      setTimeout(function () {
        window.scrollTo(0, 1)
      }, 1000)


      // https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications
      // https://developers.google.com/web/updates/2016/09/navigator-share
      if (navigator.share) {
        navigator.share({
          title: 'Web Fundamentals',
          text: 'Check out Web Fundamentals — it rocks!',
          url: 'https://developers.google.com/web',
        }).then(() => console.log('Successful share')).catch((error) => console.log('Error sharing', error))
      }

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
  #app
    height: 100%
    width: 100%
  //
  // #app.standalone
  //   height: 100%
  //   height: 100%
  //   background: red



  @media (min-width: 20em)
    #app
      height: 100%
      width: 100%

  @media (min-width: 30em)
    /* smartphones, Android phones, landscape iPhone
    #app
      width: 90%

  @media (min-width: 40em) and (orientation: landscape)
    /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android)
    #app
      height: 80%
      width: 90%

  @media (min-width: 40em) and (orientation: landscape)
    #app
      height: 100%
      width: 100%

  @media (min-width: 50em) and (orientation: landscape)
    /* tablet, landscape iPad, lo-res laptops ands desktops
    #app
      height: 80%
      width: 80%

  @media (min-width: 64em) and (orientation: landscape)
    /* big landscape tablets, laptops, and desktops
    #app
      height: 80%
      width: 60%

  @media (min-width: 80em) and (orientation: landscape)
    /* hi-res laptops and desktops
    #app
      height: 80%
      width: 60%

</style>
