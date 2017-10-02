import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import InputTime from '@/components/InputTime'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },

    {
      path: '/wip',
      name: 'InputTime',
      component: InputTime
    }
    // {
    //   path: '/flex',
    //   name: 'Flex',
    //   component: Flex
    // },
    // {
    //   path: '/card',
    //   name: 'Card',
    //   component: Card
    // }
  ]
})
