<template>
  <div id="app" v-on:dblclick="toggleFullScreen">
    <div class="header">
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
          <!-- <i aria-hidden="true" v-on:click="logout" class="fa fa-user"></i> -->
          <i v-if="authenticated()" class="fa fa-sign-out" v-on:click="logout"></i>


          <!-- <i aria-hidden="true" v-on:click="toggleFullScreen" class="fa fa-window-maximize"></i> -->
        </div>
        <!-- <i aria-hidden="true" class="fa fa-camera-retro"></i> -->
        <!-- <i aria-hidden="true" class="fa fa-smile-o"></i> -->
      </div>
    </div>

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
