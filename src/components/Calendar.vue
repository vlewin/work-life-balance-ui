<template>
  <div class="calendar">
    <p class="month">
      <span>&laquo;</span>
      SEPTEMBER
      <span>&raquo;</span>
    </p>

    <ul class="grid">
      <li class="grid-item weekday">
        Mo
      </li>
      <li class="grid-item weekday">
        Di
      </li>
      <li class="grid-item weekday">
        Mi
      </li>
      <li class="grid-item weekday">
        Do
      </li>
      <li class="grid-item weekday">
        Fr
      </li>
      <li class="grid-item weekend">
        Sa
      </li>
      <li class="grid-item weekend">
        So
      </li>
      <li class="grid-item disabled">
        28
      </li>
      <li class="grid-item disabled">
        29
      </li>
      <li class="grid-item disabled">
        30
      </li>
      <li class="grid-item disabled">
        31
      </li>
      <li class="grid-item" v-for="date in dates" :class="{ selected: selected.includes(date)}" v-on:click="select(date)">
        {{ date }}
      </li>
      <li class="grid-item disabled">
        1
      </li>
    </ul>

    <!-- <div class="comment">
      <div class="comment-item">
        VACATION
      </div>
      <div class="comment-item">
        SICKNESS
      </div>
      <div class="comment-item">
        HOLIDAY
      </div>
    </div> -->
  </div>
</template>

<script>
  Array.range = (start, end) => [...Array((end - start) + 1)].map((_, i) => (start + i).toString().padStart(2, '0'))

  export default {
    name: 'Calendar',
    data () {
      return {
        dates: Array.range(1, 30),
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
    },

    watch: {
      value (val) {

      }
    },

    methods: {
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
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    width: 50%;
    margin: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(7, 2.5rem);
    grid-template-rows: repeat(5, 2.5rem);
    grid-gap: 5px;
    padding: 0;
    margin: 0;
    justify-content: center;
    align-items: center;
  }

  .grid-item {
    color: #444;
    cursor: pointer;
    list-style: none;
    text-align: center;
    vertical-align: middle;
  }

  .weekday {
    /*color: #308FF0;*/
    font-weight: bold;
    color: #aaa;
  }

  .weekend {
    /*color: #f95738;*/
    color: tomato;
    font-weight: bold;
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

  .selected {
    background: #308FF0;
    color: #fff;
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

</style>

<!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff6%2F27%2F91%2Ff62791a614fd3088b01ddd96756c6771.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F360217670180554802%2F&docid=YJuz1oGNIl5xnM&tbnid=xcixYzPxTJIKyM%3A&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800&h=600&bih=960&biw=1920&q=css3%20time%20picker&ved=0ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0&iact=mrc&uact=8#h=600&imgdii=Fir91c5_-DbctM:&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800 -->
<!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff6%2F27%2F91%2Ff62791a614fd3088b01ddd96756c6771.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F360217670180554802%2F&docid=YJuz1oGNIl5xnM&tbnid=xcixYzPxTJIKyM%3A&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800&h=600&bih=960&biw=1920&q=css3%20time%20picker&ved=0ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0&iact=mrc&uact=8 -->
<!-- http://www.cssscript.com/wp-content/uploads/2016/03/Beautiful-Material-Design-Date-Time-Picker.png -->
<!-- https://codepen.io/jaromvogel/pen/VeYqvB?page=2 -->
<!-- https://codepen.io/jaromvogel/pen/aNPRwG?page=3 -->
