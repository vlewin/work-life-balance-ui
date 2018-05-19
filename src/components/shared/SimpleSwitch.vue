<template>
  <div class="switch">
    <div class="switch-item" v-bind:class="{ collapsed: active }">
      <slot name="up"></slot>
    </div>
    <div class="switch-item" v-bind:class="{ collapsed: !active }">
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
  .switch
    display: flex
    flex-direction: column
    justify-content: flex-start
    height: 100%
    white-space: nowrap

    button
      font-weight: bold
      // width: 100%
      height: 100%
      font-size: 100%
      background: transparent
      border: none
      outline: none

    // sadly, we're required to set at least the container height explicitly

    &.horizontal
      flex-direction: row

  .switch-item
    overflow: hidden
    // transition: all 0.3s ease-out

    // transition-delay: 0.5s
    transition: flex 0.3s ease-out 0.3s, opacity 0.3s ease-out 0.3s
    will-change: flex, opacity

    height: auto
    flex: 1
    opacity: 1
    z-index: 1

    &.collapsed
      flex: 0
      opacity: 0
      z-index: 0

</style>
