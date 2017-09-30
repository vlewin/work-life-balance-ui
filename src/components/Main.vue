<template>
  <div class="main">
    <ul class="main-header" v-on:click="open('calendar')">
      <li>
        &laquo;
      </li>
      <li v-for="n in [1,2,3,4,5,6,7]">
        {{ n }}
      </li>
      <li>
        &raquo;
      </li>
    </ul>
    <div class="main-body slider" :class="{ active: toggle }">
      <div class="slider-item top">
        <div class="time">
          <div class="times" :class="{ active: toggle }">
            <div class="left" v-on:click="open('left')" :class="{ open: toggle === 'left' }">
              <h1>
                08:00
              </h1>
            </div>
            <div class="center" v-on:click="open('center')" :class="{ open: toggle === 'center'  }">
              <h1>30</h1>
            </div>
            <div class="right" v-on:click="open('right')" :class="{ open: toggle === 'right'  }">
              <h1>
                18:00
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div class="slider-item middle">
        <time-picker v-if="toggle !== 'calendar'"></time-picker>
        <calendar v-if="toggle === 'calendar'"></calendar>
      </div>
      <div class="slider-item bottom">
        <div class="switch vertical" :class="{active: toggle === 'calendar'}">
          <div class="up">
            <info></info>
          </div>
          <div class="down">
            <select-box></select-box>
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
      <div class="switch vertical" :class="{active: toggle === 'calendar'}">
        <div class="up">
          <button v-on:click="open('calendar')">TIME OFF</button>
        </div>
        <div class="down">
          <button v-on:click="open('calendar')">CANCEL</button>
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
  import TimePicker from './TimePicker'
  import Calendar from './Calendar'
  import SelectBox from './SelectBox'

  export default {
    name: 'Time',
    components: {
      Info,
      TimePicker,
      Calendar,
      SelectBox
    },

    data () {
      return {
        toggle: null
      }
    },

    methods: {
      open (element) {
        console.log('toggle')
        if (this.toggle === element) {
          this.toggle = null
        } else {
          this.toggle = element
        }
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
    max-height: 100%;
    max-width: 100%;
    grid-template-rows: 10vh 1fr 10vh;
    grid-template-columns: 100%;
    grid-template-areas: "header"
                         "content"
                         "footer"
  }

  /*.main-header {
    grid-area: header;
    background: #f0f0f0;
    display: flex;
    align-items: center;
  }*/

  .main-header {
    padding: 0;
    margin: 0;

    display: flex;
    justify-content: space-around;
    align-items: center;
    /*background: #8AB4E8;
    background: #2B95CC;
    background: #3D70BC;*/
    /*color: #fff;*/
  }

  .main-header li {
    cursor: pointer;
    list-style: none;
  }



  .main-body {
    grid-area: content;
    /*background: #edeff0;*/
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex: 1 1 100%;
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

  button {
    background: none;
    border: none;
    outline: none;
    font-size: 100%;
    width: 100%;
    height: 100%;
  }

  .time {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1 1 50%;
    width: 100%;
    /*background: #edeff0;*/
  }

</style>

<style>
  .times {
    display: flex;
    justify-content: center;
    align-items: center;
    /*background: #eee;*/
    width: 100%;
    /*height: 10vh;*/
  }

  .times div {
    /*width: 100%;
    height: 100px;*/
    overflow: hidden;
    transition: all 0.3s;

    /*transition: flex 0.5s, opacity 0.3s;*/
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  /*.times:hover .left {
    flex:1 1 0%;
    opacity: 0;
  }

  .times:hover .right {
    flex:1 1 100%;
    opacity: 1;
  }*/

  .left {
    flex:1 1 33%;
    opacity: 1;
  }

  .center {
    flex:1 1 33%;
    opacity: 1;
  }

  .right {
    flex:1 1 33%;
    opacity: 1;
  }



  .times.active div {
    flex:1 1 0%;
    opacity: 0.2;
  }

  .times.active div.open {
    flex:1 1 100%;
    opacity: 1;
    font-size: 150%;
  }
</style>

<style scoped>
  .slider {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fafafa;
    /*background: #3D70BC;*/
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
    /*background: red;*/
    flex:1 1 50%;
  }

  .middle {
    width: 100%;
    background: white;
    flex:1 1 0%;
  }

  .bottom {
    /*background: green;*/
    flex:1 1 50%;
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
    height: 10vh;
  }

  .switch div {
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
