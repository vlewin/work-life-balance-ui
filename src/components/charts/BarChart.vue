<template>
  <!-- <div class="bar-outer" style="width: 100%; height: {{height}}; background-color: {{backgroundColor}};">
    <div class="bar-inner" style="width: {{percent}}%; height: {{height}};  background-color: {{foregroundColor}}">
  </div> -->
</template>

<script>

export default {
  data() {
    return {
      // foregroundColor: "#badaff",
      // backgroundColor: "#bada55",
      // percent: 25,
      height: '1em'
    }
  },
  replace: true,
  props: ['percent', 'foreground-color', 'background-color']
}
</script>
<style>
body {
  background: #ffffff;
}

svg {
  width: 300px;
  height: 300px;
}
</style>
