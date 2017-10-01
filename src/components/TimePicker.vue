<template>
  <div class="time-picker">
    <ul class="flex-container">
      <li class="flex-item" v-for="value in [1,2,3,4,5,6,7,8,9,0]" v-on:click="setTime(value)">
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'TimePicker',
    data () {
      return {
        time: ''
      }
    },

    props: {
      value: {
        type: String
      },

      target: {
        required: true
      }
    },

    methods: {
      setTime (value) {
        if (this.time.length === 2) {
          this.time = this.time + ':'
        }

        this.time = this.time + value

        if (this.time.length === 5) {
          this.$emit('change', this.target, this.time)
          this.$emit('close', value)
          this.time = ''
        } else {
          this.$emit('change', this.target, this.time)
        }
      }
    }
  }
</script>


<style scoped>
  .time-picker {
    width: 100%;
    height: 100%;
  }

  .flex-container {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }

  .flex-item {
    flex: 1 0 25%;
    text-align: center;
    vertical-align: middle;
    padding: 0.5em;
    font-size: 130%;
    font-weight: bold;
    color: #888;
    cursor: pointer;
  }

  .flex-item:hover {
    background: #eee;
  }

  .disabled {
    background: #ddd;
  }

  .selected {
    background: #42b983;
  }

</style>
