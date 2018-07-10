<template>
  <div slot="body" class="button-group" :class="{ active: isFocused }">
    <div class="button-group-item uppercase"
      v-for="(button, i) in buttons" :key="i"
      v-bind:class="[{ focused: button.focused }, button.color ]"
      v-on:click="setFocused(button)">
      {{ button.name }}
    </div>

    <div class="button-group-item close" :class="{ focused: isFocused }" v-on:click="reset()">CANCEL</div>
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
    buttons: {
      type: Array
    }
  },

  computed: {
    isFocused() {
      return this.buttons.some((button) => button.focused)
    }
  },

  methods: {
    // isFocused() {
    //   return this.buttons.some((button) => button.focused)
    // },

    setFocused(button) {
      console.log('setFocused', button.name)
      button.focused = true
      // if (this.focused === index) {
      //   // console.log("Reset", index)
      //   // this.focused = null
      //   // this.$emit("changed", null)
      // } else {
      //   console.log("Set", index)
      //   this.focused = index
      //   this.$emit("changed", this.buttons[index])
      // }

      this.$emit("changed", button.name)
    },

    reset() {
      console.log("Changed", null)
      this.buttons.forEach((button) => button.focused = false)
      this.$emit("changed", null)
    }
  }
}
</script>

<style lang="sass">
.button-group
  display: flex
  justify-content: center
  align-items: center
  background: #eee
  width: 100%
  height: 100%

  &.vertical
    flex-direction: row

  &.horizontal
    flex-direction: column

    .button-group-item
      width: 100%

  &:not(.active)
    .button-group-item
      flex: 1

      &.close
        flex: 0

  &.active
    .button-group-item.focused
      flex: 0

    .button-group-item:not(.focused):not(.close)
      flex: 0

    .button-group-item.close
      flex: 1

  // .button-group-item styles
  .button-group-item
    height: 100%
    overflow: hidden
    transition: flex 0.3s
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    color: white
    font-weight: bold
    position: relative

    &.close
      background: #3C537A
      background: rgba(0, 0, 0, 0.4)
      // color: black
</style>
