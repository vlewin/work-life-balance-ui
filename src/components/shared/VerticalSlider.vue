<template>
  <div class="vertical-slider" v-bind:class="[section]">
    <div class="vertical-slider-window">
      <div class="slider-item top" v-on:click.stop="toggle('middle')">
        <slot name="top"></slot>
      </div>
      <div class="slider-item middle">
        <!-- <button v-on:click="toggle('top')">UP</button> -->
        <slot name="middle"></slot>
        <!-- <button v-on:click="toggle('bottom')">DOWN</button> -->
      </div>
      <div class="slider-item bottom">
      <!-- <div class="slider-item bottom" v-on:click.prevent.stop="toggle('middle')"> -->
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerticalSlider",
  data() {
    return {
      // focused: null
      active: false
    }
  },

  props: {
    section: {
      type: String,
      default: "middle"
    }
  },

  methods: {
    toggle(section) {
      this.section = section
    }
  }
}
</script>

<style>
.vertical-slider {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
}

.vertical-slider-window {
  transition: all 500ms;
  height: 300vh;
  display: flex;
  flex-direction: column;
  transform: translateY(-100vh);
}

.vertical-slider.top .vertical-slider-window {
  transform: translateY(0vh);
}

.vertical-slider.middle .vertical-slider-window {
  transform: translateY(-100vh);
}

.vertical-slider.bottom .vertical-slider-window {
  transform: translateY(-200vh);
}

.vertical-slider .slider-item {
  height: 100%;
  overflow: hidden;
  transition: flex 0.3s;
  /* display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer; */
}

.vertical-slider .slider-item > * {
  /* display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%; */
}

.top {
  background: tomato;
}
.middle {
  background: #ffbf00;
}
.bottom {
  background: #42b983;
}
</style>
