<template>
  <div>
    <h2>Animate flex grow horizontaly</h2>

    <div class="slider horizontal">
      <div class="top">
        AAA
      </div>
      <div class="middle">
        BBB
      </div>
      <div class="bottom">
        CCC
      </div>
    </div>

    <h2>Animate flex grow vertically</h2>

    <div class="slider vertical">
      <div class="top">
        <h3>08:00</h3>
        <h3>30</h3>
        <h3>18:00</h3>
      </div>
      <div class="middle">
        MIDDLE - HIDDEN
      </div>
      <div class="bottom">
        BOTTOM
      </div>
    </div>
  </div>
</template>

<style>
  .slider {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
    width: 100%;
    height: 200px;
  }

  .horizontal {
    width: 100%;
    height: 100%;
  }

  .vertical {
    flex-direction: column;
  }

  .slider:hover .top {
    flex:1 1 25%;
  }

  .slider:hover .middle {
    flex:1 1 50%;
  }

  .slider:hover .bottom {
    flex:1 1 25%;
  }

  .slider div {
    width: 100%;
    height: 100px;
    overflow: hidden;
    transition: flex 0.5s;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .top {
    background: red;
    flex:1 1 50%;
  }

  .middle {
    width: 100%;
    background: orange;
    flex:1 1 0%;
  }

  .bottom {
    background: green;
    flex:1 1 50%;
  }
</style>
