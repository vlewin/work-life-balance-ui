<template>
  <body>
    <div class="background"></div>
    <div unselectable="on" id="circle" style="position: absolute; background-color: rgb(24, 159, 255); width: 1583.05px; height: 1583.05px; border-radius: 50%; left: 73px; top: 61px; margin-left: -791.526px; margin-top: -791.526px; user-select: none;"></div>
    <div>
      <div class="button"></div>
      <div class="button"></div>
      <div class="button"></div>
      <div class="button"></div>
    </div>
  </body>
</template>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto);
html body {
  font-family: 'Roboto', sans-serif;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.background {
  position: fixed;
  width: 100%;
  height: 100%;
}

.button {
  -webkit-transition: 0.3s ease all;
  transition: 0.3s ease all;
  display: block;
  text-align: center;
  position: fixed;
  cursor: pointer;
  width: 100px;
  height: 50px;
  -webkit-box-shadow: 0 3px 17px 0 rgba(0, 0, 0, 0.2);
          box-shadow: 0 3px 17px 0 rgba(0, 0, 0, 0.2);
}
.button:nth-child(1) {
  left: 50px;
  top: 50px;
  background-color: #189FFF;
}
.button:nth-child(1):after {
  content: "#189FFF";
}
.button:nth-child(2) {
  right: 50px;
  top: 50px;
  background-color: #FF440D;
}
.button:nth-child(2):after {
  content: "#FF440D";
}
.button:nth-child(3) {
  left: 50px;
  bottom: 50px;
  background-color: #14C239;
}
.button:nth-child(3):after {
  content: "#14C239";
}
.button:nth-child(4) {
  right: 50px;
  bottom: 50px;
  background-color: #9121E8;
}
.button:nth-child(4):after {
  content: "#9121E8";
}
.button:hover {
  -webkit-transition: 0.3s ease all;
  transition: 0.3s ease all;
  -webkit-box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.2);
          box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.2);
  -webkit-transform: translateY(-2px);
          transform: translateY(-2px);
}
.button:after {
  font-size: 18px;
  color: white;
  line-height: 50px;
}
.button:active {
  -webkit-transition: 0.3s ease all;
  transition: 0.3s ease all;
  border: none;
  -webkit-box-shadow: none;
          box-shadow: none;
  -webkit-transform: none;
          transform: none;
}
.button.current {
  -webkit-transition: 0.3s ease all;
  transition: 0.3s ease all;
  border: none;
  -webkit-box-shadow: none;
          box-shadow: none;
  pointer-events: none;
}

</style>
