<template>
  <div>
    <button-group :buttons="buttons"></button-group>
  </div>
</template>

<script>
import ButtonGroup from './ButtonGroup.vue'
export default {
  name: "Playground",
  components: { ButtonGroup },
  data() {
    return {
      buttons: [{ name: 'Add', color: 'blue' }, { name: 'Remove', color: 'red' }]
    }
  },
}
</script>

<style>

</style>
