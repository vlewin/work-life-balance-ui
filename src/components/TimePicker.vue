<template>
  <div class="time-picker">
    <ul class="flex-container">
      <li class="flex-item" v-for="hour in [1,2,3,4,5,6,7,8,9,0]">
        {{ hour }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .time-picker {
    width: 100%;
    height: 100%;
  }

  .flex-container {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }

  .flex-item {
    flex: 1 0 25%;
    text-align: center;
    vertical-align: middle;
    padding: 0.5em;
    font-size: 130%;
    font-weight: bold;
    color: #888;
  }

  .flex-item:not(.label) {
    cursor: pointer;
  }

  .flex-item.label {
    /*background: #f0f0f0;*/
    color: #444;
    user-select: none;
  }

  .disabled {
    background: #ddd;
  }

  .selected {
    background: #42b983;
  }

</style>
