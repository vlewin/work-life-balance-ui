<template>
  <div id="preview">
    <gauge></gauge>
  </div>
</template>

<script>
  // https://codepen.io/PointC/pen/pydXLG
  import { TweenMax, Sine } from 'gsap'

  import Gauge from './Gauge.vue'
  export default {
    components: { Gauge },
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
