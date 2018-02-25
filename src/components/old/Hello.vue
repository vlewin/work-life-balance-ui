<template>
  <div class="hello">
    <pre>
      {{now}}
      {{form}}
      {{hh}}
    </pre>

    <input type="time" v-model="form.start"/>
    <button v-on:click="set('start')">now</button>
    <input type="number" v-model="form.pause" step="5" min="0" max="100"/>
    <input type="time" v-model="form.end"/>
    <button v-on:click="set('end')">now</button>

    <p>
      Pause: {{ pause }}, duration: {{ duration }}, total: {{ total }}
    </p>

    <time-picker v-on:selected="selectedHours" :value="form.start" target="start"></time-picker>

    <time-picker v-on:selected="selectedHours" target="end"></time-picker>
    <button v-on:click="submit">Submit</button>
  </div>


</template>

<script>
import TimePicker from "./TimePicker"

export default {
  name: "Time",
  components: {
    TimePicker
  },

  data() {
    return {
      hh: null,
      today: this.$time(),
      now: this.$time(),
      form: {
        date: null,
        start: null,
        pause: null,
        estimatedPause: null,
        end: null
      }
    }
  },

  created() {
    this.init()
  },

  computed: {
    pause() {
      console.log("duration", this.duration)
      if (this.duration <= 6) {
        return 0
      } else if (this.duration > 6 && this.duration <= 9) {
        return 30
      } else if (this.duration > 9) {
        return 45
      }
      return "N/A"
    },

    duration() {
      const start = this.toTimeString(this.form.start)
      const end = this.toTimeString(this.form.end)
      return (
        end.subtract(this.form.pause, "minutes").diff(start, "minutes") / 60
      )
    },

    total() {
      const start = this.toTimeString(this.form.start)
      const end = this.toTimeString(this.form.end)
      return end.diff(start, "minutes") / 60
    }
  },

  watch: {
    // eslint-disable-next-line
      'form.start': function (val) {
      console.log(val)
      this.estimateEnd()
    },

    // eslint-disable-next-line
      'form.pause': function (val) {
      console.log(val)
      this.estimateEnd()
    },

    // eslint-disable-next-line
      'form.end': function (val) {
      console.log(val)
      this.estimatePause()
    }
  },

  methods: {
    init() {
      this.form.date = this.today
      this.form.start = this.now.format("HH:mm")
      this.form.pause = 30
      this.form.end = this.now.add(8, "h").format("HH:mm")
    },

    toTimeString(value) {
      return this.$time(value, "HH:mm")
    },

    set(input) {
      if (input === "start") {
        this.form.start = this.$time().format("HH:mm")
      } else {
        this.form.end = this.$time()
          .add(8, "h")
          .format("HH:mm")
      }
    },

    estimatePause() {
      console.log("estimatePause")
      if (this.duration <= 6) {
        this.form.estimatedPause = 0
      } else if (this.duration > 6 && this.duration <= 9) {
        this.form.estimatedPause = 30
      } else if (this.duration > 9) {
        this.form.estimatedPause = 45
      }
      return "N/A"
    },

    estimateEnd() {
      console.log("estimateEnd")
      this.form.end = this.toTimeString(this.form.start)
        .add(8, "h")
        .add(this.form.pause, "m")
        .format("HH:mm")
    },

    submit() {
      console.log(JSON.stringify(this.form))
    },

    select(value) {
      this.selected = value
    },

    selectedHours(target, value) {
      this.hh = value
      this.form[target] = value
      console.log("Button clicked", value)
    }
  }
}
</script>

<!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff6%2F27%2F91%2Ff62791a614fd3088b01ddd96756c6771.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F360217670180554802%2F&docid=YJuz1oGNIl5xnM&tbnid=xcixYzPxTJIKyM%3A&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800&h=600&bih=960&biw=1920&q=css3%20time%20picker&ved=0ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0&iact=mrc&uact=8#h=600&imgdii=Fir91c5_-DbctM:&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800 -->
<!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff6%2F27%2F91%2Ff62791a614fd3088b01ddd96756c6771.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F360217670180554802%2F&docid=YJuz1oGNIl5xnM&tbnid=xcixYzPxTJIKyM%3A&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800&h=600&bih=960&biw=1920&q=css3%20time%20picker&ved=0ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0&iact=mrc&uact=8 -->
<!-- http://www.cssscript.com/wp-content/uploads/2016/03/Beautiful-Material-Design-Date-Time-Picker.png -->
<!-- https://codepen.io/jaromvogel/pen/VeYqvB?page=2 -->
<!-- https://codepen.io/jaromvogel/pen/aNPRwG?page=3 -->
