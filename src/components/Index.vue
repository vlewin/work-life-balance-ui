<template>
  <div class="container">
    {{ start }} {{ pause }} {{ end }} {{ duration}} - {{ picker }}

    <div class="wrapper">
      <div class="card">
        <div class="card-header">
          <div class="info">
            <div class="date left-align">
              {{ date }}
            </div>
            <div class="time right-align">
              {{ time }}
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="day-selector">
            <div class="arrow left"><<</div>
            <div class="day">1</div>
            <div class="day">2</div>
            <div class="day">3</div>
            <div class="day today selected">4</div>
            <div class="day">5</div>
            <div class="day">6</div>
            <div class="day">7</div>
            <div class="arrow right">>></div>
          </div>

          <div class="form">
            <div class="form-element start">
              <span v-on:click="toggleTimePicker('start')">{{ start }}</span>
              <!-- <time-picker target="start" :value="start" v-on:open="setOpen" v-on:close="setClose" v-on:done="setTime"></time-picker> -->

            </div>

            <div class="form-element pause">
              30
            </div>

            <div class="form-element end">
              <!-- <span v-on:click="toggleTimePicker('end')">{{ end }}</span> -->
              <!-- <time-picker target="end" :value="end" v-on:open="setOpen" v-on:close="setClose" v-on:done="setTime"></time-picker> -->
            </div>
          </div>

          <!-- <time-picker target="start" v-on:time-change="timeChange" v-on:done="setTime"></time-picker> -->
          <!-- <time-picker target="end" v-on:time-change="timeChange" v-on:done="setTime"></time-picker> -->

          <div class="balance">
            <div class="current">
              Today:
            </div>
            <div class="overall">
              Balance: 1.25h
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="actions">
            <div class="button primary">
              Start / Stop
            </div>
            <div class="button default">
              Day off
            </div>
          </div>
        </div>

        <div class="panel" v-bind:class="{ open: picker === 'start'}">
          <div class="panel-header">
            panel header
          </div>
          <div class="panel-body">
            <time-picker target="start"  v-on:open="setOpen" v-on:close="setClose" v-on:done="setTime"></time-picker>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import TimePicker from './TimePicker'

  export default {
    name: 'Time',
    components: {
      TimePicker
    },

    data () {
      return {
        today: this.$time(),
        now: this.$time(),
        picker: null,
        form: {
          date: null,
          start: null,
          end: null,
          // begin: {
          //   hh: '00',
          //   mm: '00'
          // },
          // end: {
          //   hh: '00',
          //   mm: '00'
          // },

          pause: null,
          estimatedPause: null
        }
      }
    },

    filters: {

    },

    created () {
      this.init()
    },

    computed: {
      date () {
        return this.today.format('ddd, D MMMM')
      },

      time () {
        return this.now.format('HH:mm:ss')
      },

      start () {
        return this.form.start
      },

      end () {
        return this.form.end
      },

      pause () {
        console.log('duration', this.duration)
        if (this.duration <= 6) {
          return 0
        } else if (this.duration > 6 && this.duration <= 9) {
          return 30
        } else if (this.duration > 9) {
          return 45
        }
        return 'N/A'
      },

      duration () {
        const start = this.toTimeString(this.form.start)
        const end = this.toTimeString(this.form.end)
        return end.subtract(this.form.pause, 'minutes').diff(start, 'minutes') / 60
      },

      total () {
        const start = this.toTimeString(this.form.start)
        const end = this.toTimeString(this.form.end)
        return end.diff(start, 'minutes') / 60
      }
    },

    watch: {
      // eslint-disable-next-line
      'form.start': function (val) {
        console.log(val)
        this.estimateEnd()
      },

      // eslint-disable-next-line
      'form.pause': function (val) {
        console.log(val)
        this.estimateEnd()
      },

      // eslint-disable-next-line
      'form.end': function (val) {
        console.log(val)
        this.estimatePause()
      }
    },

    methods: {
      init () {
        setInterval(() => {
          this.now = this.$time()
        }, 1000)

        this.form.date = this.today
        this.form.start = this.now.format('HH:mm')
        this.form.pause = 30
        this.form.end = this.now.add(8, 'h').format('HH:mm')
      },

      toTimeString (value) {
        return this.$time(value, 'HH:mm')
      },

      set (input) {
        if (input === 'start') {
          this.form.start = this.$time().format('HH:mm')
        } else {
          this.form.end = this.$time().add(8, 'h').format('HH:mm')
        }
      },

      estimatePause () {
        console.log('estimatePause')
        if (this.duration <= 6) {
          this.form.estimatedPause = 0
        } else if (this.duration > 6 && this.duration <= 9) {
          this.form.estimatedPause = 30
        } else if (this.duration > 9) {
          this.form.estimatedPause = 45
        }
        return 'N/A'
      },

      estimateEnd () {
        console.log('estimateEnd')
        this.form.end = this.toTimeString(this.form.start).add(8, 'h').add(this.form.pause, 'm').format('HH:mm')
      },

      submit () {
        console.log(JSON.stringify(this.form))
      },

      toggleTimePicker (target) {
        if (this.picker === target) {
          this.picker = null
        } else {
          this.picker = target
        }
      },

      // timeChange (target, unit, value) {
      //   console.log('timeChange', target, unit, value)
      //   this.form[target][unit] = value
      // },
      setOpen (target) {
        this.picker = target
      },

      setClose (target) {
        this.picker = null
      },

      setTime (target, value) {
        console.log('setTime', value, target)
        this.form[target] = value
        this.picker = null
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  // .container
  //   display: flex
  //   width: 100%
  //   height: 100%
  // helpers
  .left-align
    text-align: left
  .right-align
    text-align: right

  .display-time
    text-align: center

  .container
    display: grid
    // grid-template-columns: repeat(3, 1fr)
    align-items: center
    justify-content: center
    // grid-template-areas: ". a ." ". a ."
    width: 100vw
    height: 100vh

  .wrapper
    width: 50vw
    height: 50vh
    overflow: hidden

  .card
    grid-area: a
    width: 50vw
    height: 50vh
    align-self: center
    justify-self: center
    box-sizing: border-box

  .card-header
    border: 1px solid #ccc
    border-bottom: none
    border-radius: 5px 5px 0 0
    overflow: hidden
    height: 10%

    .info
      display: flex
      justify-content: space-between
      font-size: 2vw
      padding: 0.5vw

  .card-body
    padding: 0.5vw
    border: 1px solid #ccc
    height: 80%
    display: flex
    flex-direction: column
    justify-content: space-around

    .day-selector
      display: grid
      grid-template-columns: repeat(9, 1fr)

      .arrow, .day
        border: 1px solid #ccc

      .day
        border-right: none

        &.selected
          background-color: #42b983
          color: #fff

      .arrow:first-child
        border-right: none

    .form
      display: flex
      flex-wrap: wrap
      justify-content: space-around
      list-style: none

      .form-element
        font-size: 4vw
        cursor: pointer
        transition: width 2s, height 4s

        &.open
          width: 100%

    .balance
      display: grid
      grid-template-columns: 1fr 1fr
      border: 1px solid #ccc

  .card-footer
    border: 1px solid #ccc
    border-top: none
    border-radius: 0 0 5px 5px
    overflow: hidden
    height: 10%

    .actions
      font-size: 2vw
      display: grid
      grid-template-columns: 1fr 1fr

      .button:first-child
        border-right: 1px solid #ccc

      .button
        padding: 0.5vw

        &.default
          background: #eee
        &.primary
          background: #42b983
          color: #fff

  .panel
    transition: transform 500ms
    height: 50vh
    background: white
    width: calc(100% - 2px)
    height: 20vh
    border: 1px solid #ccc
    &.open
      transform: translate(0, -22vh)
</style>

<!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff6%2F27%2F91%2Ff62791a614fd3088b01ddd96756c6771.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F360217670180554802%2F&docid=YJuz1oGNIl5xnM&tbnid=xcixYzPxTJIKyM%3A&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800&h=600&bih=960&biw=1920&q=css3%20time%20picker&ved=0ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0&iact=mrc&uact=8#h=600&imgdii=Fir91c5_-DbctM:&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800 -->
<!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff6%2F27%2F91%2Ff62791a614fd3088b01ddd96756c6771.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F360217670180554802%2F&docid=YJuz1oGNIl5xnM&tbnid=xcixYzPxTJIKyM%3A&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800&h=600&bih=960&biw=1920&q=css3%20time%20picker&ved=0ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0&iact=mrc&uact=8 -->
<!-- http://www.cssscript.com/wp-content/uploads/2016/03/Beautiful-Material-Design-Date-Time-Picker.png -->
<!-- https://codepen.io/jaromvogel/pen/VeYqvB?page=2 -->
<!-- https://codepen.io/jaromvogel/pen/aNPRwG?page=3 -->
