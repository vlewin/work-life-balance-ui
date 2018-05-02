<template>
  <div class="svg-container">
    <!-- {{ viewBox }} -->

    <!-- <svg :viewBox="viewBox"> -->
    <svg :viewBox="viewBox" preserveAspectRatio="none"> -->
      <g transform="scale(1,-1) translate(10,-400)">
        <g class="bar" v-for="(d, i) in values" :key="d.date" :data-key="d.date">
          <rect class="background" x="0" y="0" fill="white" height="400" :width="width" >

          <animate attributeName="x"
                   from="0" :to="i*40"
                   begin="0.5s" dur="0.5s"
                   repeatCount="1"
                   fill="freeze"
                  />
          </rect>
          <!-- <animated-rect :x="i*40" :duration="d.duration"></animated-rect> -->
          <rect class="value" :x="i*40" y="0" :width="width" :class="{ over: d.duration > 8, under: d.duration < 8 }">
            <animate attributeName="height" from="0" :to="d.duration*50" dur="0.4s" fill="freeze" />
          </rect>
          <circle :cx="i*40+9" cy="-40" stroke="#00acc1" stroke-width="0" stroke-linecap="round" fill="none" r="18" />
          <text :x="i*40" y="-40" transform="scale(1,-1) translate(10,82)">{{ d.duration }}</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
  // https://gist.github.com/sma/0d1454e4641215e110ba31f63bd20e61
  // https://codepen.io/PointC/pen/pydXLG
  import { mapActions } from "vuex"


  export default {
    data() {
      return {
        // data: [8.5, 8, 7.5, 8.5, 7, 0, 0, 6.5, 8, 8, 8.5, 7, 0, 0, 6.5, 8, 8, 8, 8, 0, 0, 6.5, 8, 9.5, 8.5, 7, 0, 0],
        // data: [6.5, 8, 9, 8.5, 7, 0, 0, 6.5, 8, 9, 8.5, 7, 0, 0],
        // data: [6.5, 8, 9, 8.5, 7, 0, 0],

        chartHeight: 0,
        barValue: 5,
        value: 25,
        radius: 85,
      }
    },

    props: {
      values: {
        type: Array
      }
    },

    mounted() {
    },

    computed: {
      viewBox() {
        return `0 0 ${this.view} 400`
      },

      view() {
        return this.values.length * 40
      },

      width() {
        return ((this.view / this.values.length) - 20)
      },

      y() { return 90 / 2 },
    },

    methods: {
      ...mapActions([
        "navigate" // map `this.increment()` to `this.$store.dispatch('increment')`
      ]),

      x(i) { return i*40+38 },
    }
  }
</script>

<style scoped>
  svg {
    /* width: 100rem;
    max-height: 100rem; */
    width: auto;
    height: auto;
    overflow: visible;
    width: 90%;
  }

  .svg-container {
    background-color: #fff;
    /* height: 80%; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  text {
    font-size: 130%;
    font-weight: bold;
    fill: #fff;
    fill: #444;
    text-anchor: middle;
    alignment-baseline: middle;
  }

  rect.background {
    /* fill:rgb(255,255,255); */
    stroke-width: 0;
    stroke:rgba(200,200,200);
    fill: rgba(200,200,200, 0.5);

    rx: 0.1em;
    ry: 0.1em;
  }

  .value {
    fill: #42b983;
    stroke-width: 0;
    stroke: #FFBF00;
    /* rx: 0.2em;
    ry: 0.2em; */
  }

  .over {
    fill: tomato;
  }

  .under {
    fill: #FFBF00;
  }

  .fill {
    fill: orange;
    z-index: 1;
  }

  circle {
    fill: #fafafa;
  }

  .round {
    width: 20em;
    height: 20em;
    rx: 10em;
    ry: 10em;
  }
</style>
