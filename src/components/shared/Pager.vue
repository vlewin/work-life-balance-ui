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
  name: "Pager",
  data() {
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
    prev(page) {
      this.$parent.page = page
    },

    next(page) {
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
    overflow: hidden;
  }

  .window {
    width: 300%;
    height: 100%;
    overflow: hidden;
    display: flex;
    transition: transform 0.5s ease-in-out;
    transition: transform 0.5s ease;
  }

  .window.page-1 {
    transform: translateX(0);
  }

  .window.page-2 {
    transform: translateX(calc(-100% / 3));
  }

  .window.page-3 {
    transform: translateX(calc(-100% / 1.5));
  }

  .page {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
  }
</style>
