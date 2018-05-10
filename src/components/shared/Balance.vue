<template>
  <div id="balance" class="flex flex-center height-100" slot="up">
    <div class="flex flex-center flex-column flex-item">
      <span>{{ balance.vacation }}</span>
      <label>
        <i class="fa fa-plane text-green" aria-hidden="true"></i>
        VACATION
      </label>
    </div>
    <div class="flex flex-center flex-column flex-item">
      <span>{{ balance.sickness }}</span>
      <label>
        <i class="fa fa-heartbeat text-amber" aria-hidden="true"></i>
        SICKNESS
      </label>
    </div>
    <div class="flex flex-center flex-column flex-item">
      <span>?</span>
      <label>
        <i class="fa fa-gift text-tomato" aria-hidden="true"></i>
        HOLIDAY
      </label>
    </div>
  </div>
</template>


<script>
  import { mapState } from "vuex"

  export default {
    name: "Balance",
    data() {
      return {
      }
    },

    created() {
      if(!this.balance) {
        this.$store.dispatch('fetchBalance')
      }
    },

    computed: {
      ...mapState(['currentDate', 'balance']),

      holidays() {
        return 0
      }
    },

    methods: {
      isSelected() {
        return false
      }
    }
  }
</script>



<style lang="sass" scoped>
  .container
    height: 100%

  @media screen and (orientation: portrait)
    .container
      flex-direction: column

    .content
      height: 80%

    #balance
      height: 10vh
      width: 100%

      .flex-item
        border-top: 1px solid #2b3c58
        height: 100%

      span
        font-size: 2rem
        line-height: 1.8rem

      label
        font-size: 0.6rem
        line-height: 1rem

  @media screen and (orientation: landscape)
    .container
      margin: auto

    .content
      width: 75%

    #balance
      // height: 70vh
      flex-direction: column
      width: 25%

      span
        font-size: 3rem
        line-height: 3rem

      label
        font-size: 0.6rem
        line-height: 0.6rem

      .flex
        height: 100%
        flex-direction: column

      .flex-item
        height: calc(100% / 3)
        border-left: 1px solid #eee
</style>
