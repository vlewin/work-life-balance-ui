<template>
  <div slot="body" class="slider">
    <div class="slider-item left green" v-bind:class="{ focused: isFocused(0) }" v-on:click="setFocused(0)">
      <slot name="left"></slot>
      <slot name="top"></slot>
    </div>
    <div class="slider-item center amber" v-bind:class="{ focused: isFocused(1) }" v-on:click="setFocused(1)">
      <slot name="center"></slot>
      <slot name="middle"></slot>
    </div>
    <div class="slider-item right tomato" v-bind:class="{ focused: isFocused(2) }" v-on:click="setFocused(2)">
      <slot name="right"></slot>
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slider",
  data() {
    return {
      focused: null
    }
  },

  props: {
  },

  methods: {
    isFocused(field) {
      return this.focused === field
    },

    setFocused(field) {
      console.log("Focused", field)
      if (this.focused === field) {
        console.log("Reset", field)
        this.focused = null
        this.$emit("changed", this.focused)
      } else {
        console.log("Set", field)
        this.focused = field
        this.$emit("changed", this.focused)
      }
    }
  }
}
</script>

<style>
.slider {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
  width: 100%;
  height: 100%;
}

.slider.vertical {
  flex-direction: row;
}

.slider.horizontal {
  flex-direction: column;
}

.slider.horizontal .slider-item {
  width: 100%;
}

.slider .slider-item {
  height: 100%;
  overflow: hidden;
  transition: flex 0.3s;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}

.slider .slider-item > * {
  /* display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%; */
}

.slider .slider-item:not(.focused) {
  flex: 1 1 33%;
}

/*.slider .slider-item.left {
    background: tomato;
  }
  .slider .slider-item.center {
    background: #FFBF00;
  }
  .slider .slider-item.right {
    background: #42b983;
  }*/

.slider .slider-item.focused {
  flex: 1 1 100%;
}

.slider .slider-item:not(.focused) {
  flex: 1 1 0%;
}
</style>
