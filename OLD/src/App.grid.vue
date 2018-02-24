<template>
  <div id="app">
    <div class="header">
      <img src="./assets/logo.png">
      DATE
      TIME
    </div>

    <div class="main">
      <router-view></router-view>
    </div>

    <div class="footer">footer</div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    @import url('https://fonts.googleapis.com/css?family=Oxygen');
    font-family: 'Oxygen', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /*#app {
    @import url('https://fonts.googleapis.com/css?family=Oxygen');
    font-family: 'Oxygen', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    display: grid;
    min-height: 100vh;
    min-width: 100%;
    grid-template-columns: 40px 1fr;
    grid-template-rows: 1fr 90px;
    grid-template-areas: "sidebar  content"
                         "footer  footer";
  }*/

  /*#app {
    @import url('https://fonts.googleapis.com/css?family=Oxygen');
    font-family: 'Oxygen', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    min-height: 100%;
    min-width: 100%;

    display: grid;
    grid-template-rows: 1fr 50px;
  }

  #app {
     grid-template-areas: "content"
                          "footer";
  }

  @media only screen and (min-width: 600px) {
    #app {
      grid-template-columns: 200px 1fr;
      grid-template-areas: "sidebar  content"
                           "footer  footer";
    }
  }*/

  /*=============================
  default grid set up -> mobile first
  ===============================*/

  #app {
      display: grid;
      min-height: 100vh;
      min-width: 100%;
      grid-template-rows: 90px 1fr 90px;
      grid-template-columns: 1fr;
			grid-template-areas: "header"
                           "content"
                           "footer"
		}

  .header {
    background-color: #7f8c8d;
    color: rgba(255,255,255,0.8);
    grid-area: header;

    display: grid;
    justify-items: center;
    align-items: center;
  }

  .aside {
    background-color: #7f8c8d;
    color: rgba(255,255,255,0.8);
    grid-area: sidebar;

    display: grid;
    justify-items: center;
    align-items: center;

    /*display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;*/
  }

  .aside i {
    border: 1px solid red;
    display: none;
  }

  .main {
    background-color: #fff;
    grid-area: content;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer {
    background-color: #c0392b;
    grid-area: footer;
  }


  /*=============================
  larger screens
  ===============================*/

@media only screen and (min-width:600px) {
  #app {
    /*grid-template-columns: 1fr;*/
  }

  .aside i {
    display: block;
  }
}
</style>
