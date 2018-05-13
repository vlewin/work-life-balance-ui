<template>
  <div id="circle-info" :class="[text]">

    <div>
      <i class="fas font-25" :class="[icons[text]]"></i>
    </div>
    <div class="uppercase font-8">{{ text }}</div>

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
  #circle-info
    height: 15.8rem
    width: 15.8rem
    box-sizing: border-box
    border-radius: 100%
    display: flex
    flex-direction: column
    justify-content: center
    // box-shadow: inset 0 0 1em #42b983
    line-height: 4rem
    font-weight: bold

    &.vacation
      color: #42b983
      // border: 0.6rem solid #42b983

    &.sickness
      color: #FFBF00
      // border: 0.6rem solid #FFBF00

</style>
