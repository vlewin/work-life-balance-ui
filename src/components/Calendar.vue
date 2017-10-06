<template>
  <div class="calendar">
    <p class="month">
      <span v-on:click="prevMonth()">&laquo;</span>
      {{ currentMonth }} ({{ year }})
      <span v-on:click="nextMonth()">&raquo;</span>
    </p>

    <ul class="grid">
      <li class="grid-item label" v-for="weekday in weekdays" v-bind:class="{ weekend: ['SAT', 'SUN'].includes(weekday) }">
        {{ weekday }}
      </li>

      <li class="grid-item day" v-for="(day, i) in days" :class="{ selected: selected.includes(day), weekend: isWeekend(i) }" v-on:click="select(day)">
        {{ day }}
      </li>
    </ul>

    <!-- <div class="balance">
      <span>VACATION: 20 days</span>
      <span>SICKNESS: 2 days</span>
    </div> -->
  </div>
</template>

<script>
  Array.range = (start, end) => [...Array((end - start) + 1)].map((_, i) => (start + i).toString().padStart(2, '0'))

  import Calendator from 'calendator'
  const calendator = new Calendator(Calendator.MON)

  export default {
    name: 'Calendar',
    data () {
      return {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        weekdays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        weeks: calendator.giveMeCalendarForMonthYear(new Date().getMonth(), 2017),
        selected: []
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
    },

    computed: {
      currentMonth () {
        const date = new Date(this.year, this.month, 1)
        return date.toLocaleString('en-US', {month: 'long'})
      },

      days () {
        return this.weeks.reduce((a, b) => a.concat(b))
      }
    },

    watch: {
    },

    methods: {
      isWeekend (day) {
        return [5, 6].includes(day % 7)
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
        console.log('Select', date)
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
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
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
    grid-gap: 0.2vw;
    width: 88%;
    height: 80%;
    padding: 0;
    margin: 0;
    justify-content: center;
    align-items: center;
  }


  .grid-item {
    color: #444;
    list-style: none;
    text-align: center;
    vertical-align: middle;
  }

  .grid-item:not(.label):not(.weekend) {
    cursor: pointer;
  }

  .grid-item:not(.label):not(.weekend):not(.selected):hover {
    background: rgba(0,0,0,0.1);
  }

  .grid-item.selected {
    background: #308FF0;
    color: #fff;
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

  .red {
    background: tomato;
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
    padding: 2vh;
  }

  @media only screen and (min-width:600px) {
    .grid {

    }
  }

</style>

<!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff6%2F27%2F91%2Ff62791a614fd3088b01ddd96756c6771.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F360217670180554802%2F&docid=YJuz1oGNIl5xnM&tbnid=xcixYzPxTJIKyM%3A&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800&h=600&bih=960&biw=1920&q=css3%20time%20picker&ved=0ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0&iact=mrc&uact=8#h=600&imgdii=Fir91c5_-DbctM:&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800 -->
<!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff6%2F27%2F91%2Ff62791a614fd3088b01ddd96756c6771.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F360217670180554802%2F&docid=YJuz1oGNIl5xnM&tbnid=xcixYzPxTJIKyM%3A&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800&h=600&bih=960&biw=1920&q=css3%20time%20picker&ved=0ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0&iact=mrc&uact=8 -->
<!-- http://www.cssscript.com/wp-content/uploads/2016/03/Beautiful-Material-Design-Date-Time-Picker.png -->
<!-- https://codepen.io/jaromvogel/pen/VeYqvB?page=2 -->
<!-- https://codepen.io/jaromvogel/pen/aNPRwG?page=3 -->
