<template>
  <div id="app">
    <div class="header">
      <span class="header-left">
        <h1>
          {{ day }}
        </h1>
        <div class="date">
          <span>
            {{ month }} {{ year }}
          </span>
          <span>
            {{ weekday }}
          </span>
        </div>
      </span>
      <span class="header-right">
        {{ hours }}
        <span class="blink">:</span>
        {{ minutes }}
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
    name: 'App',
    data () {
      return {
        day: new Date().getDate().toString().padStart(2, '0'),
        month: new Date().toLocaleString('en-US', {month: 'long'}),
        year: new Date().getFullYear(),
        weekday: new Date().toLocaleString('en-US', {weekday: 'long'}),
        hours: new Date().getHours().toString().padStart(2, '0'),
        minutes: new Date().getMinutes().toString().padStart(2, '0')
      }
    },

    created () {
      setInterval(() => {
        this.time = new Date()
      }, 1000)
    }
  }

</script>


<style>
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;

    @import url('https://fonts.googleapis.com/css?family=Oxygen');
    font-family: 'Oxygen', Helvetica, Arial, sans-serif;
    color: #444444;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #98C2C2;
    background-image: linear-gradient(to top, #98C2C2 50%, #50A7C2 100%);
    /*-webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;*/
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
    background: #004a9f;

    /*background-image: linear-gradient(to right, #3D70BC 0%, #7CA5DD 100%);*/
    /*background-image: linear-gradient(-225deg, #2b76b9 0%, #50A7C2 100%);*/
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

  .header-right {
    letter-spacing: -0.1rem;
  }

  .header h1, .header-right {
    font-size: 4vh;
  }

  .header .date {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }

  .header .date span {
    font-size: 1.5vh;
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


  /* Small screen */
  @media only screen and (max-width: 320px) {
    html, body {
      font-size: 80%;
    }
  }

  /* Medium screen, non-retina */
  @media only screen and (min-width:600px) {
    #app {
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }
  }

  @media only screen and (min-width:600px) and (max-width: 1299px) {
    #app {
      grid-template-rows: 10vh 80vh;
      grid-template-columns: 80vw;
    }
  }

  /* Large screen, non-retina */
  @media only screen and (min-width: 1300px)  {
    html, body {
      font-size: 110%;
    }

    #app {
      grid-template-rows: 10vh 80vh;
      grid-template-columns: 40vw;
    }
  }

</style>
