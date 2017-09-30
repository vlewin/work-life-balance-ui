<template>
  <div class="card-wrapper">
    <div class="card">
      <div class="card-header">
        <div>
          Do, 20.01.18
        </div>
        <div>
          20:00
        </div>
      </div>
      <div class="card-body">
        <date-picker></date-picker>

        <div class="form">
          <p v-on:click="togglePicker('start')">
            08:00
          </p>
          <p>
            30
          </p>
          <p v-on:click="togglePicker('end')">
            19:00
          </p>
        </div>

        <!-- <div class="flex-container" v-bind:class="{ open: open }">
          <div class="flex-spacer">SP</div>
          <div class="slider">SLIPER</div>
        </div> -->

        <div class="form-dynamic">
          <time-picker class="animated left"  v-bind:class="{ open: open === 'start' }" value="07:00" target="start"></time-picker>
          <time-picker class="animated right" v-bind:class="{ open: open === 'end' }" value="17:00" target="end"></time-picker>
        </div>
        <div class="balance">
          BALANCE
        </div>
      </div>

      <div class="card-footer">
        <button v-on:click="">SAVE</button>
        <button v-on:click="togglePanel('panel-1')">TIME OFF</button>
        <!-- <div class="panel">
          <div class="panel-header">
            panel header
          </div>
          <div class="panel-actions">
            panel actions
          </div>
          <div class="panel-body">
            body
          </div>
        </div> -->
      </div>
    </div>

    <div class="panel" v-bind:class="{ open: panel === 'panel-1' }">
      <div class="panel-header">
        TIMEOF OFF
      </div>
      <div class="panel-body">
        <calendar></calendar>
      </div>
      <div class="panel-footer">
        <button v-on:click="togglePanel('panel-1')">CLOSE</button>
      </div>
    </div>

    <!-- <div class="panel panel-2" v-bind:class="{ open: panel === 'panel-2' }">
      <div class="panel-header">
        Panel 2
      </div>
      <div class="panel-body">
        Panel 2 - BODY
      </div>
      <div class="panel-footer">
        <button v-on:click="togglePanel('panel-2')">CLOSE</button>
      </div>
    </div> -->
  </div>

  <!-- <div class="wrapper">
    <div class="card">
      <div class="card-header">
        card header
      </div>
      <div class="card-body">
        body
      </div>

      <div class="card-footer">
        <div class="panel">
          <div class="panel-header">
            panel header
          </div>
          <div class="panel-body">
            body
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <!-- <header>
      HEADER - TOP
    </header>
    <main>
      MAIN - MIDDLE
    </main>
    <footer>
      FOOTER - BOTTOM
    </footer> -->


    <!-- <div class="panel">
      <div class="panel-header">
        panel header
      </div>
      <div class="panel-body">
        body
      </div>
    </div> -->
</template>

<script>
  import Calendar from './Calendar.vue'
  import DatePicker from './DatePicker.vue'
  import TimePicker from './TimePicker'

  export default {
    name: 'Wip',
    components: { Calendar, DatePicker, TimePicker },
    data () {
      return {
        open: null,
        panel: null
      }
    },

    methods: {
      togglePicker (picker) {
        this.open = this.open ? null : picker
      },

      togglePanel (panel) {
        console.log('Toggle', panel)
        this.panel = this.panel === panel ? null : panel
      }
    }
  }
</script>

<style>
  .card-wrapper {
    width: 50vw;
    height: 50vh;
    overflow: hidden;
  }

  .card {
    width: 90vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
    transition: transform 0.5s;
  }

  .card-header {
    background: red;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-body {
    background: yellow;
    height: 80%;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
  }

  .card-footer {
    background: green;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: #ddd;
    border: 1px solid white;
  }

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

  @media only screen and (min-width:600px) {
    .wrapper {
      border: 2px solid white;
    }

    /*.wrapper:hover .card {
      transform: translate(0, -45vh)
    }*/

    .card {
      width: 50vw;
    }
  }

  .form {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 30%;
    background: #ccc;
  }

  .tmp {
    background: red;
    width: 100%;
    height: 30%;
    transition: transform 1s;
    transform: translate(-100%, 0);
  }

  .time-picker.animated {
    transition: transform 1s;
    width: 50%;
  }

  .time-picker.left {
    transform: translate(-100%, 0);
  }

  .time-picker.right {
    transform: translate(100%, 0);
  }

  .time-picker.left.open, .time-picker.right.open {
    transform: translate(0, 0);
    width: 100%;
  }

  .balance {
    background: green;
    width: 100%;
    height: 30%;
  }
</style>
<!--
<style>
.flex-container {
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  border: 2px solid #444;
  border-radius: 3px;
}

.flex-spacer,
.slider {
  flex-grow: 0;
  position: relative;
}

.slider {
  padding: 25px;
  background-color: #0DD;
}

.flex-spacer {
  background-color: #DDD;
  transition: all .4s ease-out;
}

.flex-container:hover .flex-spacer {
  flex-grow: 1;
}
</style> -->
