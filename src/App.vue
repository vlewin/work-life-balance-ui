<template>
  <div id="app">
    <!-- <div class="header" v-on:dblclick="toggleFullScreen">
      <div class="header-left">
        <h1 class="day">{{ day }}</h1>
        <div class="date">
          <span>{{ month }} {{ year }}</span>
          <span>{{ weekday }}</span>
        </div>
      </div>
      <div class="header-right">
        <div class="time">
          {{ now.hh }}
          <span class="blink">:</span>
          {{ now.mm }}
          &nbsp;
          <i v-if="authenticated()" class="fa fa-sign-out" v-on:click="logout"></i>
        </div>
      </div>
    </div> -->
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import AuthService from "./main"

export default {
  name: "App",
  data() {
    return {
      date: new Date(),
      time: new Date()
    }
  },

  mounted() {
    window.addEventListener("online", () => {
      console.log("online")
      this.$store.dispatch("online", navigator.onLine)
    })
    window.addEventListener("offline", () => {
      console.log("offline")
      this.$store.dispatch("online", navigator.onLine)
    })
  },

  computed: {
    now() {
      return {
        hh: this.time
          .getHours()
          .toString()
          .padStart(2, "0"),
        mm: this.time
          .getMinutes()
          .toString()
          .padStart(2, "0")
      }
    },

    selected() {
      return this.$store.state.currentDate
    },

    day() {
      return new Date(this.selected)
        .getDate()
        .toString()
        .padStart(2, "0")
    },

    weekday() {
      return new Date(this.selected).toLocaleString("en-US", {
        weekday: "long"
      })
    },

    month() {
      return new Date(this.selected).toLocaleString("en-US", { month: "long" })
    },

    year() {
      return new Date(this.selected).getFullYear()
    }
  },

  created() {
    document.body.webkitRequestFullScreen()
    // window.history.go(-1);
    // var metaViewport = document.querySelector("meta[name=viewport]");
    // metaViewport.setAttribute("width", "380");
    setInterval(() => {
      this.time = new Date()
    }, 1000)
  },

  methods: {
    // FIXME: Move to store getters
    authenticated() {
      return AuthService.isAuthenticated()
    },

    logout() {
      AuthService.logout()
    },

    toggleFullScreen() {
      var doc = window.document
      var docEl = doc.documentElement

      var requestFullScreen =
        docEl.requestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.msRequestFullscreen
      var cancelFullScreen =
        doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen

      if (
        !doc.fullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.msFullscreenElement
      ) {
        requestFullScreen.call(docEl)
      } else {
        cancelFullScreen.call(doc)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  i.fa-times-circle
    margin-right: 0.2em

  .fade-enter-active, .fade-leave-active
    transition-property: opacity
    transition-duration: 0.25s

  .fade-enter-active
    transition-delay: 0.25s


  .fade-enter, .fade-leave-active
    opacity: 0

  .fade-enter-active, .fade-leave-active
    transition: opacity .5s ease

  .fade-enter, .fade-leave-active
    opacity: 0

  .child-view
    position: absolute
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1)

  .slide-left-enter, .slide-right-leave-active
    opacity: 0
    -webkit-transform: translate(30px, 0)
    transform: translate(30px, 0)

  .slide-left-leave-active, .slide-right-enter
    opacity: 0
    -webkit-transform: translate(-30px, 0)
    transform: translate(-30px, 0)
</style>
