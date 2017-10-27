<template>
  <div class="wrapper">
    <div class="window" v-bind:class="[active]">
      <!-- <div class="sticky">♥</div> -->
      <div class="page page-1">
        <slot name="left"></slot>
        <!-- <a v-on:click.prevent="prev('page-2')">BACK TO CENTER &raquo;</a> -->

      </div>
      <div class="page page-2">
        <slot name="center"></slot>
      </div>
      <div class="page page-3">
        <slot name="right"></slot>
        <!-- <a v-on:click.prevent="prev('page-2')">&laquo; BACK TO CENTER</a>
        <div class="sticky">♥</div> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Pager',
    data () {
      return {
        open: null,
        page: null
      }
    },

    props: {
      active: {
        type: String
      }
    },

    methods: {
      prev (page) {
        console.log('NEXT')
        this.$parent.page = page
      },

      next (page) {
        console.log('NEXT')
        this.$parent.page = page
      }
    }
  }
</script>
<style>
  .wrapper {
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .window {
    width: calc(300%);
    height: 100%;
    overflow: hidden;
    display: flex;
    transform: translateX(-33.333333333%);
    transition: transform 0.5s ease-in-out;
    transition: transform .5s ease;
  }

  .window.page-1 {
    transform: translateX(calc(0%));
  }

  .window.page-2 {
    transform: translateX(calc(-100% / 3));
  }

  .window.page-3 {
    transform: translateX(calc(-100% / 1.5));
  }

  .page {
    width: calc(100% / 3 + 1px);
    display: flex;
    justify-content: center;
    align-items: center;
    /*color: #fff;*/
    /*font-size: 200%;*/
  }

  /*.page-1 {
    background: #00bcd7;
  }
  .page-2 {
    background: #009788;
  }
  .page-3 {
    background: #607d8d;
  }
  .page-4 {
    background: #ff5608;
  }*/
</style>
<style scoped>
  /*.wrap {
    flex: 1;
    overflow: hidden;
    height: 90%;
  }

  .window {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    height: 90%;
    position: relative;
    left: -100%
  }

  .window.is-set {
    transform: none;
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)
  }

  .panel{
    background: #ddd;
    flex: 1 0 100%;
    transform: none;
    transition: order 0.5s cubic-bezier(0.23, 1, 0.32, 1)

  }

  .left {
    background: tomato;
    order: 1;
  }

  .center {
    background: #FFBF00;
    order: 2;
  }

  .right {
    background: #82ca9a;
    order: 3;
  }*/
</style>
