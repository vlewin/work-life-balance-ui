<template>
  <div class="number-picker">
    <div class="width-100 height-20 amber">
      <span>30</span>
    </div>
    <ul class="flex-container">
      <li class="flex-item" v-for="value in values" v-bind:class="{ disabled: !setable.includes(value), selected: selected === value }" v-on:click="select(value)">
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NumberPicker",
  components: {},

  data() {
    return {
      values: [0, 15, 30, 45, 60, 90, 120, 180, 240],
      selected: 30
    };
  },

  computed: {
    setable() {
      return this.values;
    }
  },

  methods: {
    select(value) {
      this.selected = value;
      this.$emit("changed", value);
    }
  }
};
</script>

<style scoped>
.number-picker {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.number-picker > div {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;
  color: #fff;
  font-weight: bold;
}

.number-picker div > span {
  background: rgba(0, 0, 0, 0.1);
  width: 4rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  vertical-align: middle;
  display: inline-block;
}

.number-picker li {
  /*border: 1px solid #eee;*/
  margin: 10px;
}

.number-picker li:not(.selected) {
  background: rgba(0, 0, 0, 0.1);
}

.number-picker li.selected {
  background: #42b983;
  color: #fff;
}

.flex-container {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 80%;
  height: 80%;
}

.flex-item {
  flex: 0 0 calc(100% / 5);
  text-align: center;
  vertical-align: middle;
  padding: 1rem;
  /*font-size: 130%;*/
  font-weight: bold;
  color: #444;
  cursor: pointer;
}

.flex-item:hover {
  background: #eee;
}

.disabled {
  color: #ddd;
  pointer-events: none;
}
</style>
