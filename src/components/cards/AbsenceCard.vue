<template>
  <card hcolor="blue">
    <i slot="c-header-icon" class="fa fa-calendar fa-5x" aria-hidden="true"></i>
    <div slot="c-body" class="flex flex-center v-height-15">
      <month-picker class="uppercase" v-on:date-change="setDate"></month-picker>
    </div>
    <div slot="c-body" class="flex flex-around">
      <calendar class="width-90" :date="currentDate" :records="records"></calendar>
    </div>

    <div slot="c-body" class="flex flex-center v-height-15">
      <div>
        <i class="fa fa-gift" aria-hidden="true"></i>
        Holidays: 0
      </div>
      <div>
        <i class="fa fa-heartbeat" aria-hidden="true"></i>
        Sickness: 0
      </div>
      <div>
        <i class="fa fa-plane" aria-hidden="true"></i>
        Vacation: 0
      </div>
    </div>

    <!-- <div class="flex flex-center v-height-15">
      <div>
        <i class="fa fa-gift" aria-hidden="true"></i>
        <button>Holidays</button>
      </div>
      <div>
        <i class="fa fa-heartbeat" aria-hidden="true"></i>
        <button>Sickness</button>
      </div>
      <div>
        <i class="fa fa-plane" aria-hidden="true"></i>
        <button>Vacation</button>
      </div>
    </div> -->

    <template slot="c-sidebar-title">TEXT</template>
    <i slot="c-sidebar-icon" class="fa fa-calendar fa-5x" aria-hidden="true"></i>

    <template slot="c-footer">
      <button>SAVE</button>
      <button>DELETE</button>
    </template>
  </card>
</template>

<script>
  import { mapState, mapActions } from "vuex"
  import Card from "./ResponsiveCard"
  import MonthPicker from "./MonthPicker"
  import Calendar from "./Calendar"

  export default {
    name: "Index",
    components: {
      Card,
      MonthPicker,
      Calendar
    },
    data() {
      return {
        date: new Date()
      }
    },

    computed: {
      ...mapState(["currentDate", "records"]),
    },

    methods: {
      ...mapActions([
        "navigate" // map `this.increment()` to `this.$store.dispatch('increment')`
      ]),

      setDate(date) {
        this.$store.dispatch("setCurrentDate", date)
        // this.date = date
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
