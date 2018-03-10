<template>
  <div class="c-responsive">
    <div class="c-header flex flex-around flex-column" :class="[hcolor]">
      <slot name="c-header-icon">HEADER</slot>

      <div class="flex flex-center height-15">
        <!-- <slot name="c-header-actions">HEADER</slot> -->

        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-1')">
          <i class="fa fa-area-chart" aria-hidden="true"></i>
        </div>
        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-2')">
          <i class="fa fa-clock-o" aria-hidden="true"></i>
        </div>
        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-3')">
          <i class="fa fa-calendar" aria-hidden="true"></i>
        </div>
        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-4')">
          <i class="fa fa-sliders" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <div class="c-body flex flex-between flex-column">
      <slot name="c-body">S-BODY</slot>
    </div>

    <div class="c-sidebar flex flex-between flex-column" :class="[hcolor]">
      <div class="flex flex-center v-height-15">
        <slot name="c-sidebar-title">TITLE</slot>
      </div>

      <div class="flex flex-center flex-column height-70">
        <slot name="c-sidebar-icon">ICON</slot>
      </div>

      <div class="flex flex-center height-15">
        <!-- <slot name="c-sidebar-actions">ACTIONS</slot> -->

        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-1')">
          <i class="fa fa-area-chart" aria-hidden="true"></i>
        </div>
        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-2')">
          <i class="fa fa-clock-o" aria-hidden="true"></i>
        </div>
        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-3')">
          <i class="fa fa-calendar" aria-hidden="true"></i>
        </div>
        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-4')">
          <i class="fa fa-sliders" aria-hidden="true"></i>
        </div>
      </div>
    </div>


    <div class="c-footer flex flex-center">
      <slot name="c-footer"></slot>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex"

  export default {
    name: "Index",

    props: {
      hcolor: {
        type: String,
        default: 'green'
      }
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

  // ul
  //   padding: 0
  //   margin: 0
  //   li
  //     list-style: none
  //     padding: 1em
  //
  //     &.active
  //       color: $green

  .c-responsive
    height: 100%
    width: 100%
    display: grid
    grid-template-areas: "c-header c-header"  "c-body c-body" "c-footer c-footer"

    // NOTE: Broken on safari
    // grid-template-columns: 1fr auto
    // grid-template-rows: 25% auto 10%

    // NOTE: Works on safari
    grid-template-columns: 100%
    grid-template-rows: 30% 60% 10%

    .flex
      div
        width: 100%
        text-align: center

    button
      font-weight: bold
      width: 100%
      height: 100%
      background: #fff
      border: none
      outline: none

  .c-header
    grid-area: c-header
    // background-color: $green
    overflow: auto
    color: white

  .c-body
    grid-area: c-body
    background-color: white

  .c-sidebar
    grid-area: c-sidebar
    // background-color: $green
    color: white
    overflow: hidden
    overflow: auto
    width: 0px

    // transition: width 1s

  .c-footer
    border-top: 0.1rem dotted #ccc
    border-bottom: 0.1rem dotted #ccc
    grid-area: c-footer
    background-color: white
    color: black

  @media (min-width: 40em)
    .c-responsive
      grid-template-areas: "c-header c-header"  "c-body c-sidebar" "c-footer c-sidebar"

      grid-template-columns: auto 30%
      grid-template-rows: 0 1fr 15%

      .c-body
        width: 100%

      .c-sidebar
        width: 100%
</style>
