<template>
  <ul>
    <li v-on:click="prevWeek()">
      &laquo;
    </li>
    <li v-for="d in week" v-on:click="selectDay(d)" v-bind:class="{selected: d == date }">
      {{ d }}
    </li>
    <li v-on:click="nextWeek()">
      &raquo;
    </li>
  </ul>
</template>

<script>
  import '../helpers/array'

  export default {
    name: 'DatePicker',
    data () {
      return {
        weekday: new Date().getDay(),
        week: [],
        day: new Date().getDay(),
        date: new Date().getDate(),
        toggle: null
      }
    },

    created () {
      console.log('CRE')
      const start = (this.date - 7) > 0 ? (this.date - this.day + 1) : this.date
      const end = 7 - this.day
      this.week = Array.range(start, this.date + end)
    },

    methods: {
      selectDay (day) {
        this.date = day
        this.$parent.$parent.day = day
      },

      prevWeek () {
        const end = parseInt(this.week[0]) - 1
        const start = end - 6
        this.week = Array.range(start, end)
        this.date = this.week[0]
        this.$emit('prevWeek')
      },

      nextWeek () {
        const start = parseInt(this.week[6]) + 1
        const end = start + 6
        this.week = Array.range(start, end)
        this.date = this.week[0]
        this.$emit('nextWeek')
      },

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

<style scoped>
  ul {
    padding: 0;
    margin: 0;

    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    /*background: #8AB4E8;
    background: #2B95CC;
    background: #3D70BC;*/
    /*color: #fff;*/
  }

  li {
    cursor: pointer;
    padding: 10px;
    list-style: none;
    width: 16px;
    line-height: 16px;
    text-align: center;
    height: 16px;
    border-radius: 50%;
    transition: color .2s, background 1s;

  }

  .selected {
    background: #308FF0;
    color: #fff;
  }
</style>
