<template>
  <pager :active="page">
    <card slot="left">
      <h1 slot="header" class="uppercase dark-blue">report</h1>
      <h1 slot="body">
        <i class="fa fa-frown-o" aria-hidden="true"></i>
        Comming soon!
      </h1>
      <button slot="footer" v-on:click="navigate('page-2')">BACK &raquo;</button>
    </card>

    <form-page slot="center"></form-page>

    <card slot="right">
      <h1 slot="header" class="uppercase dark-blue">absence</h1>
      <!-- <select-box slot="header" class="dark-blue"></select-box> -->

      <slider slot="body" class="horizontal height-25">
        <h4 slot="left">VACATION</h4>
        <h4 slot="center">SICKNESS</h4>
        <h4 slot="right">HOLIDAY</h4>
      </slider>

      <calendar slot="body" class="white"></calendar>

      <simple-switch slot="footer" class="vertical animated">
        <button slot="up">SAVE</button>
        <button slot="down">DONE ;)</button>
      </simple-switch>
      <button slot="footer" v-on:click="navigate('page-2')">&laquo; BACK </button>
    </card>
  </pager>
</template>

<script>
  import Pager from './Pager'
  import FormPage from './FormPage'
  import Card from './Card'
  import Slider from './Slider'
  import SimpleSwitch from './SimpleSwitch'
  import DatePicker from './DatePicker'
  import Info from './Info'
  import TimePicker from './TimePicker'
  import InputTime from './InputTime'
  import InputNumber from './InputNumber'
  import Calendar from './Calendar'
  import SelectBox from './SelectBox'

  export default {
    name: 'Index',
    components: {
      Pager,
      FormPage,
      Card,
      Slider,
      SimpleSwitch,
      DatePicker,
      Info,
      TimePicker,
      Calendar,
      SelectBox,
      InputTime,
      InputNumber
    },

    data () {
      return {
        page: 'page-2',
        form: {
          start: '08:00',
          pause: '30',
          end: '18:00'
        },
        timepicker: false,
        mode: 'picker',
        selected: 0
      }
    },

    created () {
      console.log('CREATED')
    },

    computed: {
      minutes () {
        return 'HUHU'
      }
    },

    methods: {
      navigate (page) {
        this.page = page
        this.mode = 'edit'
      },

      focusField (field) {
        if (this.field) {
          this.field = null
        } else {
          this.field = field
        }

        this.togglePicker()
      },

      togglePicker () {
        this.timepicker = !this.timepicker
      }
    }
  }
</script>
