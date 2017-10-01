<template>
  <div class="input-time" v-on:keyup="record">
    <div class="switch vertical" v-for="(field, index) in fields" v-bind:class="{ selected: selected == index, set: fields[index].n }">
      <div v-bind:class="[`item-${index}`]">
        {{ fields[index].v }}
      </div>
      <div>
        {{ fields[index].n }}
      </div>
    </div>

    <input type="text" v-model="value" autofocus />
    <button v-on:click="next">NEXT</button>
  </div>
</template>

<script>
  export default {
    name: 'Time',
    components: {
    },

    data () {
      return {
        selected: 0,
        fields: [{v: 0, n: null}, {v: 0, n: null}, {v: 0, n: null}, {v: 0, n: null}],
        value: ''
      }
    },

    computed: {
      activeClass () {
        return true
      }
    },

    watch: {
      value (val) {
        if (val) {
          const index = val.length
          const field = this.fields[index - 1]
          console.log(val, index, JSON.stringify(field))
          if (index < 4) {
            field.n = val[index - 1]
            this.next()
          } else if (index === 4) {
            field.n = val[index - 1]
            this.selected = null
            console.log('DONE')
          } else {
            this.reset()
          }
        }
      }
    },

    methods: {
      record (event) {
        // console.log(event.code)
      },

      next () {
        this.selected += 1
      },

      reset () {
        this.fields = [{v: 0, n: null}, {v: 0, n: null}, {v: 0, n: null}, {v: 0, n: null}]
        this.value = null
        this.selected = 0
      }
    }
  }
</script>

<style>
  .input-time {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 4.2rem;
    transition: all 0.5s;
  }

  .switch div {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    font-size: 4rem;
    overflow: hidden;
    vertical-align: middle;
    transition: flex 0.5s, opacity 0.3s;
    text-align: center;
  }

  .switch div:first-child {
    flex:1 1 100%;
    opacity: 1;
  }

  .switch div:last-child {
    flex:1 1 0%;
    opacity: 0;
  }

  .switch.set div:first-child {
    flex:1 1 0%;
    opacity: 0;
  }

  .switch.set div:last-child {
    flex:1 1 100%;
    opacity: 1;
  }

  /*.switch:hover div:first-child {
    flex:1 1 0%;
    opacity: 0;
  }

  .switch:hover div:last-child {
    flex:1 1 100%;
    opacity: 1;
  }*/

  div.selected {
    background: rgba(140,140,140,0.5);
  }

</style>
