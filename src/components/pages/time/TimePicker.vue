<template>
  <div id="time-picker" class="flex-column flex-arround">
    <input-time class="width-100 amber" :init-value="initValue" :value="time"></input-time>
    <ul class="flex">
      <li class="flex-item" v-for="(value, index) in values" :key="index" :class="{ disabled: !setable.includes(value) }" v-on:click="setTime(value)">
        {{ value }}
      </li>
      <li class="flex-item" v-on:click="close">
        <i class="fa fa-times-circle" aria-hidden="true"></i>
      </li>
      <li class="flex-item" :class="{ disabled: !setable.includes(0) }" v-on:click="setTime(0)">
        0
      </li>
      <li class="flex-item">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  import InputTime from "./InputTime"

  export default {
    name: "TimePicker",
    components: {
      InputTime
    },

    data() {
      return {
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        valid: {
          0: [0, 1, 2],
          1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          2: [0, 1, 2, 3, 4, 5],
          3: [0, 5]
        },

        timeout: null,
        time: ""
      }
    },

    props: {
      initValue: {
        type: String
      },

      value: {
        type: String
      },

      target: {
        required: true
      }
    },

    computed: {
      setable() {
        // NOTE: Avoid invalid time e.g. 24, 25, 29
        if (this.time.startsWith("2") && this.time.length === 1) {
          // console.log("Starts with 2");
          // console.log(JSON.stringify(this.available.filter(h => h < 4)));
          return this.available.filter(h => h < 4)
        }

        return this.available
      },

      available() {
        return this.valid[this.time.length] || []
      }
    },

    watch: {
      initValue(val) {
        if (val) {
          // console.log("TimePicker - initValue change - addEventListener", val);
          window.addEventListener("keyup", this.keyup)
        } else {
          // console.error("TimePicker - Empty initValue - removeEventListener !!!");
          window.removeEventListener("keyup", this.keyup)
        }
      }
    },

    methods: {
      keyup(event) {
        const key = parseInt(event.key)
        if (event.key === "Backspace") {
          this.time = this.time.endsWith(":")
            ? this.time.substring(0, this.time.length - 2)
            : this.time.substring(0, this.time.length - 1)
        } else if (this.setable.includes(key)) {
          this.setTime(event.key)
        }
      },

      setTime(value) {
        this.time = this.time + value

        if (this.time.length === 4) {
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            this.$emit("changed", this.target, this.time.match(/.{1,2}/g).join(":"))
            this.$emit("close")
            this.time = ""
          }, 500)
        }
      },

      close() {
        this.$emit("close")
      },

      reset() {
        window.removeEventListener("keyup")
        this.time = ""
      }
    }
  }
</script>

<style scoped>
  #time-picker {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    z-index: 0;
  }


  ul {
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    list-style: none;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .flex-item {
    flex: 1 1 calc(100% / 3);
    text-align: center;
    vertical-align: middle;
    padding: 1em 0;
    font-size: 130%;
    font-weight: bold;
    color: #444;
    cursor: pointer;
  }

  .flex-item:hover {
    background: #eee;
  }

  .disabled {
    color: #ddd;
    pointer-events: none;
  }

  .selected {
    background: #42b983;
  }


  @media screen and (orientation: portrait) {
    .input-time {
      height: 10vh;
    }

    ul {
      width: 100%;
      height: calc(100% - 10vh);
    }

    .flex-item {
      padding: 7% 0;
    }
  }

  @media screen and (orientation: landscape) {
    .input-time {
      height: 15vh;
    }

    ul {
      width: 80%;
      height: calc(100% - 15vh);
    }

    .flex-item {
      padding: 4% 0;
    }
  }
</style>
