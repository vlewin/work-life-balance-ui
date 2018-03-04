<template>
  <div class="flex flex-center">
    <svg viewBox="0 0 64 64" :class="[mood]">
      <path d="M32 5c14.888 0 27 12.112 27 27S46.888 59 32 59 5 46.888 5 32 17.112 5 32 5m0-5C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0z"/>
      <path d="M15.036 25.84a5 5 0 1 0 10 0 5 5 0 1 0-10 0m23.928 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0"/>
      <path class="mouth" d="M48 41H16a2.5 2.5 0 0 0 0 5h32a2.5 2.5 0 0 0 0-5z">
        <!-- <animateTransform id="path" attributeName="d"
          type="translate"
          from="M48 41H16a2.5 2.5 0 0 0 0 5h32a2.5 2.5 0 0 0 0-5z"
          to="M49.69 38.157a2.5 2.5 0 0 0-3.533.153c-.057.062-5.77 6.19-13.96 6.19-8.163 0-14.34-6.178-14.41-6.25a2.5 2.5 0 1 0-3.58 3.493c.31.316 7.67 7.756 17.99 7.756 10.365 0 17.353-7.494 17.645-7.814a2.497 2.497 0 0 0-.153-3.53z"
          begin="0s"
          dur="2s"
          repeatCount="indefinite"
        /> -->
      <!-- <line id="line" x1="0" y1="0" x2="100" y2="50" stroke="#000000" stroke-width="4"/> -->
      <!-- <animate id="path" attributeName="d" keyTimes = "0; .7; .8; .9; 1" from="M48 41H16a2.5 2.5 0 0 0 0 5h32a2.5 2.5 0 0 0 0-5z" to="M49.69 38.157a2.5 2.5 0 0 0-3.533.153c-.057.062-5.77 6.19-13.96 6.19-8.163 0-14.34-6.178-14.41-6.25a2.5 2.5 0 1 0-3.58 3.493c.31.316 7.67 7.756 17.99 7.756 10.365 0 17.353-7.494 17.645-7.814a2.497 2.497 0 0 0-.153-3.53z" dur="5s" fill="freeze"/> -->
      </path>
      <!-- <animate
            attributeName="x"    // Attribut, das animiert wird
            begin="2s"           // mit einer Verzögerung
            dur="1s"             // Dauer 1s
            fill="freeze"        // Animation am Ende einfrieren
            values =   "500;  0;-20; 20; 0"  // Wegpunkte der Animation
            keyTimes = "  0; .7; .8; .9; 1"  // Keyframes > -->

    </svg>


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
      default: "neutral"
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="sass" scoped>
  @import '~@/assets/_variables.sass'

  svg
    fill: currentColor
    transition: fill 1s
    height: 80%
    width: 80%

  .good
    // fill: #a2e261
    fill: $green
  .neutral
    // fill: #ffd117
    fill: $mid-grey
  .bad
    fill: $red
    // fill: #ff576f

  .good
    .mouth
      d: path("M49.69 38.157a2.5 2.5 0 0 0-3.533.153c-.057.062-5.77 6.19-13.96 6.19-8.163 0-14.34-6.178-14.41-6.25a2.5 2.5 0 1 0-3.58 3.493c.31.316 7.67 7.756 17.99 7.756 10.365 0 17.353-7.494 17.645-7.814a2.497 2.497 0 0 0-.153-3.53z")
  .bad
    .mouth
      d: path("M49.79 45.256c-.307-.316-7.667-7.756-17.988-7.756-10.365 0-17.353 7.49-17.645 7.81A2.502 2.502 0 0 0 16 49.5a2.49 2.49 0 0 0 1.842-.81c.057-.063 5.77-6.19 13.96-6.19 8.164 0 14.34 6.177 14.41 6.248a2.496 2.496 0 0 0 3.53.043 2.496 2.496 0 0 0 .05-3.532z")
</style>
