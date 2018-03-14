<template>
  <card hcolor="blue-2">
    <i slot="c-header-icon" class="fa fa-clock-o fa-6x" aria-hidden="true"></i>

    <!-- <div slot="c-body" class="flex flex-around width-100">
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
    </div> -->

    <!-- <div class="flex flex-center v-height-15">
      <div>
        <i class="fa fa-balance-scale" aria-hidden="true"></i>
        Balance: 0
      </div>
      <div>
        <i class="fa fa-chevron-circle-up" aria-hidden="true"></i>
        Today: 0
      </div>
    </div> -->

    <simple-slider slot="c-body" :active="timePicker">
      <div slot="up" class="simple-slider-item flex flex-between flex-column">
        <div class="flex flex-center flex-column height-100" v-if="!isPortraitMode">
          <h3>This view is not optmized for landscape mode</h3>
          <img class="img-responsive" src="../../assets/device-rotation.gif" />
        </div>

        <template v-else>
          <date-picker class="flex flex-center width-85 v-height-15"></date-picker>

          <div class="flex flex-align-start">
              <circle-menu></circle-menu>
              <!-- <gauge></gauge> -->

            <!-- <div class="circle flex flex-around flex-column">
              <small class="font-1">Come</small>
              <div class="font-3">08:00</div>
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              <div class="circle flex flex-around flex-column">
                <small class="font-1">Come</small>
                <div class="font-3">08:00</div>
                <i class="fa fa-clock-o" aria-hidden="true"></i>
              </div>
              <div class="circle flex flex-around flex-column">
                <small class="font-1">Come</small>
                <div class="font-3">08:00</div>
                <i class="fa fa-clock-o" aria-hidden="true"></i>
              </div>
            </div> -->

            <!-- <div class="circle flex flex-around flex-column">
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
            </div> -->
          </div>


        </template>

        <!-- <div class="flex flex-around flex-align-start v-height-35" v-on:click="timePicker=!timePicker">
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
        </div> -->

        <!-- <div class="flex flex-center v-height-15">
          <div>
            <i class="fa fa-balance-scale" aria-hidden="true"></i>
            Balance: 0
          </div>
          <div>
            <i class="fa fa-chevron-circle-up" aria-hidden="true"></i>
            Today: 0
          </div>
        </div> -->




      </div>

      <div class="simple-slider-item green" slot="down">
        <time-picker v-if="isPortraitMode" target="start"></time-picker>

        <!-- <time-picker></time-picker> -->
      </div>
    </simple-slider>

    <template slot="c-sidebar-title">{{ currentFomatedDate }}</template>

    <i slot="c-sidebar-icon" class="fa fa-clock-o fa-5x" aria-hidden="true"></i>

    <template slot="c-footer">
      <button>SAVE</button>
      <button v-on:click="timePicker=!timePicker">CANCEL</button>
    </template>
  </card>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex"
  import Card from "./ResponsiveCard"
  import DatePicker from "./DatePicker"
  import Gauge from "./Gauge"
  import CircleMenu from "./CircleMenu"

  // import HappyMeter from "./HappyMeter"
  import TimePicker from "./TimePicker"
  import SimpleSlider from "./SimpleSlider"

  export default {
    name: "Index",
    components: {
      Card,
      DatePicker,
      Gauge,
      CircleMenu,
      TimePicker,
      SimpleSlider
    },

    data() {
      return {
        isPortraitMode: true,
        timePicker: false
      }
    },

    created() {
      // FIXME: Move to APP created and save in store
      window.addEventListener("orientationchange", () => {
        if (window.orientation == 90 || window.orientation == -90) {
          console.log('Land')
          this.isPortraitMode = false
        } else {
          this.isPortraitMode = true
        }
      })
    },

    computed: {
      ...mapGetters(["currentFomatedDate", "currentWeekNumber", "currentRecord"]),
      ...mapState(["currentDate", "page"]),
    },

    methods: {
      ...mapActions(["navigate"])
    }
  }
</script>

<style lang="sass" scoped>
  @import '~@/assets/_variables.sass'
  .img-responsive
    width: 40%
    height: auto
    transform: rotate(90deg)

  .circle
    height: 5rem
    width: 5rem
    border: 0.5rem solid #ccc
    border-radius: 50%
</style>
