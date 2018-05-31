<template>
  <div :class="[text]">
    <i class="fas font-12" :class="[icons[text]]"></i>
    <div class="uppercase font-4 height-25">{{ text }}</div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from "vuex"

  export default {
    name: "Info",

    data() {
      return {
        icons: {
          'sickness': 'fa-briefcase-medical',
          'vacation': 'fa-suitcase'
        }
      }
    },

    props: {
      text: {
        type: String
      }
    },

    computed: {
      ...mapGetters(['currentRecord']),
      ...mapState(['fetching'])
    }
  }
</script>

<style lang="sass">
  .circle-info
    // height: 15.8rem
    // width: 15.8rem
    // box-sizing: border-box
    // border-radius: 100%
    // line-height: 3rem
    font-weight: bold
    transform: scale(1.30)

    &.vacation
      color: #42b983
      // border: 0.6rem solid #42b983

    &.sickness
      color: #FFBF00
      // border: 0.6rem solid #FFBF00

</style>
