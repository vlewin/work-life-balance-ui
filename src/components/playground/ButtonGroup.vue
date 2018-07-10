<template>
  <div slot="body" class="button-group">
    <div class="button-group-item"
      v-for="(button, i) in buttons"
      v-bind:class="[{ focused: isFocused(i) }, button.color ]"
      v-on:click="setFocused(i)">
      {{ button.name }}
    </div>
    <!-- <div class="button-group-item left green" v-bind:class="{ focused: isFocused(0) }" v-on:click="setFocused(0)">
      <slot name="left"></slot>
      <slot name="top"></slot>
    </div>
    <div class="button-group-item center amber" v-bind:class="{ focused: isFocused(1) }" v-on:click="setFocused(1)">
      <slot name="center"></slot>
      <slot name="middle"></slot>
    </div>
    <div class="button-group-item right tomato" v-bind:class="{ focused: isFocused(2) }" v-on:click="setFocused(2)">
      <slot name="right"></slot>
      <slot name="bottom"></slot>
    </div> -->
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

  },

  methods: {
    addClass(button) {

    },

    isFocused(field) {
      return this.focused === field
    },

    setFocused(index) {
      console.log("Focused", index)
      if (this.focused === index) {
        console.log("Reset", index)
        this.focused = null
        this.$emit("changed", this.buttons[index])
      } else {
        console.log("Set", index, this.buttons)
        this.focused = index
        this.$emit("changed", this.buttons[index])
      }
    }
  }
}
</script>

<style>
.button-group {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
  width: 100%;
  height: 100%;
}

.button-group.vertical {
  flex-direction: row;
}

.button-group.horizontal {
  flex-direction: column;
}

.button-group.horizontal .button-group-item {
  width: 100%;
}

.button-group-item {
  height: 100%;
  overflow: hidden;
  transition: flex 0.3s;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  color: white;
}

.button-group .button-group-item:not(.focused) {
  flex: 0%;
}

.button-group .button-group-item.focused {
  flex: 1 1 100%;
}

.button-group .button-group-item:not(.focused) {
  flex: 1 1 0%;
}
</style>
