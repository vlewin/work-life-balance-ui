import Vue from "vue"
import Router from "vue-router"
import AuthService from "../main"

import Authentication from "@/components/Authentication"
import Index from "@/components/Index"
import Callback from "@/components/Callback"

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    { path: "/", name: "Index", component: Index, meta: { requiresAuth: true } },
    { path: "/login", name: "Authentication", component: Authentication, props: { initSection: "top" } },
    { path: "/logout", name: "Authentication", component: Authentication, props: { initSection: "bottom" } },
    { path: "/callback", name: "Callback", component: Callback },
  ]
})

router.beforeEach((to, from, next) => {
  console.log("beforeEach", to, from)
  if (to.meta.requiresAuth) {
    if (AuthService.isAuthenticated()) {
      console.log("Authenticated")
      next()
    } else {
      console.log("Not authenticated")
      next({ path: "/login" })
    }
  }

  if (to.matched.length) {
    next()
  } else {
    next({ path: "/login" })
  }
})

export default router
