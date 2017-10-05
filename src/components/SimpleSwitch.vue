<template>
  <div class="switch" v-bind:class="{ active: active }">
    <div class="up">
      <slot name="up"></slot>
    </div>
    <div class="down">
      <slot name="down"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SimpleSwitch',
    data () {
      return {
        time: '',
        timeout: null
      }
    },

    props: {
      active: {
        type: Boolean
      }
    }
  }
</script>

<style scoped>
  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    /*background: #eee;*/
    width: 100%;
    height: 100%;
  }

  .switch.animated > div {
    transition: flex 0.5s, opacity 0.3s;
    transition-delay: 0.5s;
  }

  .switch > div {
    width: 100%;
    height: 100%;
    overflow: hidden;

    display: flex;
    justify-content: space-around;
    align-items: center;
  }



  /*.switch .up {
    opacity: 1;
  }

  .switch .down {
    opacity: 0;
  }*/

  .switch.hover:hover .up {
    flex:1 1 0%;
    opacity: 0;
  }

  .switch.hover:hover .down {
    flex:1 1 100%;
    opacity: 1;
  }

  .switch.active .up {
    flex:1 1 0%;
    opacity: 0;
  }

  .switch.active .down {
    flex:1 1 100%;
    opacity: 1;
  }

  .up {
    flex:1 1 100%;
    opacity: 1;
  }

  .down {
    flex:1 1 0%;
    opacity: 0;
  }
</style>
