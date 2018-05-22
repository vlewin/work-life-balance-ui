<template>
  <card hcolor="blue">
    <i slot="c-header-icon" class="fa fa-calendar-plus fa-5x" aria-hidden="true"></i>
    <template slot="c-header-title">
      Absence
    </template>

    <month-picker slot="c-body" class="flex flex-center uppercase" v-on:date-change="setDateAndFetch"></month-picker>

    <div slot="c-body" class="flex flex-between container">
      <div class="flex flex-center content">
        <calendar class="width-90" :date="currentDate" :mode="mode" v-on:changed="setSelected"></calendar>
      </div>

      <simple-switch slot="c-footer" class="info animated" :class="{ horizontal: isLandscape }" :active="mode === 'add' && !!selected.length">
        <div class="flex flex-center height-100" slot="up">
          <div class="flex flex-center flex-column flex-item">
            <span>{{ balance.vacation }}</span>
            <label>
              <i class="fa fa-plane text-green" aria-hidden="true"></i>
              VACATION
            </label>
          </div>
          <div class="flex flex-center flex-column flex-item">
            <span>{{ balance.sickness }}</span>
            <label>
              <i class="fa fa-heartbeat text-amber" aria-hidden="true"></i>
              SICKNESS
            </label>
          </div>
          <div class="flex flex-center flex-column flex-item">
            <span>{{ holidayCount }}</span>
            <label>
              <i class="fa fa-gift text-tomato" aria-hidden="true"></i>
              HOLIDAY
            </label>
          </div>
        </div>

        <simple-slider slot="down" class="text-white" :class="{ horizontal: isLandscape }" v-on:changed="setReason">
          <div slot="left">
            <i class="fa fa-plane"></i>
            <div>
              VACATION
            </div>
          </div>
          <div slot="center">
            <!-- <i class="fa fa-heartbeat"></i> -->
            <i class="fas fa-briefcase-medical"></i>
            <div>
              SICKNESS
            </div>
          </div>
          <div slot="right">
            <i class="fa fa-gift" aria-hidden="true"></i>
            <div>
              HOLIDAY
            </div>
          </div>
        </simple-slider>
      </simple-switch>
    </div>

    <small>Help text hier</small>
    <template slot="c-sidebar-title">TEXT</template>
    <i slot="c-sidebar-icon" class="fa fa-calendar-plus fa-6x" aria-hidden="true"></i>


    <template slot="c-footer" >
      <simple-switch slot="up" class="vertical animated" :active="!!mode && valid">
        <button-group slot="up" class="vertical animated" :buttons="buttons" v-on:changed="setMode"></button-group>
        <template v-if="mode === 'add'">
          <button slot="down" class="text-white primary width-50" v-on:click="reset">SAVE</button>
          <button slot="down" class="text-white grey-5 width-50" v-on:click="reset">CANCEL</button>
        </template>

        <template v-else>
          <button slot="down" class="text-white red width-50" v-on:click="reset">REMOVE</button>
          <button slot="down" class="text-white grey-6 width-50" v-on:click="reset">CANCEL</button>
        </template>
      </simple-switch>

      <!-- <simple-switch v-if="valid" slot="up" class="vertical animated" :active="loading">
        <button class="text-white" slot="up" v-on:click="save">
          SAVE
        </button>
        <button class="text-white" slot="down" disabled>PLEASE WAIT...</button>
      </simple-switch>

      <span class="uppercase" v-else>
        <i class="fas fa-info-circle"></i>
        select absence {{ selected.length ? 'type' : 'date' }}
      </span> -->
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
        buttons: [{ name: 'add', color: 'blue', focused: false }, { name: 'remove', color: 'red', focused: false }],
        mode: null,
        date: new Date(),
        reason: null,
        selected: [],
        active: false,
        isLandscape: window.screen.width > window.screen.height,
        // orientation: window.screen.orientation.type,
        sliderMap: [
          "vacation",
          "sickness",
          "holiday"
        ]
      }
    },

    // mounted() {
    //   this.$store.dispatch('fetchMonthAbsences', this.currentMonthNumber)
    // },

    created() {
      // FIXME: Move to App.vue
      window.addEventListener("orientationchange", () => {
        console.log(screen.orientation.type)
        this.isLandscape = window.screen.width > window.screen.height
      })
    },

    beforeDestroy() {
      // FIXME: Move to App.vue
      window.removeEventListener("orientationchange", () => {
        console.log(screen.orientation.type)
        this.isLandscape = window.screen.width > window.screen.height
      })
    },

    // watch: {
    //   mode(val) {
    //     if(!val) {
    //       this.selected = []
    //     }
    //   }
    // },


    computed: {
      ...mapGetters(['currentMonthNumber']),
      ...mapState(['currentDate', 'loading', 'balance', 'records']),

      deleteMode() {
        return this.selected.some((d) => this.absences[d.toDateString()])
      },

      absences() {
        return Object.values(this.records).filter((record) => console.log(record))
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
        // return this.orientation.includes('landscape')
      }


      // isLandscape() {
      //   return window.screen.width > window.screen.height
      //   // return this.orientation.includes('landscape')
      // }
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
        console.log(index)
        console.log(index, this.sliderMap[index])
        this.reason = this.sliderMap[index]
      },

      save: async function() {
        console.log(this.data)
        console.log(this.selected, this.reason)
        await this.$store.dispatch("saveAbsence", this.data)
        await this.$store.dispatch("fetchBalance")
      },

      reset() {
        Object.assign(this.$data, this.$options.data.call(this))
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

      .flex-item
        border-top: 0.2rem solid #eee
        height: 100%

      span
        font-size: 2rem
        line-height: 1.8rem

      label
        font-size: 0.6rem
        line-height: 1rem

  @media screen and (orientation: landscape)
    .container
      margin: auto

    .content
      width: 75%

    .info
      // height: 70vh
      flex-direction: column
      width: 25%

      span
        font-size: 3rem
        line-height: 3rem

      label
        font-size: 0.6rem
        line-height: 0.6rem


      .flex
        height: 100%
        flex-direction: column

      .flex-item
        height: calc(100% / 3)
        border-left: 1px solid #eee
</style>
