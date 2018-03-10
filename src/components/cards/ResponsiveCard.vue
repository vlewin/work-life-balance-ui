<template>
  <div class="c-responsive">
    <div class="c-header flex flex-around flex-column">
      <!-- <i class="fa fa-clock-o fa-5x text-white"></i> -->
      <i class="fa fa-check-circle fa-7x" aria-hidden="true"></i>
    </div>

    <div class="c-body flex flex-between flex-column">
      <div class="flex flex-center v-height-15 width-100">
        <ul class="flex flex-between">
          <li><i class="fa fa-chevron-left" aria-hidden="true"></i></li>
          <li class="active">Mo</li>
          <li>Di</li>
          <li>Mi</li>
          <li>Do</li>
          <li>Fr</li>
          <li><i class="fa fa-chevron-right" aria-hidden="true"></i></li>
        </ul>
      </div>

      <!-- <p class="date-selector height-10">
        << Tu, 12 March >>
      </p> -->

      <div class="time-selector flex flex-around">
        <h4>
          <span class="font-3">
            <small><i class="fa fa-clock-o"></i></small>
            08:00
          </span>
        </h4>
        <h4>
          <span class="font-3">
            <small><i class="fa fa-coffee"></i></small>
            00:30
          </span>
        </h4>
        <h4>
          <span class="font-3">
            <small><i class="fa fa-clock-o"></i></small>
            18:00
          </span>
        </h4>
      </div>
      <div class="flex flex-center v-height-15">
        TODAY: +0.5
      </div>
    </div>

    <div class="c-sidebar flex flex-between flex-column">
      <div class="flex flex-center v-height-15">
        Sa, 12 March
      </div>

      <div class="flex flex-center flex-column">
        <!-- <i class="fa fa-clock-o fa-5x text-white"></i> -->
        <i class="fa fa-heartbeat fa-6x" aria-hidden="true"></i>
        <div class="font-4">
          8.5<small>h</small>
        </div>
      </div>
      <!-- <div class=""><span class="font-2">TOTAL: +2.5</span></div> -->
      <div class="flex flex-center height-15">
        <div class="font-2">
          <i class="fa fa-ban" aria-hidden="true"></i>
          <!-- <i class="fa fa-file-text" aria-hidden="true"></i> -->
        </div>
        <div class="font-2">
          <i class="fa fa-area-chart" aria-hidden="true"></i>
        </div>
        <div class="font-2">
          <i class="fa fa-sliders" aria-hidden="true"></i>
        </div>
      </div>
    </div>


    <div class="c-footer flex flex-center">
      <button class="font-2">SAVE</button>
      <button class="font-2">DELETE</button>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  @import '~@/assets/_variables.sass'

  .flex
    div
      width: 100%
      text-align: center

  ul
    padding: 0
    margin: 0
    li
      list-style: none
      padding: 1em

      &.active
        color: $green

  .c-responsive
    height: 100%
    width: 100%
    display: grid
    grid-template-columns: 1fr auto
    grid-template-rows: 25% auto 10%
    grid-template-areas: "c-header c-header"  "c-body c-sidebar" "c-footer c-footer"

    button
      font-weight: bold
      width: 100%
      height: 100%
      background: #fff
      border: none
      outline: none

  .c-header
    grid-area: c-header
    background-color: $green
    overflow: auto
    color: white

  .c-body
    grid-area: c-body
    background-color: white

  .c-sidebar
    grid-area: c-sidebar
    background-color: $green
    color: white
    overflow: hidden
    overflow: auto
    width: 0px

    // transition: width 1s

  .c-footer
    border-top: 0.1rem dotted #ccc
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
