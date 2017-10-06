<template>
  <div class="switch" v-bind:class="{ active: active }">
    <div class="switch-item up">
      <slot name="up"></slot>
    </div>
    <div class="switch-item down">
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
  /* NOTE: Adding white-space: nowrap; to the div prevented the text from, well, wrapping, and extending the div. */
  /* SOURCE: https://stackoverflow.com/questions/31475737/how-can-i-make-the-height-of-a-div-transition-smoothly-with-content-and-width */
  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /*background: #07c;*/
    white-space: nowrap;
  }

  .switch.vertical {
    flex-direction: column;
  }

  .switch .switch-item {
    width: 100%;
    height: 100%;
    overflow: hidden;

    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
  }

  .switch.animated .switch-item {
    transition: flex 0.5s, opacity 0.5s;
    /*transition-delay: 0.5s;*/
  }

  .switch.horizontal.animated .switch-item {
    transition-delay: 0.5s;
  }

  .switch.active .switch-item.up {
    flex: 1 1 0%;
  }

  .switch.active .switch-item.down {
    flex: 1 1 100%;
  }

  .switch .switch-item.up {
    flex: 1 1 100%;
    /*background: #07c;*/
  }

  .switch .switch-item.down {
    flex: 1 1 0%;
    /*background: #50A7C2;*/
  }

  .switch.horizontal.active .switch-item.up {
    opacity: 0;
  }

  .switch.horizontal.active .switch-item.down {
    opacity: 1;
  }

  .switch.horizontal .switch-item.up {
    opacity: 1;
  }

  .switch.horizontal .switch-item.down {
    opacity: 0;
  }


</style>
