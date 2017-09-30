<template>
  <div class="container">
    {{ timestamp }}

    <p>Pause: {{ pause }}</p>
    <p>Duration: {{ duration }}</p>

    <p>
      <input type="text" v-model="timestamp.start"/>
      {{ pause }}
      <select v-model="timestamp.pause">
        <option v-for="minute in minutes" :value="minute" :selected="minute == pause" >{{minute}} - {{ pause }}</option>
      </select>
      <input type="text" v-model="timestamp.end"/>
    </p>

    <button v-on:click="submit">Submit</button>
  </div>
</template>

<script>
  import VueTimepicker from 'vue2-timepicker'
  import Timestamp from '../models/timestamp'
  export default {
    name: 'Time',
    components: { VueTimepicker },
    data () {
      return {
        minutes: ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
        date: new Date(),
        timestamp: new Timestamp()
      }
    },

    filters: {

    },

    created () {
      window.Timestamp = Timestamp

      setInterval(() => {
        this.time = new Date()
      }, 1000)
    },

    watch: {
      'timestamp.start': function (val) {
        if (val) {
          this.timestamp.estimatedPause = this.pause
          this.timestamp.end = Timestamp.calculateEnd(this.timestamp)
        }
      },

      'timestamp.pause': function (val) {
        if (val) {
          this.timestamp.end = Timestamp.calculateEnd(this.timestamp)
        }
      },

      'timestamp.end': function (val) {
        if (val) {
          this.timestamp.estimatedPause = this.pause
          this.timestamp.duration = this.duration
          this.timestamp.total = this.total
        }
      }
    },

    computed: {
      pause () {
        return Timestamp.calculatePause(this.duration).toString()
      },

      duration () {
        return Timestamp.calculateDuration(this.timestamp)
      },

      total () {
        return Timestamp.calculateTotal(this.timestamp)
      }

    },

    methods: {
      submit () {
        console.log(new Timestamp(this.timestamp))
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">

</style>
