<template>
  <card hcolor="blue">
    <i slot="c-header-icon" class="fa fa-calendar fa-5x" aria-hidden="true"></i>
    <month-picker slot="c-body" class="flex flex-center uppercase" v-on:date-change="setDate"></month-picker>

    <div slot="c-body" class="flex flex-between container">
      <div class="flex flex-center content">
        <calendar class="width-90" :date="currentDate" :records="records" v-on:changed="setSelected"></calendar>
      </div>
      <simple-switch slot="c-footer" class="info animated" :class="{ horizontal: isLandscape }" :active="!!selected.length">
        <div class="flex flex-center height-100" slot="up">
          <div class="flex flex-center flex-column flex-item">
            <i class="fa fa-plane text-green" aria-hidden="true"></i>
            VACATION: 0
          </div>
          <div class="flex flex-center flex-column flex-item">
            <i class="fa fa-heartbeat text-amber" aria-hidden="true"></i>
            SICKNESS: 0
          </div>
          <div class="flex flex-center flex-column flex-item">
            <i class="fa fa-gift text-tomato" aria-hidden="true"></i>
            HOLIDAY: 0
          </div>
        </div>

        <slider slot="down" class="text-white" :class="{ horizontal: isLandscape }" v-on:changed="setReason">
          <div slot="left">
            <i class="fa fa-plane"></i>
            <div>
              VACATION
            </div>

          </div>
          <div slot="center">
            <i class="fa fa-heartbeat"></i>
            <div>
              SICKNESS
            </div>

          </div>
          <div slot="right">
            <i class="fa fa-gift" aria-hidden="true"></i>
            <div>

            </div>
            HOLIDAY
          </div>
        </slider>
      </simple-switch>

    </div>


    <template slot="c-sidebar-title">TEXT</template>
    <i slot="c-sidebar-icon" class="fa fa-calendar fa-5x" aria-hidden="true"></i>

    <template slot="c-footer">
      <button>SAVE</button>
      <button>DELETE</button>
    </template>
  </card>
</template>

<script>
  import { mapState, mapActions } from "vuex"
  import Card from "./ResponsiveCard"
  import MonthPicker from "./MonthPicker"
  import Calendar from "./Calendar"
  import SimpleSwitch from "./SimpleSwitch"
  import Slider from "./Slider"

  export default {
    name: "AbsenceCard",
    components: {
      Card,
      MonthPicker,
      Calendar,
      SimpleSwitch,
      Slider
    },

    data() {
      return {
        date: new Date(),
        reason: null,
        selected: [],
        active: false,
        // orientation: window.screen.orientation.type,
        sliderMap: [
          "vacation",
          "sickness",
          "holiday"
        ]
      }
    },

    // created() {
    //   window.addEventListener("orientationchange", () => {
    //     console.log(screen.orientation.type)
    //     this.orientation = window.screen.orientation.type
    //   });
    // },
    //
    // beforeDestroy() {
    //   window.removeEventListener("orientationchange", () => {
    //     console.log(screen.orientation.type)
    //     this.orientation = window.screen.orientation.type
    //   });
    // },

    computed: {
      ...mapState(["currentDate", "records"]),
      isLandscape() {
        console.log(window.screen.width)
        return window.screen.width > 600 && (window.screen.width > window.screen.height)
        // return this.orientation.includes('landscape')
      }
    },

    methods: {
      ...mapActions([
        "navigate" // map `this.increment()` to `this.$store.dispatch('increment')`
      ]),

      setDate(date) {
        this.$store.dispatch("setCurrentDate", date)
        // this.date = date
      },

      setSelected(dates) {
        this.selected = dates
      },

      setReason(index) {
        console.log(index)
        console.log(index, this.sliderMap[index])
        this.reason = this.sliderMap[index]
      }
    }
  }
</script>

<style lang="sass" scoped>
  .container
    height: 100%

  @media screen and (orientation: portrait)
    .container
      flex-direction: column

    .content
      height: 80%

    .info
      height: 10vh
      width: 100%

  @media screen and (orientation: landscape)
    .container
      margin: auto

    .content
      width: 75%

    .info
      // height: 70vh
      flex-direction: column
      width: 25%

      .flex
        height: 100%
        flex-direction: column

      .flex-item
        height: calc(100% / 3)
</style>
