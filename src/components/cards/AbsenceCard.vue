<template>
  <div class="c-responsive">
    <div class="c-header flex flex-around flex-column blue">
      <i class="fa fa-calendar fa-5x" aria-hidden="true"></i>
      <div class="flex flex-center height-20">
        <div class="font-2" v-on:click="navigate('page-1')">
          <i class="fa fa-area-chart" aria-hidden="true"></i>
        </div>
        <div class="font-2" v-on:click="navigate('page-2')">
          <i class="fa fa-clock-o" aria-hidden="true"></i>
        </div>
        <div class="font-2">
          <i class="fa fa-sliders" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <div class="c-body flex flex-between flex-column">
      <div class="flex flex-center v-height-15">
        <!-- <ul class="flex flex-between">
          <li><i class="fa fa-chevron-left" aria-hidden="true"></i></li>
          <li class="active">March 2018</li>
          <li><i class="fa fa-chevron-right" aria-hidden="true"></i></li>
        </ul> -->
        <month-picker class="uppercase" v-on:date-change="setDate"></month-picker>
      </div>

      <!-- <p class="date-selector height-10">
        << Tu, 12 March >>
      </p> -->

      <div class="flex flex-around">
        <calendar class="width-90" :date="currentDate" :records="records"></calendar>
      </div>

      <div class="flex flex-center v-height-15">
        <div>
          <i class="fa fa-gift" aria-hidden="true"></i>
          <button>Holidays</button>
        </div>
        <div>
          <i class="fa fa-heartbeat" aria-hidden="true"></i>
          <button>Sickness</button>
        </div>
        <div>
          <i class="fa fa-plane" aria-hidden="true"></i>
          <button>Vacation</button>
        </div>
      </div>
    </div>

    <div class="c-sidebar flex flex-between flex-column blue">
      <div class="flex flex-center v-height-15">
        March 2018
      </div>

      <div class="flex flex-center flex-column">
        <i class="fa fa-calendar fa-6x" aria-hidden="true"></i>
      </div>
      <!-- <div class=""><span class="font-2">TOTAL: +2.5</span></div> -->
      <div class="flex flex-center height-15">
        <div class="font-2" v-on:click="navigate('page-1')">
          <i class="fa fa-area-chart" aria-hidden="true"></i>
        </div>
        <div class="font-2" v-on:click="navigate('page-2')">
          <i class="fa fa-clock-o" aria-hidden="true"></i>
        </div>
        <div class="font-2">
          <i class="fa fa-sliders" aria-hidden="true"></i>
        </div>
      </div>
    </div>


    <div class="c-footer flex flex-around">
      <button class="font-2">SAVE / UPDATE</button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex"
  import MonthPicker from "./MonthPicker"
  import Calendar from "./Calendar"

  export default {
    name: "Index",
    components: {
      MonthPicker,
      Calendar
    },
    data() {
      return {
        date: new Date()
      }
    },

    computed: {
      ...mapState(["currentDate", "records"]),
    },

    methods: {
      ...mapActions([
        "navigate" // map `this.increment()` to `this.$store.dispatch('increment')`
      ]),

      setDate(date) {
        this.$store.dispatch("setCurrentDate", date)
        // this.date = date
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '~@/assets/_variables.sass'
  .chart, .info
    width: 100%
    height: 50%

  .flex
    div
      width: 100%
      text-align: center

  ul
    padding: 0
    margin: 0
    li
      list-style: none
      padding: 1em

      &.active
        color: $green

  .c-responsive
    height: 100%
    width: 100%
    display: grid
    grid-template-areas: "c-header c-header"  "c-body c-body" "c-footer c-footer"

    // NOTE: Broken on safari
    // grid-template-columns: 1fr auto
    // grid-template-rows: 25% auto 10%

    // NOTE: Works on safari
    grid-template-columns: 100%
    grid-template-rows: 30% 60% 10%

    button
      font-weight: bold
      width: 100%
      height: 100%
      background: #fff
      border: none
      outline: none

  .c-header
    grid-area: c-header
    // background-color: $green
    overflow: auto
    color: white

  .c-body
    grid-area: c-body
    background-color: white

  .c-sidebar
    grid-area: c-sidebar
    // background-color: $green
    color: white
    overflow: hidden
    overflow: auto
    width: 0px

    // transition: width 1s

  .c-footer
    border-top: 0.1rem dotted #ccc
    border-bottom: 0.1rem dotted #ccc
    grid-area: c-footer
    background-color: white
    color: black

  @media (min-width: 40em)
    .c-responsive
      grid-template-areas: "c-header c-header"  "c-body c-sidebar" "c-footer c-sidebar"

      grid-template-columns: auto 30%
      grid-template-rows: 0 1fr 15%

      .c-body
        width: 100%

      .c-sidebar
        width: 100%
</style>
