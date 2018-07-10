<template>
  <div id="time-form" class="flex flex-center height-100" slot="up">
    <div class="flex flex-center flex-column time-form-item" v-on:click="emit('time', 'start')">
      <span>{{ form.start }}</span>
      <label>
        <!-- <i class="fa fa-plane text-green" aria-hidden="true"></i> -->
        <i class="fas fa-clock text-light-blue"></i>
        START
      </label>
    </div>
    <div class="flex flex-center flex-column time-form-item" v-on:click="emit('time', 'pause')">
      <span>{{ form.pause }}</span>
      <label>
        <!-- <i class="fa fa-heartbeat text-amber" aria-hidden="true"></i> -->
        <i class="fas fa-coffee text-amber"></i>
        PAUSE
      </label>
    </div>
    <div class="flex flex-center flex-column time-form-item" v-on:click="emit('time', 'end')">
      <span>{{ form.end }}</span>
      <label>
        <!-- <i class="fa fa-gift text-tomato" aria-hidden="true"></i> -->
        <i class="fas fa-clock text-light-blue"></i>
        END
      </label>
    </div>
  </div>
</template>


<script>
  export default {
    name: "TimeForm",
    data() {
      return {
      }
    },

    props: {
      form: {
        type: Object
      },

      mode: {
        type: String
      }
    },

    mounted() {
    },

    computed: {
    },

    methods: {
      emit(picker, target) {
        this.$emit("open", picker, target)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .time-form-item
    height: 100%
    font-weight: bold
    background: #fafafa
    color: #34495e

    &:hover
      background: #eee


  @media screen and (orientation: portrait)
    #time-form
      flex-direction: row
      border-top: 1px solid #eee

      span
        font-size: 1.8rem

      label
        font-size: 0.6rem

  @media screen and (orientation: landscape)
    #time-form
      flex-direction: column
      border-left: 1px solid #eee
      height: 100%
      font-weight: bold

      span
        font-size: 1.8rem

      label
        font-size: 0.6rem
</style>
