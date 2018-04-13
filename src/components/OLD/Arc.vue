<template>
  <div>

    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-100 -100 700 700" id="menu">

    <g id="symbolsContainer">
    	<symbol class="icon icon-" id="icon-1" viewBox="0 0 40 40">
        <path d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z" ></path>
      </symbol>
      <symbol class="icon icon-" id="text-1" viewBox="0 0 40 40">
        <text stroke="#111">AAAA</text>
      </symbol>
    </g>

    <g id="itemsContainer" data-svg-origin="250 250" transform="matrix(0.38734,-0.92193,0.92193,0.38734,-77.3193578290572,383.64893561257276)">
      <a :id="`slice-${index}`" style="transform-origin: 250px 250px" :class="['item', `rotate-${sliceAngle(index)}`]" v-for="(slice, index) in slices" :key="index">
        <path class="sector" fill="none" stroke="#111" :d=coordinates />
        <use xlink:href="#icon-1" width="20" height="100" :x="getPointAtLength('slice-1')" x="375.1000061035156" y="33.49364905389035" transform="rotate(45 414.4505615234375 181.88233947753906)"></use>
        <use xlink:href="#text-1" width="20" height="100" x="344.4505615234375" y="161.88233947753906" transform="rotate(45 414.4505615234375 181.88233947753906)"></use>
      </a>
    </g>


    <g xmlns="http://www.w3.org/2000/svg" id="trigger" class="trigger menu-trigger">
      <circle cx="250" cy="250" r="100"/>
      <text text-anchor="middle" x="250" y="230" fill="#fff" font-size=".7em" font-family="verdana">TOP</text>
      <text text-anchor="middle" x="250" y="280" fill="#fff" font-size=".7em" font-family="verdana">BOTTOM</text>
      <path fill="transparent" stroke="#fff" stroke-width="4" d="M220,250 l60,0 A200,200 0 0,0 250,250 z"></path>
    </g>
    </svg>

    <!-- <svg class="" width="502px" height="502px" viewBox="0 0 500 500">
      <g xmlns="http://www.w3.org/2000/svg" id="symbolsContainer">
        <symbol :id="`text-${index}`" class="icon icon-" viewBox="0 0 35 35" v-for="(slice, index) in slices" :key="index">
          <text stroke="#000" font-size="14px" font-family="verdana">slice-{{ index }}</text>
        </symbol>
      </g>

        <g :id="`slice-${index}`" style="transform-origin: center center" :class="['slice', `rotate-${sliceAngle(index)}`]" v-for="(slice, index) in slices" :key="index">
          <path fill="transparent" stroke="#111" :d=coordinates />
          <use :xlink:href="`#text-${index}`" width="30" height="80" x="387.05950927734375" y="164.94381713867188"></use>
        </g>


      <g xmlns="http://www.w3.org/2000/svg" id="trigger" class="trigger menu-trigger">
        <circle cx="250" cy="250" r="50"/>
        <text text-anchor="middle" x="250" y="230" fill="#fff" font-size=".7em" font-family="verdana">TOP</text>
        <text text-anchor="middle" x="250" y="280" fill="#fff" font-size=".7em" font-family="verdana">BOTTOM</text>
        <path fill="transparent" stroke="#fff" stroke-width="4" d="M220,250 l60,0 A200,200 0 0,0 250,250 z"></path>
      </g>

    </svg> -->
  </div>

</template>

<!-- https://webdesign.tutsplus.com/tutorials/all-you-ever-need-to-know-about-sass-interpolation--cms-21375 -->
<!-- https://css-tricks.com/using-multi-step-animations-transitions/ -->
<!-- http://www.sarasoueidan.com/tools/circulus/#icons -->
<!-- https://css-tricks.com/building-a-circular-navigation-with-css-clip-paths/ -->
<!-- http://www.sarasoueidan.com/blog/building-a-circular-navigation-with-svg/ -->
<script>
  export default {
    name: "Circle",
    components: {
    },

    data() {
      return {
        width: 500,
        height: 500,
        slices: 6
      }
    },

    computed: {
      angle() {
        return (360 / this.slices)
      },

      coordinates() {
        return `M250,250 l250,0 A250,250 0 0,0 ${this.cartesianCoordinates.x},${this.cartesianCoordinates.y} z`
      },

      cartesianCoordinates() {
        //polar to cartesian coordinates conversion
        //knowing the value of your angle in degrees..
        //get value of the angle in radians
        console.log(this.angle)
        let angleInDegrees = this.angle
        let angleInRadians = -angleInDegrees * Math.PI / 180.0
        let centerX = this.height / 2
        let centerY = this.height / 2
        let radius = this.height / 2
        // let x = Math.round(centerX + radius * Math.cos(angleInRadians))
        // let y = Math.round(centerY + radius * Math.sin(angleInRadians))

        let x = centerX + radius * Math.cos(angleInRadians)
        let y = centerY + radius * Math.sin(angleInRadians)

        console.log(x,y)
        return {x, y}
      }
    },

    methods: {
      rotateAngle(index) {
        return Math.round(index * this.angle)
      },

      sliceAngle(index) {
        return Math.round(index * this.angle)
      },

      getPointAtLength(slice) {
        const path = document.getElementById(slice)
        if(path) {
          console.log(path.getElementsByTagName( 'path' )[0].getPointAtLength(10.1))
          return path.getElementsByTagName('path')[0].getPointAtLength(10.1)
        } else {
          console.log(slice)
        }
        // .getPointAtLength(10.1)
      }

    },

    mounted() {
      // this.cartesianCoordinates()
      const paths = document.querySelectorAll('.slice path')

      function drawItems() {
          for (var i = 0; i < paths.length; i++) {
              paths[i].classList.add('animate')
          }
      }

      setTimeout(() => {
        // drawItems()
      }, 1000)
      // drawItems()
    }
  }
</script>
<!-- ARC -->
<style lang="sass">
  // @import '~@/assets/charts/arc.sass'
  @import '~@/assets/charts/half-circle.sass'
</style>

<style>
    #menu { display: block; margin: 0 auto; overflow: visible;}
    .item .sector { transition: all .1s linear; fill: rgba(255, 255, 255, .8); stroke: #ddd;  }
    .item:hover .sector { fill: #333; }
    .menu-trigger { fill: deepPink; pointer-events: auto;}
    .menu-trigger:hover { cursor: pointer; }
    .item use { fill: #333; }
    .item:hover use { fill: #fff; }
</style>
