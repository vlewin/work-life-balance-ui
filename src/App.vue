<template>
  <div id="app" :class="{ standalone: standalone }">
    <router-view class="content"></router-view>
  </div>
</template>

<script>
  // import gql from 'graphql-tag'
  import { mapState } from "vuex"
  import getBalanceQuery from './graphql/queries/getBalance.gql'
  import onUpdateBalanceSubscription from './graphql/subscriptions/onUpdateBalance.gql'

  export default {
    name: "App",

    data() {
      return {
        hydrated: false,
        event: {}
      }
    },

    apollo: {
      getBalance: {
        query: () => getBalanceQuery,
      },
    },

    computed: {
      ...mapState(["standalone"])
    },

    async mounted() {
      await this.$apollo.provider.defaultClient.hydrated()
      this.hydrated = true

      this.$apollo.queries.getBalance.subscribeToMore({
        document: onUpdateBalanceSubscription,

        // Variables passed to the subscription
        variables: {
          param: '42',
        },

        // Mutate the previous result
        updateQuery: (previousResult, { subscriptionData }) => {
          console.error(previousResult)
          console.log(subscriptionData)
          this.$store.dispatch('setBalance', subscriptionData.data.onUpdateBalance)
        },
      })

      if (this.standalone) {
        document.body.classList.add('standalone')
      } else {
        document.body.classList.add('default')
      }

      window.addEventListener("online", () => {
        this.$store.dispatch("online", navigator.onLine)
      })

      window.addEventListener("offline", () => {
        this.$store.dispatch("online", navigator.onLine)
      })

      window.addEventListener("orientationchange", () => {
        // window.screen.width > window.screen.height
        if (window.orientation == 90 || window.orientation == -90) {
          this.$store.dispatch("setOrientation", 'landscape')
        } else {
          this.$store.dispatch("setOrientation", 'portrait')
        }
      })
    },

    beforeDestroy() {
      window.removeEventListener('online', () => {
        console.log('removeEventListener', 'online')
      })

      window.removeEventListener('offline', () => {
        console.log('removeEventListener', 'online')
      })

      window.removeEventListener('orientationchange', () => {
        console.log('removeEventListener', 'orientationchange')
      })
    },
  }
</script>

<style lang="sass" scoped>
  #app
    height: 100%
    width: 100%
    overflow: hidden

  //
  // #app.standalone
  //   height: 100%
  //   height: 100%
  //   background: red



  @media (min-width: 50em)
    /* tablet, landscape iPad, lo-res laptops ands desktops
    #app
      height: 70%
      width: 90%
      border-radius: 5px
      box-shadow: 0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22)

  @media (min-width: 60em)
    /* big landscape tablets, laptops, and desktops
    #app
      height: 80%
      width: 80%

  @media (min-width: 80em)
    /* hi-res laptops and desktops
    #app
      height: 80%
      width: 60%

</style>
