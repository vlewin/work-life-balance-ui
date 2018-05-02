<template>
  <div id="circle-menu" :class="{ loading: fetching }">
    <div id="inside" v-on:click="toggleLoading">
      <h3 class="hidden">LOADING ...</h3>
      <h2 class="no-margin">
        {{ form.duration }}
        <label>hours</label>
      </h2>
      <h3 class="no-margin">
        <small>{{ form.start }} - {{ form.finish }}</small>
        <label>&num; {{ form.week }}</label>
      </h3>
    </div>

    <ul id="outside" :class="{ open: open }">
      <li class="one">
        <span class="text" v-on:click="emit('start')">{{ form.start }}</span>
      </li>
      <li class="two">
        <span class="text" v-on:click="emit('pause')">{{ form.pause }}</span>
      </li>
      <li class="three">
        <span class="text" v-on:click="emit('finish')">{{ form.finish }}</span>
      </li>
      <li class="four">
        <span class="text"></span>
      </li>
      <li class="five">
        <span class="text">&#11041;</span>
      </li>
      <li class="six">
        <span class="icon"></span>
      </li>
    </ul>

    <svg height="0" width="0">
      <defs>
        <clipPath id="sector" clipPathUnits="objectBoundingBox">
          <path fill="none" stroke="#111" stroke-width="1" class="sector" d="M0.5,0.5 l0.5,0 A0.5,0.5 0 0,0 0.75,.066987298 z"></path>
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
      currentFomatedDate() {
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
  $base: #3C537A;

  #circle-menu.loading {
    #inside {
      transform: scale(1.5);
      transition: transform .25s ease;

      .hidden {
        display: inline;
      }

      :not(.hidden) {
        display: none;
      }
    }

    #outside {
      transform: rotate(270deg);
      animation: spin 1s ease-out;
      animation-iteration-count: infinite;

      .one, .three, .five {
        background-color: darken($base, 20%);
      }

      .two, .four, .six {
        background-color: lighten($base, 20%);
      }
    }
  }

  #circle-menu {
    border-radius: 100%;

    #inside {
      position: absolute;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      z-index: 99;
      background: #fff;
      border: 0.5rem solid #eee;
      border-radius: 50%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      transition: transform 2s 0.5s ease;
      box-shadow: inset 0 0 1em #1a2436;

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
        font-size: 2.2rem;
      }

      h3 {
        color: grey;
      }
    }
  }



  #outside {
    padding: 0;
    height: 0;
    list-style: none;
    position: relative;
    margin: auto;
    color: #fff;
    transition: transform .25s ease;
    transform: scale(0.5);

    &.open {
      transform: scale(1.0);
      transition: transform 0.5s ease;
    }

    li {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       clip-path: url(#sector);

       a {
         display: block;
         width: 100%;
         height: 100%;
       }

       &:hover {
         background-color: #FFBF00;
       }
     }
  }

  .one {
    transform: rotate(-120deg);
    background-color: darken($base, 20%);
  }

  .two {
    background-color: darken($base, 20%);
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
    // position: absolute;
    // top: 25%;
    // right: 6%;
    // transform: rotate(60deg);
    // font-size: 1.6rem;
    // color: #fff;
    // height: 2rem;
    // width: 4rem;

    position: absolute;
    top: 20%;
    right: 6%;
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg);
    font-size: 1.6rem;
    color: #fff;
    height: 2rem;
    width: 6rem;
  }

  @media screen and (orientation: portrait) {
    #circle-menu {
      #outside {
        width: 16.4rem;
        padding-top: 16.4rem;

        .text {
          top: 24%;
          right: -2%;
          line-height: 1.8rem;
          height: 2rem;
          color: #fff;
          // border: 1px solid white;
        }
      }

      #inside {
        width: 8.8rem;
        height: 8.8rem;
      }
    }
  }


  @media screen and (max-width: 50em) and (orientation: landscape) {
    #circle-menu {
      #outside {
        width: 14rem;
        padding-top: 14rem;

        .text {
          font-size: 1rem;
          line-height: 0.6rem;
          color: #fff;
          height: 5rem;
          width: 7rem;
        }
      }

      #inside {
        width: 7.2rem;
        height: 7.2rem;
      }
    }
  }

  @media screen and (min-width: 50em) {
    #circle-menu {
      #outside {
        width: 20rem;
        padding-top: 20rem;

        .text {
          top: 26%;
          right: 2%;
        }
      }

      #inside {
        top: unset;
        width: 11rem;
        height: 11rem;
      }
    }
  }
</style>
