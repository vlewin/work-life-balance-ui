<template>
  <div class="wrapper">
    <div class="window" v-bind:class="[page]">
      <!-- <div class="sticky">♥</div> -->
      <div class="page page-1">
        <slot name="left"></slot>
      </div>
      <div class="page page-2">
        <slot name="center"></slot>
      </div>
      <div class="page page-3">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex"

  export default {
    name: "PageSlider",
    data() {
      return {
        open: null,
      }
    },

    props: {
      active: {
        type: String
      }
    },

    computed: {
      ...mapState(["page"]),
      ...mapGetters(['currentMonthNumber'])
    },

    watch: {
      page(val) {
        if (val) {
          setTimeout(() => {
            this.$store.dispatch("fetchMonthRecords", this.currentMonthNumber)
          }, 500)
        }
      }
    }
  }
</script>

<style>
  .wrapper {
    width: 100%;
    /* height: 100%; */
    /* background: #fff; */
    overflow: hidden;
  }

  .window {
    width: 300%;
    /* height: 100%; */
    overflow: hidden;
    display: flex;
    transition: transform 300ms linear;
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
    /* background: #fff; */
    will-change: transform;
  }

  @media (min-width: 50em) {
    .wrapper {
      border-radius: 5px;
      box-shadow: 0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22);
    }

    .window.page-2 {
      transform: translateX(calc(-100% / 3 + 0px));
    }
  }

</style>
