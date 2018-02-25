<template>
  <div id="info" class="flex flex-column flex-center" v-bind:class="[isHappy ? 'happy' : 'unhappy']">
    <!-- <div class="flex flex-center height-33">

    </div>
    <div class="height-33">
    </div>
    <div class="height-33">

    </div> -->

    <div>
      <i class="wi wi-night-sleet"></i>
      &nbsp;+20&deg;C
    </div>

    <h1>{{ duration }} Hours</h1>

    <h4 v-if="isHappy">
      <i class="fa fa-smile-o" aria-hidden="true"></i>
      Happy!
    </h4>

    <h4 v-else>
      <i class="fa fa-frown-o" aria-hidden="true"></i>
      Unhappy!
    </h4>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {}
  },

  props: {
    duration: {
      default: "N/A"
    },
    total: {
      default: "N/A"
    }
  },

  computed: {
    isHappy() {
      return this.duration >= 8 && this.duration <= 9
    }
  },

  methods: {
    navigate(page) {
      console.log("Navigate", page, this.$parent.page)
      this.$parent.page = page
    }
  }
}
</script>

<style lang="sass">
  @import '~@/assets/_variables.sass'

  #info
    height: 40vh
    width: 40vh
    border-radius: 50%
    border: 2vh solid $mid-grey
    justify-content: space-around

    &.happy
      border: 2vh solid $green
    &.unhappy
      border: 2vh solid $tomato

    h1, h4
      margin: 0
</style>
