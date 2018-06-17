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


      const el = document.body

      if (this.standalone) {
        el.classList.add('standalone')
      } else {
        el.classList.add('default')
      }

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
    overflow: hidden

  //
  // #app.standalone
  //   height: 100%
  //   height: 100%
  //   background: red



  @media (min-width: 50em)
    /* tablet, landscape iPad, lo-res laptops ands desktops
    #app
      height: 70%
      width: 90%
      border-radius: 5px
      box-shadow: 0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22)

  @media (min-width: 60em)
    /* big landscape tablets, laptops, and desktops
    #app
      height: 80%
      width: 80%

  @media (min-width: 80em)
    /* hi-res laptops and desktops
    #app
      height: 80%
      width: 60%

</style>
