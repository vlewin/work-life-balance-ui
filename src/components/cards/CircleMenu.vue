<template>
  <div id="circle-menu" :class="{ loading: loading }">
    <div class="circle" v-on:click="toggleLoading">
      <h3 class="hidden">LOADING ...</h3>
      <h2 class="no-margin">
        {{ duration }}
        <label>hours</label>
      </h2>
      <h3 class="no-margin">
        <small>{{ form.start }} - {{ form.finish }}</small>
        <label>&num; {{ form.week }}</label>
      </h3>
    </div>

    <ul class="menu" :class="{ open: open }">
      <li class="one">
        <a href="#">
          <span class="icon" v-on:click="emit('start')">{{ start }}</span>
        </a>
      </li>
      <li class="two">
        <a href="#">
          <span class="icon" v-on:click="emit('pause')">{{ pause }}</span>
        </a>
      </li>
      <li class="three">
        <a href="#">
          <span class="icon" v-on:click="emit('finish')">{{ finish }}</span>
        </a>
      </li>
      <li class="four">
        <a href="#">
          <span class="icon"></span>
        </a>
      </li>
      <li class="five">
        <a href="#">
          <span class="icon">****</span>
        </a>
      </li>
      <li class="six">
        <a href="#">
          <span class="icon"></span>
        </a>
      </li>
    </ul>

    <svg height="0" width="0">
      <defs>
        <clipPath clipPathUnits="objectBoundingBox" id="sector">
          <!-- <circle></circle> -->
          <!-- <path fill="none" stroke="#111" stroke-width="1" class="sector" d="M0.5,0.5 l0.5,0 A0.5,0.5 0 0,0 0.75,.066987298 z"></path> -->
          <path fill="none" stroke="#111" stroke-width="1" class="big-sector" d="M0.5,0.5 l0.5,0 A0.5,0.5 0 0,0 0.75,.066987298 z"></path>
        </clipPath>
      </defs>
    </svg>
  </div>
</template>

<script>
  import { mapGetters } from "vuex"

  export default {
    name: "CircleMenu",

    data() {
      return {
        loading: false,
        timeout: null,
        open: false
      }
    },

    props: {
      form: {
        type: Object
      },

      duration: {
        type: Number
      }
    },

    mounted() {
      this.timeout = setTimeout(() => {
        this.open = true
      }, 500)
    },

    watch: {
      currentFomatedDate(oldVal, val) {
        this.toggle()
      }
    },

    computed: {
      ...mapGetters(["currentFomatedDate"]),

      start() {
        return this.form.start
      },

      pause() {
        return this.form.pause
      },

      finish() {
        return this.form.finish
      },
    },

    methods: {
      toggleLoading() {
        this.loading = !this.loading
      },

      toggle() {
        clearTimeout(this.timeout)

        this.open = false
        this.timeout = setTimeout(() => {
          this.open = true
        }, 500)
      },

      emit(target) {
        this.$emit("open", target)
      }
    }
  }
</script>

<style lang="scss">
  $base: #A5E2F3;

  .hidden {
    display: none;
  }

  #circle-menu.loading {
    .circle {
      transform: scale(1.5);

      :not(.hidden) {
        display: none;
      }
    }

    .menu {
      transform: rotate(270deg);
      animation: spin 1s ease-out;
      animation-iteration-count: infinite;
    }

    .hidden {
      display: inline;
    }
  }

  #circle-menu {
    .circle {
      position: absolute;
      top: 20%;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      z-index: 99;
      background: #fff;
      border: 0.75rem solid darken($base, 0%);;
      border-radius: 50%;
      width: 8rem;
      height: 8rem;
      // line-height: 4rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;


    }


  }

  h2, h3 {
    // height: 50%;
    small {
      font-size: 50%;
    }

    label {
      font-size: 50%;
      display: block;
    }
  }

  h2 {
    font-size: 2.3rem;
  }

  h3 {
    color: grey;
  }

  .menu {
    padding: 0;
    height: 0;
    list-style: none;
    position: relative;
    margin: auto;
    width: 16rem;
    /* padding: 60% 0 0% 0; */
    padding-top: 16rem;
    color: #fff;
    transform: scale(1.0);
    transition: transform .25s ease;

    /* -webkit-transition: all 3s ease; */

    // transform: scale(0.8);
    /* -webkit-transition: all 3s ease; */
    // transition: all 3s ease;
    // animation: 1s linear 0s 0s alternate scale;

    // animation: 1s linear 0s infinite alternate rotate;
  }

  .menu {
    transform: scale(0.5);
  }

  .menu.open {
    transform: scale(1.0);
    transition: transform 0.5s ease;
  }

  // @media all and (max-width: 320px) {
  //   .menu {
  //     width: 230px;
  //     height: 230px;
  //     padding: 0;
  //   }
  // }

  // @media all and (min-width: 40em) {
  //   .menu {
  //     transform: scale(1.4);
  //   }
  // }

  .menu li {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // transition: all 1s ease;
    clip-path: url(#sector);
    /* try this one in Chrome/Opera/Safari */
    // clip-path: polygon(50% 50%, 100% 50%, 75% 6.6%);
    // clip-path: inset(10px 20px 30px 40px);

    a {
      display: block;
      width: 100%;
      height: 100%;
    }

    &:hover {
      background-color: #FFBF00;
    }
  }

  .one {
    background-color: $base;
    transform: rotate(-120deg);
    background-color: darken($base, 10%);
  }
  .two {
    background-color: darken($base, 20%);
    transform: rotate(-60deg);
  }
  .three {
    background-color: darken($base, 30%);
    transform: rotate(0deg);
  }
  .four {
    background-color: darken($base, 40%);
    transform: rotate(-180deg);
  }
  .five {
    background-color: darken($base, 40%);
    // background-color: darken($base, 28%);
    transform: rotate(-240deg);
  }
  .six {

    background-color: darken($base, 40%);
    // background-color: darken($base, 35%);
    transform: rotate(-300deg);
    // transform: rotate(-240deg);

  }

  .icon {
    position: absolute;
    /* exact values here depend on what you are placing inside the items (icon, image, text, etc.) */
    right: 4%;
    top: 25%;
    /* make sure it it rotated enough; angle of rotation = angle of the sector itself */
    transform: rotate(60deg);

    /* style further as needed */
    color: darken($base, 60%);
    // font-family: Indie Flower;
    font-size: 1.4rem;
    color: #fff;


    height: 2rem;
    width: 4rem;

  }

  .five .icon {
    // right: 10%;
    // transform: rotate(240deg);
  }

  p {
    text-align: center;
    width: 80%;
    margin: 0 auto;
  }

  @keyframes scale {
    from { transform: rotate(0deg), scale(0.75); }
    to { transform: scale(0.5) }
  }

  // @media screen and (orientation: portrait) {


  @media screen and (max-width: 50em) and (orientation: landscape) {
    .menu {
      // width: 18rem;
      // padding-top: 18rem;
    }

    #circle-menu .circle {
      top: 20%;
      width: 8rem;
      height: 8rem;
    }
  }

  @media screen and (min-width: 50em) {
    .menu {
      width: 18rem;
      padding-top: 18rem;
    }

    #circle-menu .circle {
      top: unset;
      width: 10rem;
      height: 10rem;
    }
  }

  // .loading {
  //   animation: pulsate 1s ease-out;
  //   animation-iteration-count: infinite;
  // }

  @keyframes spin {
      from {transform:rotate(0deg);}
      to {transform:rotate(360deg);}
  }

  @keyframes pulsate {
      0% {
        transform: scale(.1);
        opacity: 0.0;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: scale(1.2);
        opacity: 0;
      }
  }




</style>
