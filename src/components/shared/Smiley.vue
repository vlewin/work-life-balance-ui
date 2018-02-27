<template>
  <div>
    <svg class="SvgSymbols" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <symbol id="SmileyGood" viewBox="0 0 64 64">
        <path class="SmileyOutline" d="M32 5c14.888 0 27 12.112 27 27S46.888 59 32 59 5 46.888 5 32 17.112 5 32 5m0-5C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0z"/>
        <path class="SmileyEyes SmileyEyes--typeNeutral" d="M15.036 25.84a5 5 0 1 0 10 0 5 5 0 1 0-10 0m23.928 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0"/>
        <path class="SmileyMouth SmileyMouth--typeGood" d="M49.69 38.157a2.5 2.5 0 0 0-3.533.153c-.057.062-5.77 6.19-13.96 6.19-8.163 0-14.34-6.178-14.41-6.25a2.5 2.5 0 1 0-3.58 3.493c.31.316 7.67 7.756 17.99 7.756 10.365 0 17.353-7.494 17.645-7.814a2.497 2.497 0 0 0-.153-3.53z"/>
      </symbol>
      <symbol id="SmileyNeutral" viewBox="0 0 64 64">
        <path class="SmileyOutline" d="M32 5c14.888 0 27 12.112 27 27S46.888 59 32 59 5 46.888 5 32 17.112 5 32 5m0-5C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0z"/>
        <path class="SmileyEyes SmileyEyes--typeNeutral" d="M15.036 25.84a5 5 0 1 0 10 0 5 5 0 1 0-10 0m23.928 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0"/>
        <path class="SmileyMouth SmileyMouth--typeNeutral" d="M48 41H16a2.5 2.5 0 0 0 0 5h32a2.5 2.5 0 0 0 0-5z"/>
      </symbol>
      <symbol id="SmileyBad" viewBox="0 0 64 64">
        <path class="SmileyOutline" d="M32 5c14.888 0 27 12.112 27 27S46.888 59 32 59 5 46.888 5 32 17.112 5 32 5m0-5C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0z"/>
        <path class="SmileyEyes SmileyEyes--typeNeutral" d="M15.036 25.84a5 5 0 1 0 10 0 5 5 0 1 0-10 0m23.928 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0"/>
        <path class="SmileyMouth SmileyMouth--typeBad" d="M49.79 45.256c-.307-.316-7.667-7.756-17.988-7.756-10.365 0-17.353 7.49-17.645 7.81A2.502 2.502 0 0 0 16 49.5a2.49 2.49 0 0 0 1.842-.81c.057-.063 5.77-6.19 13.96-6.19 8.164 0 14.34 6.177 14.41 6.248a2.496 2.496 0 0 0 3.53.043 2.496 2.496 0 0 0 .05-3.532z"/>
      </symbol>
      <symbol id="SmileyDead" viewBox="0 0 64 64">
        <path class="SmileyOutline" d="M32 5c14.888 0 27 12.112 27 27S46.888 59 32 59 5 46.888 5 32 17.112 5 32 5m0-5C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0z"/>
        <path class="SmileyEyes SmileyEyes--typeDead" d="M25.34 20.537a2.501 2.501 0 0 0-3.537 0l-1.768 1.768-1.768-1.768a2.501 2.501 0 0 0-3.536 0 2.507 2.507 0 0 0 0 3.536l1.77 1.767-1.766 1.768a2.498 2.498 0 0 0 1.768 4.267 2.5 2.5 0 0 0 1.77-.732l1.767-1.768 1.767 1.768c.488.488 1.128.732 1.768.732s1.28-.244 1.768-.732a2.498 2.498 0 0 0 0-3.535l-1.767-1.768 1.768-1.767a2.501 2.501 0 0 0 0-3.536zM47.5 25.84l1.768-1.767a2.5 2.5 0 1 0-3.536-3.536l-1.768 1.768-1.768-1.768a2.501 2.501 0 0 0-3.536 3.536l1.768 1.767-1.768 1.768a2.498 2.498 0 0 0 1.768 4.267c.64 0 1.28-.244 1.768-.732l1.768-1.768 1.768 1.768c.488.488 1.128.732 1.768.732s1.28-.244 1.768-.732a2.5 2.5 0 0 0 0-3.535L47.5 25.84z"/>
        <path class="SmileyMouth SmileyMouth--typeDead" d="M37 36.107H27c-4.136 0-7.5 3.364-7.5 7.5s3.364 7.5 7.5 7.5h10c4.136 0 7.5-3.364 7.5-7.5s-3.365-7.5-7.5-7.5zm0 10H27c-1.378 0-2.5-1.12-2.5-2.5s1.122-2.5 2.5-2.5h10a2.5 2.5 0 0 1 0 5z"/>
      </symbol>
    </svg>

    <div v-if="mood === 'good'" class="SvgContainer DemoSmiley DemoSmiley--typeGood">
      <svg class="Svg" viewBox="0 0 64 64">
        <use xlink:href="#SmileyGood"></use>
      </svg>
    </div>

    <div v-if="mood === 'neutral'" class="SvgContainer DemoSmiley DemoSmiley--typeNeutral">
      <svg class="Svg" viewBox="0 0 64 64">
        <use xlink:href="#SmileyNeutral"></use>
      </svg>
    </div>

    <div v-if="mood === 'bad'" class="SvgContainer DemoSmiley DemoSmiley--typeBad">
      <svg class="Svg" viewBox="0 0 64 64">
        <use xlink:href="#SmileyBad"></use>
      </svg>
    </div>

    <div v-if="mood === 'dead'" class="SvgContainer DemoSmiley DemoSmiley--typeDead">
      <svg class="Svg" viewBox="0 0 64 64">
        <use xlink:href="#SmileyDead"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Smiley",
  data() {
    return {
      // focused: null
      active: false
    }
  },

  props: {
    mood: {
      type: String,
      default: "good"
    }
  },

  mounted() {
    this.$el.setAttribute("data-height", 11)
    const $root = this.$root.$el
    this.$el.style.setProperty("--height", `${$root.offsetHeight * 0.9}px`)
  },

  methods: {
    toggle(section) {
      this.section = section
    }
  }
}
</script>

<style lang="sass">
  @import '~@/assets/_variables.sass'

  .SvgSymbols
    clip: rect(0 0 0 0)
    position: absolute
    overflow: hidden
    margin: -0.1rem
    padding: 0
    width: 0.1rem
    height: 0.1rem
    border: 0

  .SvgContainer
    opacity: 0.75
    display: flex
    justify-content: center
    align-items: center

    .Svg
      width: 80%
      height: 80%
      overflow: visible
    .Svg--heightAuto
      height: auto

  .Svg
    fill: currentColor

  .DemoSmiley--typeGood .Svg
    // fill: #a2e261
    fill: $green
  .DemoSmiley--typeNeutral .Svg
    // fill: #ffd117
    fill: $mid-grey
  .DemoSmiley--typeBad .Svg
    fill: $red
    // fill: #ff576f
  .DemoSmiley--typeDead .Svg
    fill: #ca8cff
</style>
