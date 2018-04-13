<template>
  <div class="wrapper">
    <div class="simple-slider" v-bind:class="{ active: active }">
      <slot name="up"></slot>
      <slot name="down"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimpleSwitch",
  data() {
    return {
      time: "",
      timeout: null
    }
  },

  props: {
    animationSpeed: {
      type: Boolean
    },

    active: {
      type: Boolean
    }
  }
}
</script>

<style lang="sass" scoped>
  .wrapper
    width: 100%
    height: 100%
    background: #fff
    overflow: hidden

  .simple-slider
    width: 100%
    height: 200%
    overflow: hidden
    display: flex
    flex-direction: column
    // transition: transform 0.5s ease-in-out
    // transition: transform .5s ease
    transition: transform 0.75s, opacity 0.75s ease-in-out
    will-change: transform, opacity

  .simple-slider.active
    transform: translateY(-50%)

  .simple-slider-item
    width: 100%
    height: 100%

</style>
