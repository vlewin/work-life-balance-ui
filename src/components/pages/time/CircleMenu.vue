<template>
  <div id="circle-menu" :class="{ loading: fetching }">
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
          <span class="text" v-on:click="emit('start')">{{ form.start }}</span>
        </a>
      </li>
      <li class="two">
        <a href="#">
          <span class="text" v-on:click="emit('pause')">{{ form.pause }}</span>
        </a>
      </li>
      <li class="three">
        <a href="#">
          <span class="text" v-on:click="emit('finish')">{{ form.finish }}</span>
        </a>
      </li>
      <li class="four">
        <a href="#">
          <span class="text"></span>
        </a>
      </li>
      <li class="five">
        <a href="#">
          <span class="text">****</span>
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
  import { mapGetters, mapState } from "vuex"

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
      ...mapState(["fetching"]),
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
    border-radius: 100%;

    .circle {
      position: absolute;
      // top: 20%;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      z-index: 99;
      background: #fff;
      border: 0.75rem solid #eee;
      border-radius: 50%;
      // width: 8rem;
      // height: 8rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
  }

  h2, h3 {
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
    width: calc(16rem - 0.4rem);
    padding-top: calc(16rem - 0.4rem);
    color: #fff;
    transform: scale(1.0);
    transition: transform .25s ease;
  }

  .menu {
    transform: scale(0.5);
  }

  .menu.open {
    transform: scale(1.0);
    transition: transform 0.5s ease;
  }

  .menu li {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
    transform: rotate(-120deg);
    background-color: darken($base, 20%);
  }

  .two {
    background-color: darken($base, 10%);
    transform: rotate(-60deg);
  }

  .three {
    background-color: darken($base, 20%);
    transform: rotate(0deg);
  }

  .four {
    background-color: darken($base, 10%);
    transform: rotate(-180deg);
  }

  .five {
    background-color: darken($base, 10%);
    transform: rotate(-240deg);
  }

  .six {
    background-color: darken($base, 10%);
    transform: rotate(-300deg);
  }

  .text {
    position: absolute;
    right: 4%;
    top: 25%;
    transform: rotate(60deg);
    font-size: 1.4rem;
    color: #fff;
    height: 2rem;
    width: 4rem;
  }

  @keyframes scale {
    from { transform: rotate(0deg), scale(0.75); }
    to { transform: scale(0.5) }
  }

  @media screen and (orientation: portrait) {
    .menu {
      width: 18rem;
      padding-top: 18rem;
    }

    #circle-menu {
      .circle {
        width: 10rem;
        height: 10rem;
      }
    }
  }


  @media screen and (max-width: 50em) and (orientation: landscape) {
    #circle-menu {
      .circle {
        width: 8rem;
        height: 8rem;
      }
    }
  }

  @media screen and (min-width: 50em) {
    .menu {
      width: 20rem;
      padding-top: 20rem;
    }

    #circle-menu {
      .circle {
        top: unset;
        width: 11rem;
        height: 11rem;
      }
    }
  }

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
