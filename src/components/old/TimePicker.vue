<template>
  <div class="time-picker">
    <!-- <span v-on:click="toggle()">{{ values.hh }}:{{ values.mm }}</span> -->
    <ul class="flex-container">
      <li class="flex-item label"><small>hh</small></li>
      <li class="flex-item" v-for="hour in hours[target]" :class="{ selected: hour === values.hh}" v-on:click="select('hh', hour)">
        {{ hour }}
      </li>
    </ul>
    <ul class="flex-container">
      <li class="flex-item label"><small>mm</small></li>
      <li class="flex-item" v-for="minute in minutes" :class="{ selected: minute === values.mm}" v-on:click="select('mm', minute)">
        {{ minute }}
      </li>
    </ul>
  </div>
</template>

<script>
Array.range = (start, end) =>
  [...Array(end - start + 1)].map((_, i) =>
    (start + i).toString().padStart(2, "0")
  )

export default {
  name: "TimePicker",
  data() {
    return {
      hours: {
        begin: Array.range(6, new Date().getHours()),
        start: Array.range(6, new Date().getHours()),
        end: Array.range(new Date().getHours(), 22)
      },
      minutes: Array.range(0, 55).filter(k => k % 5 === 0),
      elapsed: Array.range(6, new Date().getHours() - 1),
      timeout: null,
      visible: true,
      values: {
        hh: null,
        mm: null
      }
    }
  },

  props: {
    value: {
      type: String
    },

    target: {
      required: true
    }
  },

  created() {
    if (this.value && this.value.match(/^[0-9]{1,2}:[0-9]{1,2}$/)) {
      this.values.hh = this.value.split(":")[0]
      this.values.mm = this.round(this.value.split(":")[1])
        .toString()
        .padStart(2, "0")
    }
  },

  computed: {},

  watch: {
    value(val) {
      if (val && val.match(/^[0-9]{1,2}:[0-9]{1,2}$/)) {
        this.values.hh = val.split(":")[0]
        this.values.mm = this.round(val.split(":")[1])
          .toString()
          .padStart(2, "0")
      }
    }
  },

  methods: {
    // select (key, value) {
    //   this.values[key] = value
    //
    //   if (this.values.hh && this.values.mm) {
    //     this.$emit('selected', `${this.values.hh}:${this.values.mm}`, this.target)
    //     this.values = { hh: null, mm: null }
    //   }
    // }
    round(value) {
      return (parseInt(value) + 5 - parseInt(value) % 5) % 60
    },

    toggle() {
      this.visible = !this.visible
      if (this.visible) {
        this.$emit("open", this.target)
      } else {
        this.$emit("close", this.target)
      }
    },

    select(key, value) {
      this.values[key] = value
      // this.$emit('time-change', this.target, key, value)

      if (this.values.hh && this.values.mm) {
        clearTimeout(this.timeout)
        const time = `${this.values.hh}:${this.values.mm}`
        this.$emit("done", this.target, time)

        this.timeout = setTimeout(() => {
          // this.toggle()
        }, 2000)
        this.values = { hh: null, mm: null }
      }
    }
  }
}
</script>

<style scoped>
.time-picker {
  /*margin: 0 0 20px 0;*/
  width: 100%;
  background: white;
}
.row {
  flex-direction: row;
}

.flex-container {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-item {
  /*background: tomato;*/
  background: #ccc;

  padding: 4px;
  margin: 2px;
  width: 20px;
  height: 20px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  display: inline-block;
  color: #444;

  /*vertical-align: middle;*/
  /*display: inline-block;*/
}

.flex-item:not(.label) {
  cursor: pointer;
}

.flex-item.label {
  /*background: #f0f0f0;*/
  color: #444;
  user-select: none;
}

.disabled {
  background: #ddd;
}

.selected {
  background: #42b983;
}
</style>

<!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff6%2F27%2F91%2Ff62791a614fd3088b01ddd96756c6771.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F360217670180554802%2F&docid=YJuz1oGNIl5xnM&tbnid=xcixYzPxTJIKyM%3A&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800&h=600&bih=960&biw=1920&q=css3%20time%20picker&ved=0ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0&iact=mrc&uact=8#h=600&imgdii=Fir91c5_-DbctM:&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800 -->
<!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff6%2F27%2F91%2Ff62791a614fd3088b01ddd96756c6771.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F360217670180554802%2F&docid=YJuz1oGNIl5xnM&tbnid=xcixYzPxTJIKyM%3A&vet=10ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0..i&w=800&h=600&bih=960&biw=1920&q=css3%20time%20picker&ved=0ahUKEwjTmpO4tsLWAhXIWxoKHUVcD2A4ZBAzCDYoNDA0&iact=mrc&uact=8 -->
<!-- http://www.cssscript.com/wp-content/uploads/2016/03/Beautiful-Material-Design-Date-Time-Picker.png -->
<!-- https://codepen.io/jaromvogel/pen/VeYqvB?page=2 -->
<!-- https://codepen.io/jaromvogel/pen/aNPRwG?page=3 -->
