<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">HEADER</slot>
    </div>

    <div class="card-body">
      <slot name="body">BODY</slot>
    </div>

    <div class="card-footer blue">
      <slot name="footer">FOOTER</slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  grid-template-columns: 100%;
  grid-template-areas:
    "header"
    "content"
    "footer";
}

.card-header {
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.card-header > * {
  width: 100%;
  height: 100%;
  text-align: center;
}

.card-body {
  grid-area: content;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.card-footer {
  grid-area: footer;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /*border-top: 1px solid #eee;*/
}

.card-footer button {
  width: 100%;
  height: 100%;
}

/* .card-footer button {
  background: none;
  border: none;
  outline: none;
  font-size: 100%;
  width: 100%;
  height: 100%;
  color: #fff;
  border-radius: unset;
}

.card-footer button:hover {
  background: rgba(0, 0, 0, 0.3);
}

.card-footer button:first-child {
  border-right: 1px solid #eee;
} */
</style>
