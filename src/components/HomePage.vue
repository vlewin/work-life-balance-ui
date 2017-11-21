<template>
  <card>
    <date-picker slot="header"></date-picker>
    <simple-slider slot="body" :active="slider.open">
      <div class="simple-slider-item" slot="up">
        <div class="form-input blue">
          <div class="form-trigger" v-on:click="openSlider({ open: true, target: 'start' })">
            {{ form.start }}
          </div>
          <div class="form-trigger" v-on:click="openSlider({ open: true, target: 'pause' })">
            {{ form.pause | timeToNumber }}
          </div>
          <div class="form-trigger" v-on:click="openSlider({ open: true, target: 'finish' })">
            {{ form.finish }}
          </div>
        </div>

        <div class="form-info" v-on:click="navigate('page-1')">
          <info :duration="duration"></info>
        </div>
      </div>

      <time-picker class="simple-slider-item" slot="down" :init-value="form[slider.target]" :target="slider.target" v-on:changed="setValue" v-on:done="closeSlider"></time-picker>

      <!-- <div class="simple-slider-item" slot="down"> -->
        <!-- FIXME: Find a better way -->
        <!-- <number-picker v-if="slider.target === 'pause'" v-on:changed="setPause" slot="down"></number-picker>
        <time-picker v-if="['start', 'finish'].includes(slider.target)" slot="down" :init-value="form[slider.target]" :target="slider.target" v-on:changed="setValue" v-on:done="closeSlider"></time-picker> -->
      <!-- </div> -->
    </simple-slider>

    <simple-switch slot="footer" class="vertical animated primary">
      <button slot="up" v-on:click="save">SAVE</button>
      <button slot="down">DONE ;)</button>
    </simple-switch>

    <simple-switch slot="footer" class="horizontal animated primary" :active="timepicker">
      <button slot="up" v-on:click="navigate('page-3')">ABSENCE</button>
      <button slot="down" v-on:click="closeSlider">CANCEL</button>
    </simple-switch>
  </card>
</template>

<script>
  // import axios from 'axios'
  import differenceInMinutes from 'date-fns/difference_in_minutes'
  import format from 'date-fns/format'
  import addHours from 'date-fns/add_hours'
  import getISOWeek from 'date-fns/get_iso_week'
  import { mapActions } from 'vuex'

  import Card from './shared/Card'
  import DatePicker from './shared/DatePicker'
  import SimpleSlider from './shared/SimpleSlider'
  import SimpleSwitch from './shared/SimpleSwitch'
  import TimePicker from './shared/TimePicker'
  import Info from './Info'

  import Timestamp from '../services/timestamp'

  export default {
    name: 'HomePage',
    components: {
      Card,
      DatePicker,
      SimpleSlider,
      SimpleSwitch,
      Info,
      TimePicker
    },

    data () {
      return {
        slider: {
          open: false,
          target: null
        },

        form: {
          start: '09:00',
          pause: '00:30',
          finish: '17:30',
        },

        timepicker: false
      }
    },

    created () {
      this.$store.dispatch('fetchTimestamps')
      window.component = this
      // this.update()
      // axios.get(`http://127.0.0.1:8000/api/timestamps?week=${this.week}`).then((r) => {
      //   console.log('GET BY WEEK', r.data.length)
      // })
    },

    computed: {
      date () {
        return this.$store.state.selectedDay
      },

      week() {
        return getISOWeek(this.date)
      },

      formatedDate() {
        return format(this.date, 'YYYY-MM-DD')
      },

      start () {
        if(this.form.start && this.form.start.includes(':')) {
          return new Date(`${this.formatedDate} ${this.form.start}`)
        }

        return null
      },

      finish () {
        return new Date(`${this.formatedDate} ${this.form.finish}`)
      },

      duration () {
        return this.total - (parseInt(this.form.pause) / 60).toFixed(2)
      },

      total () {
        return (differenceInMinutes(this.finish, this.start) / 60).toFixed(2)
      }
    },

    watch: {
      start(val) {
        if(val) {
          console.log('HomePage - start value changed', val)
          this.calculateEnd()
        }

      }
    },

    filters: {
      timeToNumber: function (value) {
        console.log('timeToNumber', value)
        const splitted = value.split(':')
        return parseInt(splitted[0]) * 60 + parseInt(splitted[1])
      }
    },

    methods: {
      ...mapActions([
        'navigate', // map `this.increment()` to `this.$store.dispatch('increment')`
      ]),

      calculateEnd() {
        console.log('HomePage - calculateEnd:', format(addHours(this.start, 8), 'HH:mm'))
        this.form.finish = format(addHours(this.start, 8.5), 'HH:mm')
      },

      openSlider(options) {
        this.slider = options
        this.togglePicker(true)
      },

      closeSlider() {
        this.slider = this.$options.data().slider
        this.togglePicker(false)
      },

      togglePicker(open=true) {
        this.timepicker = open
      },

      setValue(target, value) {
        this.form[target] = value
      },

      setPause(value) {
        this.form.pause = value
        this.closeSlider()
        // this.slider = { target: null, open: false}
      },

      setDate(date) {
        this.date = date
      },

      update() {
        Timestamp.update(this.form).then(() => {
          console.log('UPDATED!')
        }).catch((error) => {
          console.log(error)
        })
      },

      save() {
        this.form.date = this.date
        this.form.week = this.week

        Timestamp.save(this.form).then(() => {
          console.log('SAVED!')
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
  .form {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    white-space: nowrap;
  }

  .form-input {
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
  }

  .form-input .form-trigger {
    flex:1 1 33%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-info {
    height: 80%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
