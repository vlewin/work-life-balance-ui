<template>
  <div id="app">
    <div class="header">
      <div class="header-left">
        <h1 class="day">{{ day }}</h1>
        <div class="date">
          <span>{{ month }} {{ year }}</span>
          <span>{{ weekday }}</span>
        </div>
      </div>
      <div class="header-right">
        <div class="time">
          {{ now.hh }}
          <span class="blink">:</span>
          {{ now.mm }}
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        date: new Date(),
        time: new Date()
      }
    },

    computed: {
      now () {
        return {
          hh: this.time.getHours().toString().padStart(2, '0'),
          mm: this.time.getMinutes().toString().padStart(2, '0')
        }
      },

      selected () {
        return this.$store.state.selectedDay
      },

      day () {
        return new Date(this.selected).getDate().toString().padStart(2, '0')
      },

      weekday () {
        return new Date(this.selected).toLocaleString('en-US', { weekday: 'long' })
      },

      month () {
        return new Date(this.selected).toLocaleString('en-US', { month: 'long' })
      },

      year () {
        return new Date(this.selected).getFullYear()
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
    /*background-image: linear-gradient(to top, #98C2C2 50%, #50A7C2 100%);*/
    /*background-image: linear-gradient(to bottom, #07c, #82ca9a);*/
    /*background-image: linear-gradient(to right, tomato 25%, #FFBF00 50%, #82ca9a 75%);*/
    background-image: linear-gradient(to top, #98C2C2 25%, #98C2C2 50%, #50A7C2 75%, #50A7C2 100%);

    /*-webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;*/
  }

  #app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /*align-items: center;*/

    display: grid;
    justify-content: center;
    grid-template-rows: 10vh 90vh;
    grid-template-columns: 100vw;
		grid-template-areas: "header"
                         "content";
	}

  .header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background: #004a9f;
    color: #fff;
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
    /*letter-spacing: -0.1rem;*/
  }

  .header-left h1, .time {
    font-size: 4vh;
  }

  .header .date {
    display: flex;
    flex-direction: column;
    margin-left: 0.4rem;
  }

  .header .date span {
    font-size: 1.5vh;
  }

  .header .blink {
    margin: -0.4rem;
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
  }

  /* Small screen */
  @media only screen and (max-width: 320px) {
    html, body {
      font-size: 80%;
    }
  }

  /* Medium screen, non-retina */
  @media only screen and (min-width: 321px) and (max-width: 600px) {
    html, body {
      font-size: 90%;
    }
  }

  @media only screen and (min-width: 601px) {
    html, body {
      font-size: 100%;
    }

    /*#app {
      grid-template-rows: 10vh 80vh;
      grid-template-columns: 80vw;

      border-radius: 5px;
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
      overflow: hidden;
    }*/
  }



  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    html, body {
      font-size: 100%;
    }
  }

  /* Tablet and Desktop Query */
  @media only screen and (min-width: 481px) {
    #app {
      border-radius: 5px;
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
      overflow: hidden;
    }
  }

  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:768px) {
    #app {
      grid-template-rows: 10vh 80vh;
      grid-template-columns: 80vw;
    }
  }

  /*Desktop Query*/
  @media only screen and (min-width: 769px) {
    #app {
      grid-template-rows: 10vh 70vh;
      grid-template-columns: 50vw;
    }
  }

  @media (min-width:1281px) {
    #app {
      grid-template-rows: 10vmin 70vmin;
      grid-template-columns: 50vmax;
    }
  }

</style>

<!-- @media (min-width:320px)  { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */ }
@media (min-width:480px)  { /* smartphones, Android phones, landscape iPhone */ }
@media (min-width:600px)  { /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */ }
@media (min-width:801px)  { /* tablet, landscape iPad, lo-res laptops ands desktops */ }
@media (min-width:1025px) { /* big landscape tablets, laptops, and desktops */ }
@media (min-width:1281px) { /* hi-res laptops and desktops */ } -->
