<template>
  <card hcolor="green">
    <i slot="c-header-icon" class="fa fa-clock-o fa-6x" aria-hidden="true"></i>

    <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-1')">
      <i class="fa fa-area-chart" aria-hidden="true"></i>
    </div>
    <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-3')">
      <i class="fa fa-calendar" aria-hidden="true"></i>
    </div>
    <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-2')">
      <i class="fa fa-sliders" aria-hidden="true"></i>
    </div>

    <date-picker class="flex flex-center width-90 v-height-15" slot="c-body"></date-picker>

    <div slot="c-body" class="flex flex-around width-100 v-height-30">
      <div class="circle flex flex-around flex-column">
        <small class="font-1">Come</small>
        <div class="font-3">08:00</div>
        <i class="fa fa-clock-o" aria-hidden="true"></i>
      </div>

      <div class="circle flex flex-around flex-column">
        <small class="font-1">Break</small>
        <div class="font-3">00:30</div>
        <i class="fa fa-coffee" aria-hidden="true"></i>
      </div>

      <div class="circle flex flex-around flex-column">
        <small class="font-1">Leave</small>
        <div class="font-3">18:00</div>
        <i class="fa fa-clock-o" aria-hidden="true"></i>
      </div>
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

    <template slot="c-sidebar-title">{{ currentFomatedDate }}</template>
    <i slot="c-sidebar-icon" class="fa fa-clock-o fa-5x" aria-hidden="true"></i>

    <div slot="c-sidebar-actions" class="font-2" v-on:click="navigate('page-2')">
      <i class="fa fa-clock-o" aria-hidden="true"></i>
    </div>
    <div slot="c-sidebar-actions" class="font-2" v-on:click="navigate('page-3')">
      <i class="fa fa-calendar" aria-hidden="true"></i>
    </div>
    <div slot="c-sidebar-actions" class="font-2">
      <i class="fa fa-sliders" aria-hidden="true"></i>
    </div>

    <template slot="c-footer">
      <button class="font-1">SAVE</button>
      <button class="font-1">DELETE</button>
    </template>
  </card>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex"
  import Card from "./ResponsiveCard"
  import DatePicker from "./DatePicker"

  export default {
    name: "Index",
    components: {
      Card,
      DatePicker
    },

    computed: {
      ...mapGetters(["currentFomatedDate", "currentWeekNumber", "currentRecord"]),
      ...mapState(["page"])
    },

    methods: {
      ...mapActions(["navigate"])
    }
  }
</script>

<style lang="sass" scoped>
  @import '~@/assets/_variables.sass'

  .circle
    height: 6rem
    width: 6rem!important
    border: 1vh solid $green
    border-radius: 50%
</style>
