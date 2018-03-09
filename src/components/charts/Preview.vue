<template>
  <div id="preview">
    <!-- <bar-chart percent="{{barValue}}" foreground-color="#badaff" background-color="#bada55"></bar-chart><br>
    Value: <input type="range" min="0" step="1" max="100" v-model="barValue"> {{barValue}}<br><br> -->

    <!-- Just define the foreground color, background color, stroke-width and radius -->
    <!-- <donut-chart :percent="value" foreground-color="#badaff" background-color="#bada55" :stroke-width="width" :radius="radius"></donut-chart><br> -->
    <div class="card">
      <div class="card-header">
        <p class="text-white">Productivity</p>
        <svg @click="startScissors" width="100%" height="50%" viewBox="0 0 600 100" preserveAspectRatio="xMaxYMin meet">

          <!-- <rect xmlns="http://www.w3.org/2000/svg" x="-90.591" y="10" width="100" height="100">
            <animate attributeType="XML" attributeName="x" from="-100" to="120" dur="10s" repeatCount="indefinite"/>
          </rect> -->
          <g transform="scale(1,-1) translate(0,-100)" x="50%" y="50%">
            <g class="bar" v-for="d, i in data">
              <rect :x="i*40+20" y="0" fill="white" width="calc((600 / 14) - 6)" ></rect>
              <rect class="value" :x="i*40+20" y="0" width="calc((600 / 14) - 6)" >
                <animate attributeName="height" from="0" :to="d*10" dur="0.5s" fill="freeze" />
              </rect>
              <text :x="i*40+20" transform="scale(1,-1) translate(20,20)" fill="white" text-anchor="middle" alignment-baseline="middle">{{ d }}</text>

              <!-- <text :x="i*60" y="0" dy="-10" width="50" :height="d" transform="scale(1,-1)">
                {{ data.length }}
              </text> -->
            </g>
            <!-- <g class="bar">
              <rect x="150" y="0" fill="#f70" width="100" height="200">
                <animate attributeName="height" from="0" to="200" dur="0.5s" fill="freeze" />
              </rect>
            </g>
            <g class="bar">
              <rect x="250" y="0" fill="#ec0" width="100" height="150">
                <animate attributeName="height" from="0" to="150" dur="0.5s" fill="freeze" />
                <text transform="scale(1,-1)" x="0" y="10">M</text>
              </rect>
            </g>

            <g class="bar">
              <rect x="250" y="0" fill="#ec0" width="100" height="150" />
              <text transform="scale(1,-1)" width="100" height="200" text-anchor="middle" x="250" y="0" dy="-10">4 apples</text>
            </g> -->
          </g>

          <!-- <g class="bar">
            <rect class="round" ></rect>
            <text x="10" y="9.535" dy=".35em">4 apples</text>
          </g>

          <g class="bar">
            <rect width="20" height="60"></rect>
            <rect class="fill" width="20" height="40" x="0" y="calc(60 - 40)">
              <animate attributeName="height" from="0" to="40" dur="0.5s" fill="freeze" />
            </rect>
            <text x="0" y="10" dy="70">M</text>
          </g> -->

          <circle ref="rightscissor" xmlns="http://www.w3.org/2000/svg" v-for="(d, i) in data" :cy="y" :cx="x(i)" :r="d">
            <!-- repeatCount="indefinite" -->
            <animate xmlns="http://www.w3.org/2000/svg" attributeType="XML" attributeName="r" from="5" :to="d" dur="5s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
      <div class="card-body">
        Average productivity for last month
        <div class="text">8.5 H</div>
        <button slot="footer" v-on:click="navigate('page-2')">BACK &raquo;</button>
      </div>
    </div>

    <!-- Fun tool -->
    <!-- Value: <input type="range" min="0" step="1" max="100" v-model="value"> {{value}}<br>
    Radius: <input type="range" min="0" step="1" max="100" v-model="radius"> {{radius}}<br>
    Width: <input type="range" min="0" step="1" max="100" v-model="width"> {{width}}<br> -->
  </div>
</template>

<script>
  // https://codepen.io/PointC/pen/pydXLG
  import { TweenMax, Sine } from 'gsap'

  import BarChart from './BarChart.vue'
  import DonutChart from './DonutChart.vue'
  export default {
    components: { BarChart, DonutChart },
    data() {
      return {
        data: [6.5, 8, 9, 8.5, 7, 0, 0, 6.5, 8, 9, 8.5, 7, 0, 0],
        chartHeight: 0,
        barValue: 5,
        value: 25,
        radius: 85,
        width: 20
      }
    },
    computed: {
      y() { return 90 / 2; },
    },
    methods: {
      x(i) { return i*40+38; },
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
        });

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
  #preview {
    width: 100%;
    height: 100%;
  }

  svg {
    /* width: 100rem;
    max-height: 100rem; */
    overflow: visible;
  }

  .card {
    display: flex;
    flex-direction: column;
    height: 100%;

  }

  .card-header {
    height: 50%;
    width: 100%;
    background-color: #42b983;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .card-body {
    width: 100%;
    height: 50%;
    background-color: #fff;
    color: #42b983;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .text {
    font-size: 5rem;
    font-weight: bold;
  }

  rect {
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
    rx: 0.2em;
    ry: 0.2em;
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
