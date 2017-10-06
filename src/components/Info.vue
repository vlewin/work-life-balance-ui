<template>
  <div class="info">
    <div class="flex flex-center height-33">
      <i class="wi wi-night-sleet"></i>
      &nbsp;+20&deg;C
    </div>
    <div class="height-33">
      <h1>
        <i class="fa fa-smile-o" aria-hidden="true"></i>
        <!-- <i class="fa fa-frown-o" aria-hidden="true"></i> -->
        Perfect!
      </h1>
    </div>
    <div class="height-33">
      <h4>8.5 hours</h4>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Info',
    data () {
      return {
      }
    },

    methods: {
      navigate (page) {
        console.log('Navigate', page, this.$parent.page)
        this.$parent.page = page
      }
    }
  }
</script>
<style>
  .flex {
    display: flex;
  }

  .flex-center {
    justify-content: center;
    align-items: center;
  }

  .height-33 {
    flex: 1 1 calc(100% / 3);
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 40vh;
    width: 40vh;
    border-radius: 50%;
    border: 2vh solid #42b983;
  }
</style>
