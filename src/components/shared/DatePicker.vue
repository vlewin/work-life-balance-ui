<template>
  <ul>
    <li class="arrow" v-on:click="prevWeek">
      &laquo;
    </li>
    <li class="uppercase" v-for="d in week" v-on:click="selectDay(d)" v-bind:class="{ selected: isSelected(d), weekend: isWeekend(d), holiday: isHoliday(d) }">
      {{ weekdays[d.getDay()] }}
    </li>
    <li class="arrow" v-on:click="nextWeek">
      &raquo;
    </li>
  </ul>
</template>

<script>
  // FIXME: replace with date-fns
  import { weekNumber, weekStartDay, weekDaysRange } from '../../helpers/date'
  import holiday from 'german-holiday'

  export default {
    name: 'DatePicker',
    data () {
      return {
        current: weekNumber(),
        selected: new Date(),
        year: new Date().getFullYear(),
        week: [],
        weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
      }
    },

    created () {
      this.week = weekDaysRange()
    },

    methods: {
      isSelected(date) {
        return date.getDate() === this.selected.getDate()
      },

      isWeekend(date) {
        return date.getDay() == 6 || date.getDay() == 0
      },

      isHoliday(date) {
        console.log(date, holiday.holidayCheck(date, 'BY'))
        return holiday.holidayCheck(date, 'BY')
      },

      selectDay (date) {
        this.selected = date
        this.$parent.$parent.$parent.$parent.$parent.date = date
      },

      // FIXME: Use date-fns
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

      // FIXME: Use date-fns
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
    width: 2.2rem;
    height: 2.2rem;
    line-height: 2rem;
    border-radius: 50%;
    transition: color .2s, background 1s;
    border: 0.1rem solid #004a9f;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .arrow {
    background: rgba(0,0,0,0.1);
    font-size: 1.4rem;
    line-height: 1.7rem;
  }

  .selected {
    background: #fff;
    color: #004a9f;
  }

  .weekend {
    /*background: rgba(0,0,0,0.3);*/
    color: #607d8d;
    pointer-events: none;
  }

  .holiday {
    background: tomato;
    color: #fff;
    pointer-events: none;
  }
</style>
