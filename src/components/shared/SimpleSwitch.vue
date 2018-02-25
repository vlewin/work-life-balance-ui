<template>
  <div class="switch" v-bind:class="{ active: active }">
    <div class="switch-item open">
      <slot name="up"></slot>
    </div>
    <div class="switch-item close">
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
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    white-space: nowrap

    &.vertical
      flex-direction: column

    &.animated
      &.horizontal
        .switch-item
          transition-delay: 0.5s

      .switch-item
        transition: flex 0.5s, opacity 0.5s
        will-change: flex, opacity

    .switch-item
      width: 100%
      height: 100%
      overflow: hidden

      // &.active .switch-item.open
      //   transition: flex 1s, opacity 0.5s
      //
      // .switch-item.close
      //   transition: flex 0.5s, opacity 1s

    .switch-item.open, &.active .switch-item.close
      flex: 100%
      opacity: 1

    .switch-item.close, &.active .switch-item.open
      opacity: 0
      flex: 0
</style>
