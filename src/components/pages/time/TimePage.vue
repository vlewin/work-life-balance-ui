<template>
  <card hcolor="blue-2">
    <i slot="c-header-icon" class="fa fa-clock fa-5x" aria-hidden="true"></i>
    <template slot="c-header-title">
      {{ currentDate.toLocaleDateString("de-DE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
    </template>

    <div slot="c-body" class="pane" :class="{ open: picker.open }">
      <time-picker :target="picker.target" :init-value="picker.value" v-on:changed="setValue" v-on:close="closePicker"></time-picker>
    </div>

    <date-picker slot="c-body" class="flex flex-center"></date-picker>

    <div slot="c-body" class="flex flex-between container">
      <div class="flex flex-center content" slot="c-body">
        <circle-controls class="flex flex-center relative" :form="form" v-on:absence="absence" v-on:delete="remove">
          <circle-absence slot="inside" :open="setAbsence || isAbsence" :form="form" v-on:selected="save"></circle-absence>
        </circle-controls>
      </div>

      <time-form class="info" :form="form" v-on:open="openPicker"></time-form>
    </div>

    <template slot="c-sidebar-title">
      {{ currentDate.toLocaleDateString("de-DE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
    </template>

    <i slot="c-sidebar-icon" class="fa fa-clock fa-6x" aria-hidden="true"></i>

    <simple-switch slot="c-footer" class="horizontal animated" :active="picker.open">
      <simple-switch slot="up" class="vertical animated" :active="loading">
        <button v-if="isAbsence" class="text-white" slot="up" v-on:click="remove">
          DELETE
        </button>
        <button v-else class="text-white" slot="up" v-on:click="save">
          {{ isRecorded? 'UPDATE' : 'SAVE'}}
        </button>
        <button class="text-white" slot="down" disabled>PLEASE WAIT...</button>
      </simple-switch>
      <button class="text-white" slot="down" :class="{ active: picker.open }" v-on:click="closePicker">CLOSE</button>
    </simple-switch>
  </card>
</template>

<script>
  import { mapState, mapGetters } from "vuex"
  import DatePicker from "./DatePicker"
  import TimePicker from "./TimePicker"
  import CircleControls from "./CircleControls"
  import CircleInfo from "./CircleInfo"
  import CircleAbsence from './CircleAbsence.vue'

  import Card from "../../shared/ResponsiveCard"
  import SimpleSwitch from "../../shared/SimpleSwitch"
  import TimeForm from "./TimeForm"

  import differenceInMinutes from "date-fns/difference_in_minutes"
  import format from "date-fns/format"
  import addHours from "date-fns/add_hours"
  import isSameDay from "date-fns/is_same_day"

  import { timeToNumber, timeToDateTime, dateTimeToTime, getUTCDate } from "../../../helpers/date"

  export default {
    name: "TimeCard",
    components: {
      Card,
      DatePicker,
      CircleControls,
      CircleInfo,
      CircleAbsence,
      TimePicker,
      SimpleSwitch,
      TimeForm
    },

    data() {
      return {
        setAbsence: false,
        picker: {
          open: false,
          value: null,
          target: 'start'
        },

        form: {
          start: "",
          pause: "",
          end: ""
        }
      }
    },

    created() {
      this.initForm()
    },

    async mounted() {
      await this.$store.dispatch("fetchMonthRecords")
    },

    watch: {
      "form.start"(val) {
        if (val) {
          // console.log("HomePage - start value changed", val)
          this.calculateEnd()
        }
      },

      "form.pause"(val) {
        if (val) {
          // console.log("HomePage - pause value changed", val)
          this.calculateEnd()
        }
      },

      "form.end"(val) {
        if (val) {
          // console.log("HomePage - end value changed", val)
          this.calculateDuration()
        }
      },

      currentDate() {
        // console.log("HomePage - currentDate changed", this.currentDate)
        this.initForm()
        this.reset()
      },

      currentRecord() {
        // console.log("HomePage - currentRecord changed", oldVal, val)
        this.initRecord()
      }
    },

    computed: {
      ...mapGetters(["currentFomatedDate", "currentWeekNumber", "currentMonthNumber", "currentRecord"]),
      ...mapState(["fetching", "loading", "currentDate", "records", "page"]),

      isRecorded() {
        return !!this.currentRecord
      },

      isAbsence() {
        return this.isRecorded && this.currentRecord.type === 'absence'
      }
    },

    methods: {
      // ...mapActions(["navigate"]),

      initRecord() {
        if (this.isRecorded) {
          // console.info('isRecorded:', JSON.stringify(this.currentRecord))
          this.$set(this, 'form', this.currentRecord)
        }
      },

      initForm() {
        if (this.isRecorded) {
          this.$set(this, 'form', this.currentRecord)
        } else {
          this.form = {
            timestamp: getUTCDate(this.currentDate).getTime(),
            date: this.currentDate.toDateString(),
            start: dateTimeToTime(new Date()),
            pause: "00:30"
          }
          this.calculateEnd()
          this.calculateDuration()
        }
      },

      calculateEnd() {
        if(this.isRecorded) {
          console.log('Skip end estimation')
        } else {
          // console.log('Estimate end')

          const diff = 8 + timeToNumber(this.form.pause)
          const start = timeToDateTime(this.currentDate, this.form.start)
          const end = addHours(start, diff)

          if (isSameDay(start, end)) {
            this.form.end = format(addHours(start, diff), "HH:mm")
          } else {
            this.form.end = "23:55"
          }
        }

      },

      calculateDuration() {
        const start = timeToDateTime(this.currentDate, this.form.start)
        const end = timeToDateTime(this.currentDate, this.form.end)
        const total = (differenceInMinutes(end, start) / 60).toFixed(2)
        const duration = total - timeToNumber(this.form.pause)

        this.$set(this.form, "duration", duration)
        return duration
      },

      setValue(target, value) {
        this.$set(this.form, target, value)

        if (["start", "pause"].includes(target)) {
          this.calculateEnd()
        }

        this.calculateDuration()
      },

      save: async function() {
        await this.$store.dispatch("saveRecord", this.form)
        // await this.$store.dispatch("fetchBalance")
      },

      remove: async function() {
        await this.$store.dispatch("deleteRecord", this.form)
        // await this.$store.dispatch("fetchBalance")
      },

      absence() {
        this.setAbsence = !this.setAbsence
      },

      openPicker(picker, target) {
        if(picker === 'absence') {
          this.setAbsence = !this.setAbsence
        } else {
          this.picker.target = target
          this.picker.value = this.form[target]
          this.picker.open = true
        }
      },

      closePicker() {
        this.picker = this.$options.data().picker
      },

      reset() {
        this.closePicker()
        this.setAbsence = null
      }
    }
  }
</script>

<style lang="sass" scoped>
  button
    font-weight: bold
    width: 100%
    height: 100%
    font-size: 100%
    background: transparent
    border: none
    outline: none

  .container
    margin: auto


  @media screen and (max-height: 40em) and (orientation:landscape)
    .container
      display: flex
      justify-content: space-around

      .info
        flex-direction: column
        height: auto

        div
          display: flex
          justify-content: center
          align-items: center


  .pane
    height: 100%
    text-align: center
    z-index: 100
    position: absolute
    transform: translateY(100%)
    transition: transform 0.25s
    background: #fff

  @media screen and (orientation: portrait)
    .pane
      width: 100%

    &.open
      transform: translateY(0)
      // height: 100%

    .container
      flex-direction: column

    .content
      width: 100%

    .info
      width: 100%
      height: 10vh

  @media screen and (orientation: landscape)
    .pane
      // width: 70%

    &.open
      transform: translateY(0%)
      // height: 85%

    .content
      width: 70%
      height: 80%


    .info
      flex-direction: column
      width: 30%
      height: 10vh

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


<style lang="sass" scoped>
  .container
    height: calc(100% - 10vh)
    display: flex

  .content
    flex: auto

  @media screen and (orientation: portrait)
    .container
      flex-direction: column

    .info
      height: 10vh
      width: 100%

  @media screen and (orientation: landscape)
    .container
      flex-direction: row

    .content
      width: 80%

    .info
      width: 20%
</style>
