<template>
  <card>
    <!-- <div slot="header" class="uppercase dark-blue height-100"> OCTOBER (2017)</div> -->
    <!-- <select-box slot="header" class="dark-blue"></select-box> -->
    <!-- <ul slot="header" class="dark-blue">
      <li class="arrow">«</li>
      <li>OCTOBER (2017)</li>
      <li class="arrow">»</li>
    </ul> -->
    <month-picker slot="header" class="uppercase dark-blue" v-on:date-change="setDate"></month-picker>

    <slider slot="body" class="height-20 horizontal text-white" :focused="sliderMap[reason]">
      <h4 slot="left" v-on:click="toggleReason('vacation')">VACATION</h4>
      <h4 slot="center" v-on:click="toggleReason('sickness')">SICKNESS</h4>
      <h4 slot="right" v-on:click="toggleReason('holiday')">HOLIDAY</h4>
    </slider>

    <calendar slot="body" class="height-80 white" :date="date"></calendar>

    <simple-switch slot="footer" class="vertical animated">
      <button slot="up">SAVE</button>
      <button slot="down">DONE ;)</button>
    </simple-switch>

    <simple-switch slot="footer" class="vertical animated" :active="!!reason">
      <button slot="up" v-on:click="navigate('page-2')">&laquo; BACK </button>
      <button class="active" slot="down" v-on:click="reset">CANCEL</button>
    </simple-switch>
  </card>
</template>

<script>
  import Card from './Card'
  import Slider from './Slider'
  import Calendar from './Calendar'
  import SimpleSwitch from './SimpleSwitch'
  import MonthPicker from './MonthPicker'

  export default {
    name: 'AbsencePage',
    components: {
      Card,
      Slider,
      Calendar,
      SimpleSwitch,
      MonthPicker
    },

    data () {
      return {
        page: 'page-2',
        reason: null,
        date: new Date(),
        sliderMap: {
          vacation: 0,
          sickness: 1,
          holiday: 2,
        }

      }
    },

    methods: {
      setDate(date) {
        this.date = date
      },

      toggleReason (reason) {
        this.reason = this.reason === reason ? null : reason
      },

      navigate (page) {
        this.$parent.$parent.page = page
      },

      reset() {
        Object.assign(this.$data, this.$options.data.call(this))
      }
    }
  }
</script>
