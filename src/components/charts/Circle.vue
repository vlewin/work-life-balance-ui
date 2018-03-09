<template>
  <div>
    <svg viewBox="0 0 1000 500">
      <path d="M 950 500 A 450 450 0 0 0 50 500"></path>
      <text class='percentage' text-anchor="middle" alignment-baseline="middle" x="500" y="300" font-size="140" font-weight="bold">0%</text>
      <text class='title' text-anchor="middle" alignment-baseline="middle" x="500" y="450" font-size="90" font-weight="normal">Participation</text>
    </svg>
    <svg viewBox="0 0 1000 500">
      <path d="M 950 500 A 450 450 0 0 0 50 500"></path>
      <text class='percentage' text-anchor="middle" alignment-baseline="middle" x="500" y="300" font-size="140" font-weight="bold">0%</text>
      <text class='title' text-anchor="middle" alignment-baseline="middle" x="500" y="450" font-size="90" font-weight="normal">Goal completion</text>
    </svg>
    <svg viewBox="0 0 1000 500">
      <path d="M 950 500 A 450 450 0 0 0 50 500"></path>
      <text class='percentage' text-anchor="middle" alignment-baseline="middle" x="500" y="300" font-size="140" font-weight="bold">0%</text>
      <text class='title' text-anchor="middle" alignment-baseline="middle" x="500" y="450" font-size="90" font-weight="normal">Blockers</text>
    </svg>

    <ul>
      <li>Radius = 85</li>
      <li>Percentage to fill = 25</li>
      <li>Circumference = 2 * π * Radius = 534 ({{circumference}})</li>
      <li>Stroke length = (Circumference / 100) * Percentage to fill = {{ strokeLength }}</li>
    </ul>
    <svg class="circle-chart" viewbox="0 0 180 180" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
      <circle class="circle-chart__background" stroke="#efefef" stroke-width="10" fill="none" cx="90" cy="90" r="85" />
      <circle class="circle-chart__circle" stroke="#00acc1" stroke-width="10" :stroke-dasharray="strokeLength,circumference" stroke-linecap="round" fill="none" cx="90" cy="90" r="85" />
    </svg>
  </div>
</template>
<script>
  // https://codepen.io/PointC/pen/pydXLG
  export default {
    data() {
      return {
        radius: 85,
        percentage: 100,
      }
    },
    computed: {
      strokeLength() {
        return (this.circumference / 100) * this.percentage;
      },

      circumference() {
        return 2 * Math.PI * this.radius;;
      },
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

  .circle-chart__circle {
    animation: circle-chart-fill 10s infinite;
    transform: rotate(-90deg);
    transform-origin: center;
  }

  @keyframes circle-chart-fill {
    to { stroke-dasharray: 0 100; }
  }

  svg {
    /* width: 100rem;
    max-height: 100rem; */
    overflow: visible;
  }
   path {
    stroke-width: 75;
    stroke: #ecf0f1;
    fill: none;
  }

   text {
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .participation path.data-arc {
    stroke: #3498db;
  }

  .participation text {
    fill: #3498db;
  }

  .completion path.data-arc {
    stroke: #27ae60;
  }

  .completion text {
    fill: #27ae60;
  }

  .blocked path.data-arc {
    stroke: #e74c3c;
  }

  .blocked text {
    fill: #e74c3c;
  }
</style>
