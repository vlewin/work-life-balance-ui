<template>
  <div id="vertical-slider">
    <div id="vertical-slider-window" v-bind:class="[section]">
      <div class="vertical-slider-item top">
        <slot name="top"></slot>
      </div>
      <div class="vertical-slider-item middle">
        <!-- <button v-on:click="toggle('top')">UP</button> -->
        <slot name="middle"></slot>
        <!-- <button v-on:click="toggle('bottom')">DOWN</button> -->
      </div>
      <div class="vertical-slider-item bottom">
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
    }
  },

  props: {
    section: {
      type: String,
      default: "middle"
    }
  },

  mounted() {
    // this.$el.setAttribute("data-height", 11)
    this.$el.style.setProperty("--height", `${this.$root.$el.offsetHeight * 1}px`)
  },

  methods: {
    toggle(section) {
      this.section = section
    }
  }
}
</script>

<style scoped>
  #vertical-slider {
    width: 100%;
    height: 100%;
    overflow: hidden;
    height: var(--height);
    border-radius: 5px;
    box-shadow: 0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22);
  }

  #vertical-slider-window {
    transition: all 500ms;
    height: calc(var(--height) * 3);
    display: flex;
    flex-direction: column;
    transform: translateY(0vh);
  }

  #vertical-slider-window.top {
    transform: translateY(0);
  }

  #vertical-slider-window.middle {
    transform: translateY(calc(var(--height) * -1));
  }

  #vertical-slider-window.bottom {
    transform: translateY(calc(var(--height) * -2));
  }

  #vertical-slider .vertical-slider-item {
    overflow: hidden;
    transition: flex 0.3s;
    height: var(--height);
  }

  #vertical-slider .vertical-slider-item > * {
    height: 100%;
  }
</style>
