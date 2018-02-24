<template>
  <div class="calendar">
    <!-- <p class="month">
      <span v-on:click="prevMonth()">&laquo;</span>
      {{ currentMonth }} ({{ year }})
      <span v-on:click="nextMonth()">&raquo;</span>
    </p> -->

    <ul class="grid">
      <li class="grid-item label" v-for="weekday in weekdays" v-bind:class="{ weekend: ['SA', 'SU'].includes(weekday) }">
        {{ weekday }}
      </li>

      <li class="grid-item round day" v-for="(day, i) in days" v-on:click="select(day)"
        :class="{ selected: isSelected(day), weekend: isWeekend(i), holiday: isHoliday(day) }">
        {{ day | toNumber }}
        <span class="tooltiptext" v-if="isHoliday(day)">{{ isHoliday(day) }}</span>
      </li>
    </ul>

    <div class="balance light-grey">
      <span>VACATION: {{ vacationRestDays }} days</span>
      <span>SICKNESS: {{ seeknessDays }} days</span>
    </div>
  </div>
</template>

<script>
  Array.range = (start, end) => [...Array((end - start) + 1)].map((_, i) => (start + i).toString().padStart(2, '0'))

  import Calendator from 'calendator'
  import holiday from 'german-holiday'
  const calendator = new Calendator(Calendator.MON)

  export default {
    name: 'Calendar',
    data () {
      return {
        month: this.date.getMonth(),
        year: this.date.getFullYear(),
        weekdays: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'],
        selected: []
      }
    },

    props: {
      date: {
        type: Date
      },

      value: {
        type: String
      },

      target: {
        required: false
      }
    },

    created () {
    },

    filters: {
      toNumber: function (value) {
        return value ? value.getDate() : null
      }
    },

    computed: {
      weeks() {
        return calendator.giveMeCalendarForMonthYear(this.date.getMonth(), this.date.getFullYear())
      },

      currentMonth () {
        return this.date.toLocaleString('en-US', {month: 'long'})
      },

      days () {
        return this.weeks.reduce((a, b) => a.concat(b)).map((d) => {
          return d ? new Date(this.date.getFullYear(), this.date.getMonth(), d) : null
        })
      },

      vacationRestDays() {
        // TODO: Number of vacation days from settings
        return 30 - this.selected.length
      },

      seeknessDays() {
        return this.selected.length
      }
    },

    watch: {
    },

    methods: {
      isSelected(date) {
        return this.selected.includes(date)
      },

      isWeekend (day) {
        return [5, 6].includes(day % 7)
      },

      isHoliday(date) {
        return date && holiday.holidayCheck(date, 'BY')
      },

      prevMonth () {
        if (this.month === 1) {
          this.month = 11
          this.year -= 1
        } else {
          this.month -= 1
        }

        console.log('prevMonth', this.month, this.year)

        this.weeks = calendator.giveMeCalendarForMonthYear(this.month, this.year)
      },

      nextMonth () {
        if (this.month === 11) {
          this.month = 0
          this.year += 1
        } else {
          this.month += 1
        }

        console.log('nextMonth', this.month, this.year)

        this.weeks = calendator.giveMeCalendarForMonthYear(this.month + 1, 2017)
      },

      select (date) {
        if (this.selected.includes(date)) {
          this.selected.splice(this.selected.indexOf(date), 1)
        } else {
          this.selected.push(date)
        }
      }
    }
  }
</script>

<style scoped>
  .calendar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    /*height: 100%;*/
    width: 100%;
  }

  .month {
    color: #444;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /*padding: 10px;*/
    padding: 2% 0;
    min-width: 70%;
    margin: 0;
    text-transform: uppercase;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
    grid-row-gap: 0.2rem;
    grid-column-gap: 0.2rem;

    width: 100%;
    height: 75%;
    padding: 0;

    justify-items: center;
    align-items: center;
  }

  .grid-item {
    display: inline-block;
    color: #444;
    list-style: none;
    height: 2.2rem;
    width: 2.2rem;
    line-height: calc(2.2rem - 0.2rem);
    text-align: center;
    border: 0.1rem solid #fff;
  }

  .grid-item:not(.label):not(.weekend):not(.holiday) {
    cursor: pointer;
  }

  .grid-item:not(.label):not(.weekend):not(.selected):not(.holiday):hover {
    background: rgba(0,0,0,0.1);
  }

  .grid-item.selected {
    border: 0.1rem solid #308FF0;
    color: #308FF0;
  }

  .label {
    color: #888;
    font-size: 80%;
    font-weight: bold;
  }

  .label, .weekend {
    pointer-events: none;
  }

  .label.weekend {
    color: tomato;
  }

  .day.weekend {
    color: #ddd;
  }

  .holiday {
    background: tomato;
    border: 0.1rem solid tomato;
    color: #fff !important;
  }

  .green {
    background: #42b983;
  }

  .disabled {
    color: #ddd;
    pointer-events: none;
  }

  .comment {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .comment-item {
    background: #fff;
    padding: 5px;
    margin: 5px;
  }

  .balance {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 80%;
    width: 100%;
    height: 15%;
  }

  @media only screen and (min-width:600px) {
    .grid {

    }
  }

</style>

<style>
  /* Tooltip container */
  .holiday {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
  }

  /* Tooltip text */
  .holiday .tooltiptext {
    visibility: hidden;
    width: 5rem;
    background-color: rgba(0,0,0,0.5);
    color: #fff;
    text-align: center;
    position: absolute;
    z-index: 1;
    font-size: 0.2rem;
    margin: -2.4rem -2.7rem;
    padding: 0 0.2rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 1rem;
    overflow: hidden;
  }

  .holiday:hover .tooltiptext {
    visibility: visible;
  }
</style>

<!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff6%2F27%2F91%2Ff62791a614fd3088b01ddd96756c6771.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F360217670180554802%2F&docid=YJuz1oGNIl5xnM&tbnid=xcixYzPxTJIKyM%3A&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800&h=600&bih=960&biw=1920&q=css3%20time%20picker&ved=0ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0&iact=mrc&uact=8#h=600&imgdii=Fir91c5_-DbctM:&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800 -->
<!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff6%2F27%2F91%2Ff62791a614fd3088b01ddd96756c6771.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F360217670180554802%2F&docid=YJuz1oGNIl5xnM&tbnid=xcixYzPxTJIKyM%3A&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800&h=600&bih=960&biw=1920&q=css3%20time%20picker&ved=0ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0&iact=mrc&uact=8 -->
<!-- http://www.cssscript.com/wp-content/uploads/2016/03/Beautiful-Material-Design-Date-Time-Picker.png -->
<!-- https://codepen.io/jaromvogel/pen/VeYqvB?page=2 -->
<!-- https://codepen.io/jaromvogel/pen/aNPRwG?page=3 -->
