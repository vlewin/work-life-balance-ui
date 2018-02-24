<template>
  <div class="container">
    <div class="card">
      <div class="card-header flex-space-between">
        <span>HEADER-LEFT</span>
        <span>HEADER-RIGHT</span>
      </div>

      <div class="card-body">
        <div class="flex-space-between">
          <div class="left">
            <div class="switch vertical">
              <div class="up">
                <h3 v-on:click="open">08:00</h3>
              </div>
              <div class="down">
                BOTTOM - HIDDEN
              </div>
            </div>
          </div>

          <div class="center">
            <h3>00</h3>
          </div>

          <div class="right">
            <div class="switch vertical">
              <div class="up">
                <h3>hidden</h3>
              </div>
              <div class="down">
                <time-picker target="start"></time-picker>
              </div>
            </div>
          </div>
        </div>

        <div class="switch vertical" v-bind:class="{ open: toggle }">
          <div class="up">
            <h3>Balance: 8</h3>
          </div>
          <div class="down">
            <time-picker target="start" v-on:done="done"></time-picker>
          </div>
        </div>
      </div>

      <div class="card-footer flex-space-between">
          <button>FOOTER-LEFT</button>
          <button>FOOTER-RIGHT</button>
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
        toggle: false
      }
    },

    methods: {
      open () {
        this.toggle = !this.toggle
      },

      done () {
        this.open()
      }
    }
  }
</script>

<style>
  .flex {
    display: flex;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 100%;
  }

  .flex-space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 1 100%;
  }


  .container {
    border: 1px solid #ccc;
    flex: 0 0 80%;
  }

  .card-header {
    height: 10vh;
    background: #7f8c8d;
    color: #fff;
    padding: 0 5px;
  }

  .card-body {
    height: 20vh;
  }

  .card-body .top, .card-body .bottom {
    height: 50%;
  }

  .card-footer {
    height: 10vh;
    border-top: 1px solid #ccc;
  }

  .left, .right {
    width: 50%;
  }

  button {
    width: 100%;
    background: #fff;
    height: 100%;
    outline: none;
    border: 1px solid #fff;
    font-size: 14px;
    font-weight: bold;
  }


</style>


<style>
  .slider {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
    width: 100%;
    height: 10vh;
  }

  .horizontal {
    width: 100%;
    height: 100%;
  }

  .vertical {
    flex-direction: column;
  }

  .slider:hover .slider-top {
    flex:1 1 25%;
  }

  .slider:hover .slider-middle {
    flex:1 1 50%;
  }

  .slider:hover .slider-bottom {
    flex:1 1 25%;
  }

  .slider div {
    width: 100%;
    height: 100px;
    overflow: hidden;
    transition: flex 0.5s;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .slider-top {
    background: red;
    flex:1 1 50%;
  }

  .slider-middle {
    width: 100%;
    background: orange;
    flex:1 1 0%;
  }

  .slider-bottom {
    background: green;
    flex:1 1 50%;
  }
</style>

<style>
.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
  width: 100%;
  height: 10vh;
}

.switch div {
  width: 100%;
  height: 100px;
  overflow: hidden;
  transition: flex 0.5s, opacity 0.3s;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.switch.open .up {
  flex:1 1 0%;
  opacity: 0;
}

.switch.open .down {
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
