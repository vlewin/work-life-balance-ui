<template>
  <div class="svg-container">
    <!-- {{ viewBox }} -->

    <!-- <svg :viewBox="viewBox"> -->
    <svg :viewBox="viewBox" preserveAspectRatio="none">
      <defs>

        <pattern id="amber-stripes-pattern" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#FFBF00" stroke-width="10" />
        </pattern>
        <pattern id="green-stripes-pattern" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#42b983" stroke-width="10" />
        </pattern>
      </defs>

      <g transform="scale(1,-1) translate(30,-400)">
        <g class="bar" v-for="(d, i) in values" :key="d.date" :data-key="d.date" v-if="!d.weekend">
          <rect class="background" x="0" y="0" fill="white" height="400" :width="width" >

          <animate attributeName="x"
                   from="0" :to="i*40"
                   begin="0.5s" dur="0.5s"
                   repeatCount="1"
                   fill="freeze"
                  />
          </rect>
          <!-- <animated-rect :x="i*40" :duration="d.duration"></animated-rect> -->
          <rect class="value" :x="i*40" y="0" :width="width" :class="[d.reason, { over: d.duration > 8, under: d.duration < 8 }]">
            <animate attributeName="height" from="0" :to="d.duration*50" dur="0.4s" fill="freeze" />
          </rect>
          <circle :cx="i*40+9" cy="-40" stroke="#42b983" stroke-width="0" stroke-linecap="round" fill="#42b983" r="18" />
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
  }

  .over {
    fill: tomato;
  }

  .under {
    fill: #FFBF00;
  },

  .weekend {
    fill: white;
  }

  #stripes-pattern line {
    stroke: orange;
    stroke-width: 10;
  }

  .sickness, .vacation {
    /* mask: url('#mask-stripe'); */
    fill: url('#stripes-pattern');
    /* background: repeating-linear-gradient(
      45deg,
      #606dbc,
      #606dbc 10px,
      #465298 10px,
      #465298 20px
    ); */
  },

  .sickness {
    fill: url('#amber-stripes-pattern');
  },

  .vacation {
    fill: url('#green-stripes-pattern');
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
