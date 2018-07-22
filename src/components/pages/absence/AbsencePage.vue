<template>
  <card hcolor="blue">
    <i slot="c-header-icon" class="fa fa-calendar-plus fa-5x" aria-hidden="true"></i>
    <template slot="c-header-title">
      {{ currentDate.toLocaleDateString("de-DE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
    </template>


    <div slot="c-body" class="curtain flex" :class="{ open: mode }">
      <div class="curtain-top flex flex-center">
        <!-- <b>TRACK YOUR ABSENCE</b> -->
        <p>
          Click <b>ADD</b> or <b>REMOVE</b> to proceed.
          <br />WORKAROUND: Hide dates with presence records, introduce partial type
        </p>
      </div>

      <div class="curtain-middle flex flex-between flex-column height-100">
        <month-picker class="flex flex-center uppercase" v-on:date-change="setDateAndFetch"></month-picker>

        <div class="flex flex-between container">
          <div class="flex flex-center content">
            <calendar class="width-90" :date="currentDate" :mode="mode" v-on:changed="setSelected"></calendar>
          </div>

          <simple-switch class="info animated" :class="{ horizontal: isLandscape }" :active="mode === 'add' && !!selected.length">
            <balance class="flex flex-center height-100" slot="up"></balance>

            <simple-slider slot="down" class="text-white" :class="{ horizontal: isLandscape }" ref="absenceSwitch" v-on:changed="setReason">
              <div slot="left">
                <i class="fa fa-plane"></i>
                <div>VACATION</div>
              </div>
              <div slot="center">
                <i class="fas fa-briefcase-medical"></i>
                <div>SICKNESS</div>
              </div>
              <!-- <div slot="right">
                <i class="fa fa-gift" aria-hidden="true"></i>
                <div>HOLIDAY</div>
              </div> -->
            </simple-slider>
          </simple-switch>
        </div>
      </div>

      <div class="curtain-bottom flex flex-center">
      </div>
    </div>

    <template slot="c-sidebar-title">TEXT</template>
    <i slot="c-sidebar-icon" class="fa fa-calendar-plus fa-6x" aria-hidden="true"></i>

    <template slot="c-footer" >
      <!-- FIXME: Add horizontal switch on a second level -->
      <simple-switch slot="up" class="vertical animated" :active="!!mode && valid">
        <button-group slot="up" class="vertical animated" :buttons="buttons" v-on:changed="setMode"></button-group>
        <template v-if="mode === 'add'">
          <simple-switch slot="down" class="vertical animated" :active="loading">
            <button slot="up" class="text-white primary width-50" v-on:click="save">SAVE</button>
            <button slot="up" class="text-white grey-5 width-50" v-on:click="reset">CANCEL</button>

            <button slot="down" class="text-white primary width-100 disabled">Please wait!</button>
          </simple-switch>
        </template>

        <template v-else-if="mode === 'remove'">
          <simple-switch slot="down" class="vertical animated" :active="loading">
            <button slot="up" class="text-white tomato width-50" v-on:click="remove">REMOVE</button>
            <button slot="up" class="text-white grey-5 width-50" v-on:click="reset">CANCEL</button>

            <button slot="down" class="text-white primary width-100 disabled">Please wait!</button>
          </simple-switch>
        </template>
      </simple-switch>
    </template>

  </card>
</template>

<script>
  import { mapState, mapActions, mapGetters } from "vuex"

  import Calendar from "./Calendar"
  import Card from "../../shared/ResponsiveCard"
  import MonthPicker from "../../shared/MonthPicker"
  import SimpleSwitch from "../../shared/SimpleSwitch"
  import SimpleSlider from "../../shared/SimpleSlider"
  import ButtonGroup from "../../shared/ButtonGroup"
  import Balance from "../../shared/Balance"


  export default {
    name: "AbsenceCard",
    components: {
      Card,
      MonthPicker,
      Calendar,
      SimpleSwitch,
      SimpleSlider,
      ButtonGroup,
      Balance
    },

    data() {
      return {
        buttons: [{ name: 'add', color: 'blue', focused: false }, { name: 'remove', color: 'tomato', focused: false }],
        mode: null,
        date: new Date(),
        reason: null,
        selected: [],
        active: false,
        sliderMap: [
          "vacation",
          "sickness",
          "holiday"
        ]
      }
    },

    computed: {
      ...mapGetters(['currentMonthNumber']),
      ...mapState(['currentDate', 'loading', 'orientation', 'balance', 'records']),

      isLandscape() {
        return this.orientation === 'landscape'
      },

      deleteMode() {
        return this.selected.some((d) => this.records[d.toDateString()])
      },

      valid() {
        if(this.mode === 'add') {
          return !!(this.selected.length && this.reason)
        } else {
          return !!this.selected.length
        }
      },

      data() {
        return this.selected.map((date) => {
          console.log(this.reason)
          return {
            timestamp: date.getTime(),
            date: date.toDateString(),
            type: 'absence',
            reason: this.reason
          }
        })
      },

      holidayCount() {
        return '4'
      }
    },

    methods: {
      ...mapActions(["setDateAndFetch"]),

      setMode(mode) {
        console.log('setMode', mode)
        this.mode = mode

        if(!mode) {
          console.log('Reset selected')
          this.reset()
        }
      },

      setSelected(dates) {
        this.selected = dates
      },

      setReason(index) {
        this.reason = this.sliderMap[index]
      },

      save: async function() {
        await this.$store.dispatch("saveAbsence", this.data)

        setTimeout(() => {
          this.reset()
        }, 1000)
      },

      remove: async function() {
        console.log('Delete')
        // FIXME: Enable bulk delete with ids in body payload
        for(let record of this.data) {
          await this.$store.dispatch("deleteAbsence", record)
        }

        setTimeout(() => {
          this.reset()
        }, 1000)
      },

      reset() {
        Object.assign(this.$data, this.$options.data.call(this))

        // FIXME: Emit 'reset' event to all children
        this.$refs.absenceSwitch.reset()
      }
    }
  }
</script>

<style lang="sass" scoped>
  .curtain
    position: relative
    overflow: hidden
    height: 100%

    &.open
      .curtain-top
        transform: translateY(-100%)

      .curtain-middle
        opacity: 1
        pointer-events: auto

      .curtain-bottom
        transform: translateY(100%)

    .curtain-top, .curtain-bottom
      position: absolute
      z-index: 1
      transition: transform 0.3s linear
      will-change: transform

    .curtain-top
      top: 0

    .curtain-middle
      z-index: 0
      height: auto
      opacity: 0.5
      pointer-events: none
      transition: opacity 0.3s linear
      will-change: opacity

    .curtain-bottom
      bottom: 0
      opacity: 0.5

</style>

<style lang="sass" scoped>
  @media screen and (orientation: portrait)
    .curtain-top, .curtain-bottom
      height: 10vh
      background: #eee


  @media screen and (orientation: landscape)
    .curtain-top
      background: #eee

    .curtain-top, .curtain-bottom
      height: 15vh


  .container
    height: calc(100% - 10vh)
    display: flex

  .content
    flex: auto

  @media screen and (orientation: portrait)
    .container
      flex-direction: column

    .info
      height: 10vh
      width: 100%

  @media screen and (orientation: landscape)
    .container
      flex-direction: row

    .content
      width: 80%

    .info
      width: 20%
</style>
