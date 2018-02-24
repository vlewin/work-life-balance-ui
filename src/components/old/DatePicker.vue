<template>
  <div class="date-picker">
    <ul class="flex-container">
      <li class="flex-item label"><small>&laquo;</small></li>
      <li class="flex-item" v-for="date in dates" :class="{ selected: date === 5 }">
        {{ date }}
      </li>
      <li class="flex-item label"><small>&raquo;</small></li>
    </ul>
  </div>
</template>

<script>
Array.range = (start, end) =>
  [...Array(end - start + 1)].map((_, i) =>
    (start + i).toString().padStart(2, "0")
  );

export default {
  name: "DatePicker",
  data() {
    return {
      dates: Array.range(0, 7)
    };
  },

  props: {
    value: {
      type: String
    },

    target: {
      required: false
    }
  },

  created() {},

  computed: {},

  watch: {
    value(val) {}
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
  }
};
</script>

<style scoped>
.time-picker {
  margin: 0 0 20px 0;
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
  justify-content: space-between;
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
