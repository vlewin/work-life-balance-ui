<template>
  <div class="circle-absence" :class="{ open: open }">
    <div class="circle-top circle-layer-1">
      <div class="circle-top-visible">
        <h1>8<small>(h)</small></h1>
      </div>

      <div class="circle-top-hidden">
        <small>ABSENCE</small>
      </div>
    </div>

    <div class="circle-middle circle-layer-1">
      <div class="left circle-layer-2" v-on:click="select(1)" :class="{ selected: selected == 1 }">
        <i class="fa fa-plane text-green" aria-hidden="true"></i>
      </div>
      <div class="center circle-layer-2" v-on:click="select(2)" :class="{ selected: selected == 2 }">
        <i class="fa fa-heartbeat text-amber" aria-hidden="true"></i>
      </div>
      <div class="right circle-layer-2" v-on:click="select(3)" :class="{ selected: selected == 3 }">
        <i class="fa fa-gift text-tomato" aria-hidden="true"></i>
      </div>
    </div>

    <div class="circle-bottom circle-layer-1">
      <div class="circle-bottom-visible">
        <small>08:00 - 16:30</small>
        <small>&num; 20</small>
      </div>

      <div class="circle-bottom-hidden">
        <small v-on:click.stop.prevent="toggle">CLOSE</small>
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
        selected: null
      }
    },

    props: {
      open: {
        type: Boolean,
        default: false
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
  .circle-absence
    // width: 16rem
    // height: 16rem
    border-radius: 50%
    // border: 0.4rem solid black
    display: flex
    justify-content: space-around
    align-items: center
    flex-direction: column
    overflow: hidden

    text-align: center


    .circle-layer-1
      transition: flex .3s ease-out
      -webkit-backface-visibility: hidden

    &.open
      .circle-middle
        flex: 2

      .circle-top-visible
        flex: 0
        opacity: 0
        // background: orange

      .circle-top-hidden
        flex: 1
        opacity: 1

        // background: orange


      .circle-bottom-visible
        flex: 0
        opacity: 0
        // background: orange

      .circle-bottom-hidden
        flex: 1
        opacity: 1
        // background: orange

  .circle-top
    flex: 1
    width: 100%

    display: flex
    flex-direction: column
    // justify-content: center
    align-items: center

    .circle-top-hidden, .circle-top-visible
      overflow: hidden

      display: flex
      flex-direction: column
      align-items: center
      width: 100%
      justify-content: center
      transition: opacity .3s ease-out

    .circle-top-visible
      flex: 1
      opacity: 1

    .circle-top-hidden
      flex: 0
      opacity: 0


  .circle-middle
    flex: 0
    overflow: hidden
    background: #eee
    width: 100%

    display:  flex
    justify-content: center
    align-items: center

    .circle-layer-2
      width: 100%
      height: 80%
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
        flex: 4
        background: #42b983
        .fa
          color: #fff
          font-weight: bold
        // font-size: 120%

  .circle-bottom
    border-top: 1px solid #eee
    flex: 1

    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    justify-content: center
    overflow: hidden

    .circle-bottom-hidden, .circle-bottom-visible
      overflow: hidden

      display: flex
      flex-direction: column
      align-items: center
      width: 100%
      justify-content: center
      transition: opacity .3s ease-out


    .circle-bottom-visible
      flex: 1
      opacity: 1

    .circle-bottom-hidden
      flex: 0
      opacity: 0

</style>
