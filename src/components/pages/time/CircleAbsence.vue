<template>
  <div class="circle-absence curtain" :class="{ open: open }">
    <div class="curtain-top flex flex-center">
      <div class="font-8">{{ duration }}<small>h</small></div>
    </div>

    <div class="curtain-middle flex flex-center">
      <div class="switch-item left" v-on:click="select(1)" :class="{ selected: selected == 1 }">
        <i class="fa fa-plane text-green" aria-hidden="true"></i>
      </div>
      <div class="switch-item center" v-on:click="select(2)" :class="{ selected: selected == 2 }">
        <i class="fa fa-heartbeat text-amber" aria-hidden="true"></i>
      </div>
      <div class="switch-item right" v-on:click="select(3)" :class="{ selected: selected == 3 }">
        <i class="fa fa-gift text-tomato" aria-hidden="true"></i>
      </div>
    </div>

    <div class="curtain-bottom flex flex-center flex-column">
      {{ start }} - {{ end }}
      <div>
        Week #{{currentWeekNumber}}
      </div>

    </div>


  </div>
</template>

<script>
  import { mapGetters } from "vuex"

  export default {
    name: 'CircleAbsence',
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
      },

      initForm: {
        type: Object,
        default: () => {}
      }
    },

    computed: {
      ...mapGetters(['currentWeekNumber']),

      start() {
        return this.initForm.start
      },

      end() {
        return this.initForm.end
      },

      duration() {
        return this.initForm.duration || 'N/A'
      }
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
    border-radius: 50%
    display: flex
    justify-content: space-around
    align-items: center
    flex-direction: row
    overflow: hidden

    width: 100%
    height: 100%

    text-align: center

    .switch-item
      width: 100%
      height: 60%
      background: #eee
      vertical-align: center
      display: flex
      justify-content: center
      align-items: center
      transition: flex .3s ease-out
      will-change: flex

      flex: 1

      &.selected
        flex: 3
        background: #42b983
        .fa
          color: #fff
          font-weight: bold
          font-size: 200%

</style>

<style lang="sass" scoped>
  .curtain
    position: relative
    overflow: hidden
    height: 100%

    &.open
      .curtain-top
        transform: translateY(-100%)

      .curtain-bottom
        transform: translateY(100%)

    .curtain-top, .curtain-bottom
      position: absolute
      z-index: 1
      transition: transform 0.3s linear
      will-change: transform
      height: 50%
      width: 100%
      z-index: 1
      background: #fff

    .curtain-top
      top: 0
      box-shadow: inset 0 -1px 0 #eee


    .curtain-middle
      z-index: 0
      height: 100%
      width: 100%
      // height: auto
      // opacity: 0.5
      // pointer-events: none
      // transition: opacity 0.3s linear
      // will-change: opacity

    .curtain-bottom
      bottom: 0
</style>
