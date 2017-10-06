<template>
  <ul>
    <li class="arrow" v-on:click="prevWeek">
      &laquo;
    </li>
    <li v-for="d in week" v-on:click="selectDay(d)" v-bind:class="{selected: d.getDate() == selected.getDate() }">
      {{ d.getDate() }}
    </li>
    <li class="arrow" v-on:click="nextWeek">
      &raquo;
    </li>
  </ul>
</template>

<script>
  import { weekNumber, weekStartDay, weekDaysRange } from '../helpers/date'

  export default {
    name: 'DatePicker',
    data () {
      return {
        current: weekNumber(),
        selected: new Date(),
        year: new Date().getFullYear(),
        week: [],
        weekdays: ['Mo', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    },

    created () {
      this.week = weekDaysRange()
    },

    methods: {
      selectDay (day) {
        this.selected = day
        this.$parent.$parent.date = day
      },

      prevWeek () {
        if (this.current > 0) {
          this.current = this.current - 1
        } else {
          this.current = 52
          this.year -= 1
        }

        this.week = weekDaysRange(weekStartDay(this.current, this.year))
        this.selectDay(this.week[0])
        this.$emit('prevWeek')
      },

      nextWeek () {
        if (this.current === 52) {
          this.current = 0
          this.year += 1
        } else {
          this.current = this.current + 1
        }

        this.week = weekDaysRange(weekStartDay(this.current, this.year))
        this.selectDay(this.week[0])
        this.$emit('nextWeek')
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
    width: 100%;
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
    vertical-align: middle;
    transition: color .2s, background 1s;
    /*background: rgba(0,0,0,0.1);*/
  }

  .arrow {
    /*background: rgba(0,0,0,0.1);*/
  }

  .selected {
    background: #1675d1;
    /*background: #3D70BC;*/
    color: #fff;
  }
</style>
