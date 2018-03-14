<template>
  <div id="circle-menu">
    <div class="circle">
      <h1>8.5h</h1>
    </div>
    <ul class="menu">
      <li class="one">
        <a href="#">
          <span class="icon">08:00</span>
        </a>
      </li>
      <li class="two">
        <a href="#">
          <span class="icon">00:30</span>
        </a>
      </li>
      <li class="three">
        <a href="#">
          <span class="icon">17:30</span>
        </a>
      </li>
      <li class="four">
        <a href="#">
          <span class="icon"></span>
        </a>
      </li>
      <li class="five">
        <a href="#">
          <span class="icon">TOTAL</span>
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
          <circle></circle>
          <path fill="none" stroke="#111" stroke-width="1" class="sector" d="M0.5,0.5 l0.5,0 A0.5,0.5 0 0,0 0.75,.066987298 z"></path>
          <path fill="none" stroke="#111" stroke-width="1" class="big-sector" d="M0.5,0.5 l0.5,0 A0.5,0.5 0 0,0 0.75,.066987298 z"></path>
        </clipPath>
      </defs>
    </svg>
  </div>


</template>

<style lang="scss">
  // @import url(//fonts.googleapis.com/css?family=Indie+Flower);
  @keyframes move_eye { from { margin-left: -20%; } to { margin-left: 100%; }  }
  @keyframes rotate {
    from { transform: rotate(360deg), scale(0.75); }
    to { transform: scale(0.5) }
  }

  @keyframes scale {
    from { transform: scale(0.75); }
    to { transform: scale(0.5) }
  }

  $base: #A5E2F3;
  #circle-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .circle {
      position: absolute;
      /* left: 50%; */
      margin: 0 auto;
      z-index: 1000;
      background: #fff;
      border: 2px solid grey;
      border-radius: 50%;
      width: 20vh;
      height: 20vh;
      text-align: center;
    }
  }
  .menu {
    padding: 0;
    list-style: none;
    position: relative;
    margin: 30px auto;
    width: 70%;
    height: 0;
    padding-top: 70%;
    transform: scale(1.0);

    transition: all 3s ease;
    // animation: 1s linear 0s 0s alternate scale;

    // animation: 1s linear 0s infinite alternate rotate;
  }
  @media all and (max-width: 320px) {
    .menu {
      width: 230px;
      height: 230px;
      padding: 0;
    }
  }
  @media all and (min-width: 700px) {
    .menu {
      width: 500px;
      height: 500px;
      padding: 0;
    }
  }
  .menu li {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 1s ease;
    clip-path: url(#sector);
    /* try this one in Chrome/Opera/Safari */
    // clip-path: polygon(50% 50%, 100% 50%, 75% 6.6%);

    a {
      display: block;
      width: 100%;
      height: 100%;
    }

    &:hover {
      background-color: gold;
    }
  }

  .one {
    background-color: $base;
    transform: rotate(-120deg);
  }
  .two {
    background-color: darken($base, 7%);
    transform: rotate(-60deg);
  }
  .three {
    background-color: darken($base, 14%);
    transform: rotate(0deg);
  }
  .four {
    background-color: darken($base, 21%);
    transform: rotate(-180deg);
  }
  .five {
    background-color: darken($base, 28%);
    transform: rotate(-240deg);
  }
  .six {
    background-color: darken($base, 35%);
    transform: rotate(-300deg);
  }

  .icon {
    position: absolute;
    /* exact values here depend on what you are placing inside the items (icon, image, text, etc.) */
    right: 5%;
    top: 25%;
    /* make sure it it rotated enough; angle of rotation = angle of the sector itself */
    transform: rotate(60deg);

    /* style further as needed */
    color: darken($base, 60%);
    // font-family: Indie Flower;
    font-size: 25px;
  }

  p {
    text-align: center;
    width: 80%;
    margin: 0 auto;
  }
</style>
