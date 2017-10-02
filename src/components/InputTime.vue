<template>
  <div class="input-time">
    <div class="input-time-field" v-for="(hour, index) in hours" v-bind:class="{ selected: selected == index, set: hour.n }">
      <div class="input-time-field-item" v-bind:class="[`hour-${index}`]">
        {{ hour.v }}
      </div>
      <div class="input-time-field-item">
        {{ hour.n }}
      </div>
    </div>

    <div class="input-time-separator">:</div>

    <div class="input-time-field" v-for="(minute, index) in minutes"  v-bind:class="{ selected: selected == index+2, set: minute.n }">
      <div class="input-time-field-item">
        {{ minute.v }}
      </div>
      <div class="input-time-field-item">
        {{ minute.n }}
      </div>
    </div>

    <!-- <small>{{ fields }}</small> -->
    <!-- <input type="text" v-model="value" autofocus /> -->
    <!-- <button v-on:click="next">NEXT</button> -->
  </div>
</template>

<script>
  export default {
    name: 'InputTime',
    data () {
      return {
        fields: [{ v: '0', n: null }, { v: '0', n: null }, { v: '0', n: null }, { v: '0', n: null }],
        selected: 0
      }
    },

    props: {
      value: {
        type: String
      },

      target: {
        required: false
      }
    },

    created () {
      this.init()
    },

    computed: {
      hours () {
        return Array.from(this.fields).slice(0, 2)
      },

      minutes () {
        return Array.from(this.fields).slice(2)
      }
    },

    watch: {
      value (val) {
        if (val) {
          const index = val.length
          const field = this.fields[index - 1]
          if (index < 4) {
            field.n = val[index - 1]
            this.next()
          } else if (index === 4) {
            field.n = val[index - 1]
            this.selected = 0
            console.log('DONE')
            // this.reset()
            // this.init()
          } else {
            // this.reset()
          }

          console.log(val, index, JSON.stringify(field))
        }
      }
    },

    methods: {
      init () {
        if (this.value) {
          console.log('VALUE', this.value)
          this.value.replace(':', '').split('').forEach((v, index) => {
            this.fields[index].v = v
          })
        } else {
          console.log('CREATED')
        }

        console.log(JSON.stringify(this.fields))
      },

      next () {
        this.selected += 1
      },

      reset () {
        Object.assign(this.$data, this.$options.data.call(this))
      }
    }
  }
</script>

<style scoped>
  .input-time {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.1);
    padding: 0 2vw;
    /*padding: 0 0.5rem;*/
  }

  .input-time-field {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: all 0.5s;
    height: 6vh;
    /*width: 3.5vh;*/
    text-align: center;
    /*border-right: 1px solid #fff;*/
  }

  .input-time-separator, .input-time-field-item {
    line-height: 6vh;
  }

  .input-time-field .input-time-field-item {
    overflow: hidden;
    vertical-align: middle;
    transition: flex 0.5s, opacity 0.3s;
    text-align: center;
  }

  .input-time-field .input-time-field-item:first-child {
    flex:1 1 100%;
    opacity: 1;
  }

  .input-time-field .input-time-field-item:last-child {
    flex:1 1 0%;
    opacity: 0;
  }

  .input-time-field.set .input-time-field-item:first-child {
    flex:1 1 0%;
    opacity: 0;
  }

  .input-time-field.set .input-time-field-item:last-child {
    flex:1 1 100%;
    opacity: 1;
  }

  /*.input-time-field:hover div:first-child {
    flex:1 1 0%;
    opacity: 0;
  }

  .input-time-field:hover div:last-child {
    flex:1 1 100%;
    opacity: 1;
  }*/

  div.selected {
    /*background: rgba(0,0,0,0.1);*/
  }

</style>
