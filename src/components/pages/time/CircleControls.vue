<template>
  <div id="circle-menu" :class="{ loading: fetching }">
    <svg height="1" width="1">
      <defs>
        <clipPath id="sector" clipPathUnits="objectBoundingBox">
          <path fill="none" stroke="#111" stroke-width="1" class="sector" :d="coordinates"></path>
        </clipPath>
      </defs>
    </svg>

    <ul id="outside" :class="{ open: open }">
      <li class="slice-1 green" v-on:click="home">
        <!-- <a v-on:click="home"> -->
          <i class="fas fa-home font-5"></i>
        <!-- </a> -->
      </li>

      <li class="slice-2"></li>

      <li class="slice-3 amber" v-on:click="emit('absence')">
        <!-- <a> -->
        <i class="fas fa-bars font-5"></i>
        <!-- </a> -->
      </li>

      <li class="slice-4"></li>

      <li class="slice-5 tomato" v-on:click="emit('delete')">
        <!-- <a> -->
          <i class="fas fa-trash font-5"></i>
        <!-- </a> -->
      </li>

      <li class="slice-6"></li>
    </ul>

    <div id="inside" :class="{ loading: fetching }">
      <slot class="visible" name="inside">&nbsp;</slot>
    </div>

  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from "vuex"

  export default {
    name: "CircleMenu",

    data() {
      return {
        loading: false,
        timeout: null,
        open: false,
        close: false,
        width: 1,
        height: 1,
        slices: 6
      }
    },

    props: {
      form: {
        type: Object
      },

      duration: {
        type: Number
      }
    },

    mounted() {
      this.timeout = setTimeout(() => {
        this.open = true
      }, 500)
    },

    watch: {
      currentFomatedDate() {
        this.toggle()
      }
    },

    computed: {
      ...mapGetters(['currentFomatedDate', 'currentWeekNumber', 'currentRecord']),
      ...mapState(['fetching']),

      angle() {
        return (360 / this.slices)
      },

      coordinates() {
        const c = `M0.5,0.5 l0.5,0 A0.5,0.5 0 0,0 ${this.cartesianCoordinates.x},${this.cartesianCoordinates.y} z`
        console.log(c)
        return c
      },

      cartesianCoordinates() {
        //polar to cartesian coordinates conversion
        //knowing the value of your angle in degrees..
        //get value of the angle in radians
        console.log(this.angle)
        let angleInDegrees = this.angle
        let angleInRadians = -angleInDegrees * Math.PI / 180.0
        let centerX = this.height / 2
        let centerY = this.height / 2
        let radius = this.height / 2
        let x = centerX + radius * Math.cos(angleInRadians)
        let y = centerY + radius * Math.sin(angleInRadians)

        console.log(x,y)
        return {x, y}
      }

    },

    methods: {
      ...mapActions(["setDateAndFetch"]),

      home() {
        this.setDateAndFetch(new Date())
      },

      toggleLoading() {
        this.loading = !this.loading
      },

      toggle() {
        clearTimeout(this.timeout)
        // this.open = !this.open
        this.open = false

        this.timeout = setTimeout(() => {
          this.open = true
        }, 1000)
      },

      emit(e) {
        this.$emit(e)
      }
    }
  }
</script>

<style lang="sass">
  $base: #2b3c58

  #circle-menu
    border-radius: 50%
    position: relative

  #outside
    padding: 0
    height: 0
    list-style: none
    position: relative
    margin: auto
    color: #fff
    // transition: transform .25s ease
    // transform: scale(0.5)
    width: 60%
    padding-top: 60%

    border-radius: 50%

    // background-clip: padding-box
    // box-shadow: 0 0 0 6px lighten($base, 50%)
    // border: 6px solid lighten($base, 40%)
    // box-sizing: border-box


    &.loading
      #inside
        // transform: scale(1.5)
        // transition: transform .25s ease

        div.hidden
          display: inline

        div:not(.hidden)
          display: none

    // li
    //   // transition: transform 0.3s, opacity 0.3s linear
    //   opacity: 1
    //
    // &:not(.open)
    //   li
    //     opacity: 0
    //     transform: rotate(-30deg)


    li
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      clip-path: url(#sector)
      will-change: transform
      overflow: hidden

      // -webkit-clip-path: url(#sector)
      // mask: url(#sector)
      a
        display: inline-block
        width: 100%
        height: 100%
        will-change: transform
        transform: rotate(30deg)
        background: red

      i
        position: relative
        top: 25%
        left: 35%
        transform: rotate(58deg)
        will-change: transform

      &.green:hover
        background-color: #42b983

      &.amber:hover
         background-color: #FFBF00

      &.tomato:hover
         background-color: tomato

  .slice-1
    background-color: lighten($base, 5%)
    transform: rotate(-60deg)

  .slice-2
    background-color: lighten($base, 10%)
    transform: rotate(0deg)

  .slice-3
    background-color: lighten($base, 5%)
    transform: rotate(60deg)

  .slice-4
    background-color: lighten($base, 10%)
    transform: rotate(120deg)

  .slice-5
    background-color: lighten($base, 5%)
    transform: rotate(180deg)

  .slice-6
    background-color: lighten($base, 10%)
    transform: rotate(240deg)

  #inside
    position: absolute
    z-index: 1
    background: white
    display: flex
    justify-content: center
    align-items: center
    overflow: hidden
    border-radius: 50%

    // box-shadow: inset 0 0 0 6px lighten($base, 50%)
    border: 6px solid lighten($base, 70%)
    box-sizing: border-box

    width: 39%
    height: 65%

    &.loading
      box-sizing: content-box
      animation: pulse 1.5s infinite
      border: 2.5rem solid #3c537a
      color: #fff

</style>

<style lang="sass">


</style>
