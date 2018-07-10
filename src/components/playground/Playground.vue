<template>
  <div>
    <button v-on:click="discover">Discover</button>
  </div>
</template>

<script>
export default {
  name: "Playground",
  components: {  },
  data() {
    return {
      buttons: [{ name: 'Add', color: 'blue' }, { name: 'Remove', color: 'red' }]
    }
  },

  mounted() {

    navigator.bluetooth.requestDevice
  },

  methods: {
    discover() {
      const filters = {
        acceptAllDevices: true,
        optionalServices: ['battery_service']
      }

      const gatt = navigator.bluetooth.requestDevice(filters).then(device => {
        console.log(device.name)
        return device.gatt.connect()
      }).catch(error => { console.log(error) })


    }
  }
}
</script>

<style>

</style>
