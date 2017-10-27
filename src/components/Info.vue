<template>
  <div class="info" v-bind:class="[isHappy ? 'happy' : 'unhappy']">
    <div class="flex flex-center height-33">
      <i class="wi wi-night-sleet"></i>
      &nbsp;+20&deg;C
    </div>
    <div class="height-33">
      <h1 v-if="isHappy">
        <i class="fa fa-smile-o" aria-hidden="true"></i>
        Happy!
      </h1>

      <h1 v-else>
        <i class="fa fa-frown-o" aria-hidden="true"></i>
        Unhappy!
      </h1>
    </div>
    <div class="height-33">
      <h4>{{ duration }} hours</h4>
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

    props: {
      duration: {
        default: 'N/A'
      },


    },

    computed: {
      isHappy() {
        return this.duration >= 8 && this.duration <= 9
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
    border: 2vh solid #eee;
    color: #444;
    background: #fff;
  }

  .info.happy {
    border: 2vh solid #42b983;
  }

  .info.unhappy {
    border: 2vh solid tomato;
  }


</style>
