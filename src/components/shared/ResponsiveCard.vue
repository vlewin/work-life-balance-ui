<template>
  <div class="c-responsive">
    <div class="c-header flex flex-around flex-column width-100" :class="[hcolor]">
      <slot name="c-header-icon">ICON</slot>
      <slot name="c-header-title">&nbsp;</slot>

      <div class="flex flex-center width-100 height-10">
        <!-- <slot name="c-header-actions">HEADER</slot> -->

        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-1')">
          <i class="fas fa-chart-pie"></i>
        </div>
        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-2')">
          <i class="fas fa-clock"></i>
        </div>
        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-3')">
          <i class="fas fa-calendar-plus"></i>
        </div>
        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-1')">
          <i class="fas fa-sliders-h"></i>
        </div>
      </div>
    </div>

    <div class="c-body flex flex-between flex-column">
      <slot name="c-body">S-BODY</slot>
    </div>

    <div class="c-sidebar flex flex-between flex-column" :class="[hcolor]">
      <div class="c-sidebar-title flex flex-center">
        <slot name="c-sidebar-title">TITLE</slot>
      </div>

      <div class="flex flex-center flex-column">
        <slot name="c-sidebar-icon">ICON</slot>
      </div>

      <div class="c-sidebar-actions flex flex-center height-15">
        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-1')">
          <i class="fas fa-chart-pie"></i>
        </div>
        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-2')">
          <i class="fas fa-clock"></i>
        </div>
        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-3')">
          <i class="fas fa-calendar-plus"></i>
        </div>
        <div slot="c-header-actions" class="font-2" v-on:click="navigate('page-4')">
          <i class="fas fa-sliders-h"></i>
        </div>
      </div>
    </div>


    <!-- <div class="c-footer flex flex-center text-white" :class="[hcolor]"> -->
    <div class="c-footer flex flex-center text-white">
      <slot name="c-footer"></slot>
    </div>
  </div>
</template>

<!-- https://codemyui.com/tag/button/page/3/ -->
<!-- https://tympanus.net/Development/SidebarTransitions/ -->
<!-- https://speckyboy.com/html-css-examples-of-material-design-in-action/ -->

<script>
  import { mapState, mapGetters, mapActions } from "vuex"

  export default {
    name: "ResponsiveCard",
    props: {
      hcolor: {
        type: String,
        default: 'green'
      }
    },

    computed: {
      ...mapState([""])
    },

    methods: {
      ...mapActions(["navigate"])
    }
  }
</script>

<style lang="sass" scoped>
  @import '~@/assets/_variables.sass'
  $base: #3C537A

  .c-responsive
    height: 100%
    width: 100%
    display: grid
    background: $grey

    grid-template-areas: "c-header c-header"  "c-body c-body" "c-footer c-footer"

    // NOTE: Broken on safari
    // grid-template-columns: 1fr auto
    // grid-template-rows: 25% auto 10%

    // NOTE: Works on safari
    grid-template-columns: 100%
    grid-template-rows: 30vh 60vh 10vh


  .c-header, .c-sidebar, .c-sidebar-actions
    background-color: darken($base, 10%)

  .c-footer
    background-color: darken($base, 5%)

  .c-header
    grid-area: c-header
    overflow: auto
    color: white
    position: relative
    font-weight: bold

    i
      padding-top: 0.2rem


    // background: $base

  .c-body
    grid-area: c-body
    background-color: white

  .c-sidebar
    grid-area: unset
    color: white
    overflow: hidden
    overflow: auto
    width: 0px
    font-weight: bold

    clip-path: circle(10% at 50% 50%)
    transition: clip-path 0.5s 0.5s ease
    z-index: 1

  // .c-sidebar-actions
  //   background-color: darken($base, 10%)

  .c-footer
    grid-area: c-footer
    z-index: 100

    button
      font-weight: bold
      width: 100%
      height: 100%
      font-size: 100%
      background: transparent
      border: none
      outline: none
      color: inherit

  @media screen and (orientation: portrait)
    .c-sidebar-title
      height: 10vh

  @media screen and (orientation: landscape)
    .c-responsive
      grid-template-areas: "c-header c-header"  "c-body c-sidebar" "c-footer c-sidebar"
      grid-template-columns: auto 30%
      grid-template-rows: 0 1fr 10vh

      .c-header

      .c-body
        width: 100%

      .c-sidebar
        grid-area: c-sidebar
        width: 100%

      .c-sidebar-title
        height: 10vh

      .c-sidebar-actions
        height: 10vh

  // ANIMATIONS
  .c-header
    clip-path: circle(20% at 50% 34%)
    transition: clip-path 0.5s 0.5s ease

  .c-sidebar
    clip-path: circle(20% at 50% 50%)
    transition: clip-path 0.5s 0.5s ease

  .active
    .c-header
      clip-path: circle(100% at 50% 34%)
      transition: clip-path 0.5s 0.5s ease

    .c-sidebar
      clip-path: circle(100% at 50% 50%)
      transition: clip-path 0.5s 0.5s ease

  @media screen and (max-height: 40em) and (orientation: landscape)
    .c-responsive
      grid-template-rows: 0 1fr 15vh

      .c-sidebar-title
        height: 15vh

      .c-sidebar-actions
        height: 15vh

</style>
