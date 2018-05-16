<template>
  <div class="page container">
    <br>
    <button style="padding: 20px 10rem" v-on:click.stop.prevent="toggle">Toggle</button>
    <br>    <br>

    <div class="circle" :class="{ open: open }">


      <div class="circle-top circle-layer-1">
        <div class="circle-top-visible">
          TOP - VISIBLE
          <h1>8<small>(h)</small></h1>
        </div>

        <div class="circle-top-hidden">
          TOP - HIDDEN
        </div>
      </div>

      <div class="circle-middle circle-layer-1">
        <div class="left circle-layer-2" v-on:click="select(1)" :class="{ selected: selected == 1 }">
          LEFT
        </div>
        <div class="center circle-layer-2" v-on:click="select(2)" :class="{ selected: selected == 2 }">
          CENTER
        </div>
        <div class="right circle-layer-2" v-on:click="select(3)" :class="{ selected: selected == 3 }">
          RIGHT
        </div>
      </div>

      <div class="circle-bottom circle-layer-1">
        BOTTOM
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Playground',
    components: {
    },

    data() {
      return {
        open: true,
        selected: null
      }
    },

    computed: {
    },

    methods: {
      toggle() {
        this.open = !this.open
        setTimeout(() => {
          this.selected = null
        }, 350)
      },

      select(number) {
        this.selected = number
      }
    }
  }
</script>

<style lang="sass">
  .circle
    width: 20rem
    height: 20rem
    border-radius: 50%
    border: 0.4rem solid black
    display: flex
    justify-content: space-around
    align-items: center
    flex-direction: column
    background: rgba(52, 59, 62, .9)
    overflow: hidden

    text-align: center


    .circle-layer-1
      transition: flex .3s ease-out
      -webkit-backface-visibility: hidden

    &.open
      .circle-middle
        flex: 4

      .circle-top-visible
        flex: 0
        background: orange

      .circle-top-hidden
        flex: 1
        background: orange

  .circle-top
    flex: 1
    background: orange
    width: 100%

    display: flex
    flex-direction: column
    // justify-content: center
    align-items: center

    .circle-top-hidden, .circle-top-visible
      overflow: hidden
      background: green

      display: flex
      flex-direction: column
      align-items: center
      width: 100%
      justify-content: center

    .circle-top-visible
      flex: 1

    .circle-top-hidden
      flex: 0

  .circle-middle
    flex: 0
    overflow: hidden
    background: red
    width: 100%

    display:  flex
    justify-content: center
    align-items: center

    .circle-layer-2
      width: 100%
      height: 50%
      background: #eee
      vertical-align: center
      display: flex
      justify-content: center
      align-items: center
      transition: flex .3s ease-out
      // will-change: flex
      // font-size: 100%
      // transform: translateZ(0)

      -webkit-backface-visibility: hidden
      -webkit-transform: translateZ(0) scale(1.0, 1.0)

      flex: 1

      &.selected
        flex: 5
        background: blue
        // font-weight: bold
        color: #fff
        // font-size: 120%

  .circle-bottom
    flex: 1
    background: yellow
    width: 100%


</style>
