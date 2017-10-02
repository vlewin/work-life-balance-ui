<template>
  <div class="main">
    <div class="main-header">
      <date-picker v-on:prevWeek="animate('left')" v-on:nextWeek="animate('right')"></date-picker>
    </div>
    <div class="main-body slider" :class="{ active: sliderOpen }">
      <div class="slider-item top">
        <div class="switch vertical" :class="{active: mode === 'calendar'}">
          <div class="up">
            <div class="form" :class="[{ active: picker.target }, picker.target, animationClass]">
              <h1 class="start" v-on:click="openPicker('start', form.start)">
                <input-time class="start" :value="form.start"></input-time>
              </h1>
              <h1 class="pause" v-on:click="openPicker('pause', form.pause)">
                <input-number></input-number>
              </h1>
              <h1 class="end" v-on:click="openPicker('end', form.end)">
                <input-time :value="form.end"></input-time>
              </h1>
            </div>
          </div>
          <div class="down">
            <select-box></select-box>
          </div>
        </div>
      </div>
      <div class="slider-item middle">
        <time-picker v-if="mode === 'picker'" :target="picker.target" :value="picker.value" v-on:change="setValue" v-on:close="closePicker"></time-picker>
        <calendar v-if="mode === 'calendar'"></calendar>
      </div>
      <div class="slider-item bottom">
        <div class="switch vertical" :class="{active: mode === 'calendar'}">
          <div class="up">
            <info></info>
          </div>
          <div class="down">
            <small>VACATION: 20 days</small>
            <small>SICKNESS: 2 days</small>
          </div>
        </div>
      </div>
    </div>
    <div class="main-footer">
      <div class="switch vertical" :class="{active: toggle === 'save'}">
        <div class="up">
          <button>SAVE</button>
        </div>
        <div class="down">
          DONE ;)
        </div>
      </div>
      <div class="switch vertical" :class="{active: mode === 'picker' || mode === 'calendar'}">
        <div class="up">
          <button v-on:click="openCalendar">TIME OFF</button>
        </div>
        <div class="down">
          <button v-on:click="close">CANCEL</button>
        </div>
      </div>
    </div>
  </div>

<!-- http://principlerepo.com/time-picker/ -->
<!-- https://dribbble.com/shots/1057157-Calendar-Window-Rebound-ANIMATED -->
<!-- https://tinyurl.com/y9hoduhy -->
</template>

<script>
  import Info from './Info'
  import DatePicker from './DatePicker'
  import TimePicker from './TimePicker'
  import InputTime from './InputTime'
  import InputNumber from './InputNumber'
  import Calendar from './Calendar'
  import SelectBox from './SelectBox'

  export default {
    name: 'Time',
    components: {
      Info,
      DatePicker,
      TimePicker,
      InputTime,
      InputNumber,
      Calendar,
      SelectBox
    },

    data () {
      return {
        form: {
          start: '08:00',
          pause: '30',
          end: '18:00'
        },
        day: null,
        picker: {
          target: null,
          value: null
        },

        mode: null,
        toggle: null,
        animationClass: null
      }
    },

    computed: {
      sliderOpen () {
        return this.mode
      },

      pickerOpen () {
        return this.picker.target
      }
    },

    methods: {
      selectDay (day) {
        this.today = day
        this.$parent.day = day
      },

      animate (direction) {
        this.animationClass = `move-${direction}`
        setTimeout(() => {
          this.animationClass = null
        }, 500)
      },

      openPicker (target, value) {
        if (this.picker.target === target) {
          this.mode = null
          this.picker = {
            target: null,
            value: null
          }
        } else {
          this.mode = 'picker'
          this.picker = {
            target: target,
            value: value
          }
        }
      },

      setValue (target, value) {
        console.log('set', target, value)
        this.form[target] = value
      },

      closePicker () {
        console.log('Close picker')
        this.mode = null
        this.picker = {
          target: null,
          value: null
        }
      },

      openCalendar () {
        this.closePicker()
        this.mode = 'calendar'
      },

      closeCalendar () {
        this.mode = null
      },

      open (element) {
        console.log('toggle')
        if (element === 'calendar') {
          this.closePicker()
        }

        if (this.toggle === element) {
          this.toggle = null
        } else {
          this.toggle = element
        }
      },

      close () {
        this.mode = null
        this.closePicker()
        this.closeCalendar()
      },

      done () {
        this.open()
      }
    }
  }
</script>
<style>
  @-webkit-keyframes blinker {
    from {opacity: 1.0;}
    to {opacity: 0.0;}
  }
  .blink{
  	text-decoration: blink;
  	-webkit-animation-name: blinker;
  	-webkit-animation-duration: 0.6s;
  	-webkit-animation-iteration-count:infinite;
  	-webkit-animation-timing-function:ease-in-out;
  	-webkit-animation-direction: alternate;
  }

  .main {
    display: grid;
    grid-template-rows: 10vh 1fr 10vh;
    grid-template-columns: 100%;
    grid-template-areas: "header"
                         "content"
                         "footer"
  }

  .main-header {
    grid-area: header;
    background: #f0f0f0;
    align-items: center;
  }

  .main-body {
    grid-area: content;
    /*background: #edeff0;*/
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex: 1 1 100%;
  }

  .move-left {
    animation-name: left;
    animation-duration: 5s;
  }

  .move-right {
    animation-name: right;
    animation-duration: 5s;
  }

  .main-footer {
    grid-area: footer;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #eee;
  }

  .main-footer button:first-child {
    border-right: 1px solid #eee;
  }

  @keyframes left {
    0%   {
      transform: translateX(50vh);
    }

    10%   {
      transform: translateX(-50vh);
      opacity: 0;
    }

    75%   {
      transform: translateX(50vh);
      opacity: 0.5;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes right {
    0%   {
      transform: translateX(-50vh);
    }

    10%   {
      transform: translateX(50vh);
      opacity: 0;
    }

    75%   {
      transform: translateX(-50vh);
      opacity: 0.5;
    }

    100% {
      opacity: 1;
    }
  }

  button {
    background: none;
    border: none;
    outline: none;
    font-size: 100%;
    width: 100%;
    height: 100%;
  }

  button:hover {
    background: #eee;
  }

</style>

<style>
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .form h1 {
    flex:1 1 calc(100% / 3);
    opacity: 1;
    font-size: 1.8rem;
  }

  .form h1 {
    overflow: hidden;
    transition: all 0.3s;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .form.active h1 {
    flex:1 1 0%;
    opacity: 0.2;
  }

  .form.start h1.start {
    flex:1 1 100%;
    opacity: 1;
  }

  .form.pause h1.pause {
    flex:1 1 100%;
    opacity: 1;
  }

  .form.end h1.end {
    flex:1 1 100%;
    opacity: 1;
  }


</style>

<style scoped>
  .slider {
    display: flex;
    justify-content: center;
    align-items: center;
    /*background: #fafafa;
    background: #50A7C2;
    color: #fff;*/


    width: 100%;
  }

  .slider-item {
    width: 100%;
    height: 10vh;
    overflow: hidden;
    transition: flex 0.5s;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .horizontal {
    width: 100%;
    height: 100%;
  }

  .vertical {
    flex-direction: column;
  }

  .slider.active .top {
    flex:1 1 20%;
    background: #1675d1;
    color: #fff;
  }

  .slider.active .middle {
    flex:1 1 70%;
  }

  .slider.active .bottom {
    flex:1 1 10%;
  }

  /*.slider div {
    width: 100%;
    overflow: hidden;
    transition: flex 0.5s;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }*/

  .top {
    flex:1 1 20%;
    background: #1675d1;
    color: #fff;
  }

  .middle {
    background: white;
    flex:1 1 0%;
  }

  .bottom {
    /*background: green;*/
    flex:1 1 80%;
    height: 100%;
    /*background: #1675d1;*/
    background: #fff;
  }


</style>

<style>
  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    /*background: #eee;*/
    width: 100%;
    height: 100%;
  }

  .switch > div {
    width: 100%;
    height: 100px;
    overflow: hidden;
    transition: flex 0.5s, opacity 0.3s;
    transition-delay: 0.5s;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .switch.active .up {
    flex:1 1 0%;
    opacity: 0;
  }

  .switch.active .down {
    flex:1 1 100%;
    opacity: 1;
  }

  .up {
    flex:1 1 100%;
    opacity: 1;
  }

  .down {
    flex:1 1 0%;
    opacity: 0;
  }
</style>




<style>
.panel {
  background: #ccc;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s;
  height: 50vh;
  transform-style: preserve-3d;
}

.panel.open {
  transform: translate(0, -50vh);
  z-index: 2;
}

.panel-header {
  background: orange;
  height: 10%;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-body {
  background: grey;
  height: 80%;
}

.panel-footer {
  background: green;
  height: 10%;
}
</style>

<style>

</style>
