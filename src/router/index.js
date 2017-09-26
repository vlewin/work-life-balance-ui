import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Wip from '@/components/Wip'
import Flex from '@/components/Flex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },

    {
      path: '/wip',
      name: 'Wip',
      component: Wip
    },
    {
      path: '/flex',
      name: 'Flex',
      component: Flex
    }
  ]
})
