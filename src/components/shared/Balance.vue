<template>
  <div id="balance" class="flex flex-center height-100" slot="up">
    <div class="flex flex-center flex-column balance-item">
      <span>{{ balance.vacation }}</span>
      <label>
        <i class="fa fa-plane text-green" aria-hidden="true"></i>
        VACATION
      </label>
    </div>
    <div class="flex flex-center flex-column balance-item">
      <span>{{ balance.sickness }}</span>
      <label>
        <i class="fa fa-heartbeat text-amber" aria-hidden="true"></i>
        SICKNESS
      </label>
    </div>
    <div class="flex flex-center flex-column balance-item">
      <span>4</span>
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

    mounted() {

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
  .balance-item
    height: 100%
    font-weight: bold
    background: #fafafa
    color: #34495e

  @media screen and (orientation: portrait)
    #balance
      flex-direction: row
      border-top: 1px solid #eee

      span
        font-size: 2rem

      label
        font-size: 0.6rem

  @media screen and (orientation: landscape)
    #balance
      flex-direction: column
      border-left: 1px solid #eee
      height: 100%
      font-weight: bold

      span
        font-size: 1.8rem

      label
        font-size: 0.6rem
</style>
