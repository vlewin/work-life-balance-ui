import Vue from "vue"
import Router from "vue-router"
import AuthService from "../main"

import Authentication from "@/components/Authentication"
import Index from "@/components/Index"
import Callback from "@/components/Callback"
import Playground from "@/components/playground/Playground"

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    { path: "/", name: "Index", component: Index, meta: { requiresAuth: true } },
    {
      path: "/login",
      name: "Authentication",
      component: Authentication,
      props: (route) => ({ message: route.query.message, initSection: "top" })
    },
    // { path: "/logout", name: "Authentication", component: Authentication, props: { initSection: "bottom" } },
    { path: "/callback", name: "Callback", component: Callback },
    { path: "/playground", name: "Playground", component: Playground },

  ]
})

router.beforeEach((to, from, next) => {
  console.log("beforeEach - navigate from", from.name, from.fullPath, 'to', to.name, to.fullPath)

  if (to.meta.requiresAuth) {
    if (AuthService.isAuthenticated()) {
      console.log("Authenticated")
      next()
    } else {
      console.log("Not authenticated")

      // FIXME:  Workaround for vue-router hash mode
      if (window.location.href.includes("access_token")) {
        AuthService.handleCallback().then(() => {
          next({ path: "/" })
        })
      } else {
        next({ path: "/login" })
      }
    }
  }

  if (to.matched.length) {
    next()
  } else {
    next({ path: "/" })
  }
})

export default router
