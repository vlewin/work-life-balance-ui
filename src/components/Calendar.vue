<template>

  <div class="calendar">
    <!-- <li class="grid-item label"><small>&laquo;</small></li>
    <li class="grid-item label"><small>TODAY</small></li>
    <li class="grid-item label"><small>&raquo;</small></li> -->
    <div>CURRENT DATE</div>

    <ul class="grid">
      <li class="grid-item" v-for="date in dates" :class="{ selected: selected.includes(date), green: date % 3, red: date % 10, weekend: (date % 7 === 0) }" v-on:click="select(date)">
        <small>
          {{ date }}.09
        </small>
        <div>
          {{ Math.floor(Math.random() * (9 - 6) + 6, 2) }}
        </div>
      </li>
    </ul>

    <div>
      Selected: {{ selected }}
    </div>

    <div class="comment">
      <div class="comment-item">
        <span>*</span>
        VACATION
      </div>
      <div class="comment-item">
        <span>*</span>
        SICKNESS
      </div>
      <div class="comment-item">
        <span>*</span>
        HOLIDAY
      </div>
    </div>
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
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(7, 2rem);
    grid-template-rows: repeat(5, 2rem);
    grid-gap: 2px;
    background-color: #grey;
    color: #444;
    padding: 0;
  }

  .grid-item {
    background-color: #444;
    color: #fff;
    cursor: pointer;
    list-style: none;
    text-align: center;
    vertical-align: middle;
    justify-content: center;
    align-items: center;
    /*border-radius: 5px;
    padding: 20px;*/
  }



  .red {
    background: tomato;
  }

  .green {
    background: #42b983;
  }

  .weekend, .disabled {
    background: #ddd;
    pointer-events: none;
  }

  .selected {
    background: blue;
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
