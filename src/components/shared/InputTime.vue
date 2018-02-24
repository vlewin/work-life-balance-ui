<template>
  <div class="input-time">
    <div class="input-time-field hours" v-for="(hour, index) in hours" v-bind:class="{ current: current == index, set: isDirty(hour) }">
      <div class="input-time-field-item">
        {{ hour.v }}
      </div>
      <div class="input-time-field-item">
        {{ hour.n }}
      </div>
    </div>

    <div class="input-time-separator">:</div>

    <div class="input-time-field minutes" v-for="(minute, index) in minutes"  v-bind:class="{ current: current == index+2, set: isDirty(minute) }">
      <div class="input-time-field-item">
        {{ minute.v }}
      </div>
      <div class="input-time-field-item">
        {{ minute.n }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputTime",
  data() {
    return {
      fields: [
        { v: "0", n: null },
        { v: "0", n: null },
        { v: "0", n: null },
        { v: "0", n: null }
      ],
      timeout: null,
      current: 0
    };
  },

  props: {
    initValue: {
      default: "",
      type: String
    },

    value: {
      type: String
    }
  },

  computed: {
    hours() {
      return Array.from(this.fields).slice(0, 2);
    },

    minutes() {
      return Array.from(this.fields).slice(2);
    }
  },

  watch: {
    initValue(val) {
      if (val) {
        // console.log("InputTime - initValue change", val);
        val
          .replace(":", "")
          .split("")
          .forEach((v, index) => {
            this.fields[index].v = v;
            this.fields[index].n = null;
          });
      } else {
        // console.error("InputTime - Empty initValue!!!");
        this.reset();
      }
    },

    value(val, oldVal) {
      console.log("InputTime - value change", val, oldVal);
      const value = val.replace(":", "");
      if (val.length > oldVal.length) {
        this.fields[this.current].n = value[this.current];
        this.next();
      } else if (oldVal && oldVal.length > val.length) {
        this.prev();
        this.fields[this.current].n = null;
      } else {
        console.error("InputTime - Empty value!!!");
        this.reset();
      }
    }
  },

  methods: {
    isDirty(value) {
      // console.log('InputTime - isDirty', JSON.stringify(value), !!value.n)
      return !!value.n;
    },

    next() {
      this.current += 1;
    },

    prev() {
      this.current -= 1;
    },

    reset() {
      // console.error("InputTime - reset in 500ms");
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        Object.assign(this.$data, this.$options.data.call(this));
      }, 500);
    }
  }
};
</script>

<style scoped>
.input-time {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2vw;
  cursor: pointer;
  font-size: 2rem;
  color: #fff;
  font-weight: bold;
}

.input-time-field {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 2rem;
  height: 3rem;
  text-align: center;
}

.input-time .input-time-field.hours:first-child {
  border-right: 1px solid rgba(255, 255, 255, 0.75);
}

.input-time .input-time-field.minutes:last-child {
  border-left: 1px solid rgba(255, 255, 255, 0.75);
}

.input-time-separator,
.input-time-field-item {
  line-height: 3rem;
}

.input-time-field .input-time-field-item {
  overflow: hidden;
  vertical-align: middle;
  text-align: center;
}

.input-time-field .input-time-field-item {
  transition: flex 0.5s, opacity 0.3s;
}

.input-time-field .input-time-field-item:first-child {
  flex: 1 1 100%;
  opacity: 1;
}

.input-time-field .input-time-field-item:last-child {
  flex: 1 1 0%;
  opacity: 0;
}

.input-time-field.set .input-time-field-item:first-child {
  flex: 1 1 0%;
  opacity: 0;
}

.input-time-field.set .input-time-field-item:last-child {
  flex: 1 1 100%;
  opacity: 1;
}

.input-time-field {
  background: rgba(0, 0, 0, 0.1);
}

.input-time-field.current {
  background: rgba(0, 0, 0, 0.5);
}

/*.input-time-field:hover div:first-child {
    flex:1 1 0%;
    opacity: 0;
  }

  .input-time-field:hover div:last-child {
    flex:1 1 100%;
    opacity: 1;
  }*/
</style>
