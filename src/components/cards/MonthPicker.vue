<template>
  <ul class="month-picker">
    <li class="arrow" v-on:click="prevMonth">
      <!-- &laquo; -->
      <i class="fa fa-chevron-left" aria-hidden="true"></i>
    </li>
    <li>
      {{ month }} ({{ year}})
    </li>
    <li class="arrow" v-on:click="nextMonth">
      <!-- &raquo; -->
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
    width: 85%
    height: 100%
    font-weight: bold
    background: white
    // color: #fff

  li
    cursor: pointer
    list-style: none
    height: 2rem
    line-height: 2rem
    text-align: center
    border-radius: 50%
    vertical-align: middle
    transition: color 0.2s, background 1s
    /*background: rgba(0,0,0,0.1);

  .arrow
    width: 2rem
    height: 2rem
    font-size: 1.4rem
    line-height: 2rem
    &:hover
      background: rgba(255, 255, 255, 0.1)
</style>
