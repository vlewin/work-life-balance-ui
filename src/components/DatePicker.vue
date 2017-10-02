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
        weekdays: ['Mo', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        weekday: new Date().getDay(),
        week: [],
        day: new Date().getDay(),
        date: new Date().getDate(),
        toggle: null
      }
    },

    created () {
      // FIXME: Move to helper
      const start = (this.date - 7) > 0 ? (this.date - this.day + 1) : this.date
      const end = 6 - this.day
      this.week = Array.range(start, this.date + end)
    },

    methods: {
      selectDay (day) {
        this.date = day
        this.$parent.$parent.day = day
      },

      prevWeek () {
        // FIXME: Move to helper
        const end = parseInt(this.week[0]) - 1
        const start = end - 6
        this.week = Array.range(start, end)
        this.selectDay(this.week[0])
        this.$emit('prevWeek')
      },

      nextWeek () {
        // FIXME: Move to helper
        const start = parseInt(this.week[6]) + 1
        const end = start + 6
        this.week = Array.range(start, end)
        this.selectDay(this.week[0])
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
    justify-content: space-between;
    align-items: center;
    height: 100%;

    background: #004a9f;
    color: #fff;
  }

  li {
    cursor: pointer;
    list-style: none;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 50%;
    transition: color .2s, background 1s;
  }

  .selected {
    background: #1675d1;
    /*background: #3D70BC;*/
    color: #fff;
  }
</style>
