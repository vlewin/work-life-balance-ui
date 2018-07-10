<template>
  <ul class="month-picker">
    <li class="arrow" v-on:click="prevMonth">
      <i class="fa fa-chevron-left" aria-hidden="true"></i>
    </li>
    <li>
      {{ month }} ({{ year}})
    </li>
    <li class="arrow" v-on:click="nextMonth">
      <i class="fa fa-chevron-right" aria-hidden="true"></i>
    </li>
  </ul>
</template>

<script>
  import addMonths from "date-fns/add_months"
  import subMonths from "date-fns/sub_months"

  export default {
    name: "MonthPicker",
    data() {
      return {
        date: new Date()
      }
    },

    created() {},

    computed: {
      month() {
        return this.date.toLocaleString("en-US", { month: "long" })
      },

      year() {
        return this.date.getFullYear()
      }
    },

    methods: {
      prevMonth() {
        this.date = subMonths(this.date, 1)
        this.$emit("date-change", this.date)
      },

      nextMonth() {
        this.date = addMonths(this.date, 1)
        this.$emit("date-change", this.date)
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '~@/assets/_variables.sass'

  ul
    padding: 0
    margin: 0
    display: flex
    justify-content: space-between
    align-items: center
    width: 100%
    height: 100%
    font-weight: bold
    background: white
    height: 10vh
    background: #eee

  li
    cursor: pointer
    list-style: none
    text-align: center
    vertical-align: middle
    transition: color 0.2s, background 1s
    // background: rgba(0,0,0,0.1)

    height: 2.5em
    min-width: 2.5em
    line-height: 2.5em
    text-align: center

  .arrow
    &:hover
      background: rgba(255, 255, 255, 0.1)

  @media screen and (max-width: 50em) and (orientation: landscape)
    ul
      height: 15vh
</style>
