<template>
  <div class="select-box">
    <span class="select-box-item">VACATION</span>
    <span class="select-box-item">SICKNESS</span>
    <span class="select-box-item">HOLIDAY</span>
  </div>
</template>

<style>
  .select-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /*background: #1675d1;*/

  }

  .select-box-item {
    margin: 0 auto;
    padding: 0.5rem;
    border-radius: 3px;
    text-align: center;
    /*border: 1px solid #fff;*/
    /*color: #fff;*/
    /*background: #62a3ff;*/
    background: rgba(0,0,0,0.1);
    cursor: pointer;
  }

  .select-box-item:hover {
    /*background: #004a9f;*/
    background: rgba(0,0,0,0.1);
  }
</style>
