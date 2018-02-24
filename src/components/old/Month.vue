<template>
  <ul class="flex-container flex-wrap">
    <li class="flex-item" v-for="day in month">
      {{ day }}
    </li>
  </ul>

</template>

<script>
Array.range = (start, end) =>
  [...Array(end - start + 1)].map((_, i) =>
    (start + i).toString().padStart(2, "0")
  );

export default {
  name: "Month",
  data() {
    return {
      month: Array.range(1, 31)
    };
  }
};
</script>

<style>
.flex-column {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-container {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-item {
  /*background: tomato;*/
  background: #ccc;

  padding: 4px;
  margin: 2px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  display: inline-block;
  color: #fff;
}

.disabled {
  background: #ddd;
}

.selected {
  background: #42b983;
}
</style>
