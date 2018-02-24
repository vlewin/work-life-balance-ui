<template>
  <card>
    <date-picker slot="header"></date-picker>

    <slider slot="body" class="horizontal height-25" :active="slider.active" :focused="slider.field">
      <h1 slot="left" v-on:click="openSlider({ field: 'left', target: 'start', active: true})">
        <input-time class="start" :active="slider.target === 'start'" target="start" :value="form.start"></input-time>
      </h1>
      <h1 slot="center" v-on:click="focusField('center')">30</h1>
      <h1 slot="right" v-on:click="openSlider({ field: 'right', target: 'end', active: true})">
        <input-time class="end" :active="slider.target === 'end'" target="end" :value="form.end"></input-time>
      </h1>
    </slider>

    <simple-switch slot="body" class="vertical animated text-primary" :active="slider.active">
      <info slot="up" v-on:click.native="navigate('page-1')"></info>
      <time-picker slot="down" :target="slider.target" v-on:change="setValue" v-on:done="close"></time-picker>
    </simple-switch>

    <simple-switch slot="footer" class="vertical animated primary">
      <button slot="up">SAVE</button>
      <button slot="down">DONE ;)</button>
    </simple-switch>

    <simple-switch slot="footer" class="horizontal animated primary" :active="timepicker">
      <button slot="up" v-on:click="navigate('page-3')">ABSENCE</button>
      <button slot="down" v-on:click="close">CANCEL</button>
    </simple-switch>
  </card>
</template>

<script>
  import Pager from './Pager'
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
    name: 'FormPage',
    components: {
      Pager,
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
        slider: {
          field: null,
          target: null,
          active: false
        },

        form: {
          start: '08:00',
          pause: '30',
          end: '18:00'
        },

        timepicker: false,
        field: null,
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
        this.$parent.$parent.page = page
        this.mode = 'edit'
      },

      openSlider(options) {
        this.slider = options
        this.openPicker()
      },

      closeSlider() {
        this.slider = this.$options.data().slider
      },

      openPicker () {
        this.timepicker = true
      },

      closePicker() {
        this.timepicker = false
      },

      close () {
        this.closeSlider()
        this.closePicker()
      },

      setValue (target, value) {
        console.log('setValue', target, value)
        this.form[target] = value
      }
    }
  }
</script>
