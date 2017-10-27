import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Main from '@/components/Main'
import SimpleSlider from '@/components/SimpleSlider'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/old',
      name: 'Main',
      component: Main
    },
    {
      path: '/wip',
      name: 'SimpleSlider',
      component: SimpleSlider
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
