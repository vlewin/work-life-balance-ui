<template>
  <div id="app">
    <div class="header">
      <span class="header-left">
        <h1>
          16
        </h1>
        <div class="date">
          <span>
            September 2017
          </span>
          <span>
            Sunday
          </span>
        </div>
      </span>
      <span class="header-right">
        10<span class="blink">:</span>00
      </span>
      <!-- <h1>
        <i class="fa fa-calendar"></i>
        16
      </h1>
      <div class="date">
        <span>
          September 2017
        </span>
        <span>
          Sunday
        </span>
      </div>
      <div>10:00</div> -->
    </div>

    <router-view></router-view>

    <!-- <div class="footer">footer</div> -->
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
    background: #eee;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #98C2C2;
  }

  #app {
      display: grid;
      justify-content: center;
      grid-template-rows: 10vh 90vh;
      grid-template-columns: 100vw;
			grid-template-areas: "header"
                           "content";
		}

  .header {
    background: #7CA5DD;
    background: #3D70BC;

    background-image: linear-gradient(to right, #4481eb 0%, #04befe 100%);
    background-image: linear-gradient(-225deg, #2b76b9 0%, #50A7C2 100%);
    color: #fff;
    grid-area: header;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-weight: bold;
  }

  .header-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .header h1, .header-right {
    font-size: 40px;
  }
  .header .date {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    border: 2px solid white;
  }

  .main {
    background: #fff;
    grid-area: content;

    /*display: flex;
    justify-content: center;
    align-items: center;*/
  }

  .footer {
    background: #c0392b;
    grid-area: footer;

    display: flex;
    justify-content: center;
    align-items: center;
  }


  /*=============================
  larger screens
  ===============================*/

@media only screen and (min-width:600px) {
  #app {
    border-radius: 5px;
    overflow: hidden;
    grid-template-rows: 10vh 80vh;
    grid-template-columns: 60vw;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    grid-template-areas: "header"
                         "content"

  }
}
</style>
