<template>
  <rect class="value" :x="x" y="0" width="40" :class="{ over: duration > 8, under: duration < 8 }">
    <animate attributeName="height" from="0" :to="duration*50" begin="0s" dur="1s" fill="freeze" :repeatCount="0" />
    <text>{{ duration }}</text>
    <!-- <animate attributeName="height" from="0" to="200" begin="0s" dur="1s" fill="freeze" :repeatCount="0" /> -->


  </rect>
</template>

<script>
  // https://codepen.io/PointC/pen/pydXLG
  import AnimatedRect from "./AnimatedRect"

  export default {
    components: {
      AnimatedRect
    },

    data() {
      return {
      }
    },

    props: {
      x: {
        type: Number
      },

      duration: {
        type: Number
      }
    },

    computed: {
      y() { return 90 / 2 }
    },
  }
</script>
