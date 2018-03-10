<template>
  <div class="svg-container">
    <!-- {{ viewBox }} -->
    <svg :viewBox="viewBox" preserveAspectRatio="none">
      <g transform="scale(1,-1) translate(10,-100)">
        <g class="bar" v-for="d, i in data" :key="i">
          <rect class="background" :x="i*40" y="0" fill="white" height="100" :width="width" ></rect>
          <rect class="value" :x="i*40" y="0" :width="width" >
            <animate attributeName="height" from="0" :to="d*10" dur="0.5s" fill="freeze" />
          </rect>
          <text :x="i*40" transform="scale(1,-1) translate(10,-10)">{{ d }}</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
  // https://codepen.io/PointC/pen/pydXLG
  import { TweenMax, Sine } from 'gsap'
  import { mapState, mapActions } from "vuex"

  export default {
    data() {
      return {
        // data: [6.5, 8, 9, 8.5, 7, 0, 0, 6.5, 8, 9, 8.5, 7, 0, 0, 6.5, 8, 9, 8.5, 7, 0, 0],
        data: [6.5, 8, 9, 8.5, 7, 0, 0, 6.5, 8, 9, 8.5, 7, 0, 0],
        // data: [6.5, 8, 9, 8.5, 7, 0, 0],

        chartHeight: 0,
        barValue: 5,
        value: 25,
        radius: 85,
      }
    },
    computed: {
      viewBox() {
        return `0 0 ${this.view} 100`
      },

      view() {
        return this.data.length * 40
      },

      width() {
        return ((this.view / this.data.length) - 20)
      },

      y() { return 90 / 2 },
    },
    methods: {
      ...mapActions([
        "navigate" // map `this.increment()` to `this.$store.dispatch('increment')`
      ]),

      x(i) { return i*40+38 },
      startScissors() {
        this.scissorAnim(this.$refs.rightscissor, 30)
        // this.scissorAnim(this.$refs.leftscissor, -30)
      },
      scissorAnim(el, rot) {
        console.log(el)
        // TweenMax.to(el, 1, { x:-100 , opacity:0 , ease:Power1.easeInOut ,repeat:-1  });

        TweenMax.to(el, 1, {
            scale: 1.6,
            repeat: 3,
            z: 2 /* add this slight z-axis shift */
        })

        // TweenMax.to(el, 0.25, {
        //   rotation: rot,
        //   repeat: 3,
        //   yoyo: true,
        //   svgOrigin: '50 45',
        //   ease: Sine.easeInOut
        // })
      }

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
  }

  .svg-container {
    background-color: #42b983;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  text {
    font-size: 80%;
    font-weight: bold;
    fill: #42b983;
    text-anchor: middle;
    alignment-baseline: middle;
  }

  rect.background {
    /* fill:rgb(255,255,255); */
    stroke-width: 0;
    stroke:rgb(200,200,200);
    fill: rgb(200,200,200, 0.5);

    rx: 0.2em;
    ry: 0.2em;
  }

  .value {
    fill: white;
    stroke-width: 0;
    stroke: #FFBF00;
    /* rx: 0.2em;
    ry: 0.2em; */
  }

  .fill {
    fill: orange;
    z-index: 1;
  }

  circle {
    fill: orange;
  }

  .round {
    width: 20em;
    height: 20em;
    rx: 10em;
    ry: 10em;
  }
</style>

// <style lang="sass" scoped>
// @media (min-width: 20em)
//   svg
//     width: 100%
//     height: 50%
//     border: 2px solid red
//
// @media (min-width: 40em)
//   svg
//     width: 100%
//     height: 80%
//     border: 2px solid yellow
//
// @media (min-width: 60em)
//   svg
//     width: 100%
//     height: 80%
//     border: 2px solid green
// </style>
