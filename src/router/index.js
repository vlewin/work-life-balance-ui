import Vue from "vue"
import Router from "vue-router"

import Index from "@/components/Index"
import Authentication from "@/components/Authentication"
import Flex from "@/components/Flex"
import auth from "../main"

Vue.use(Router)

function isAuthenticated() {
  // Check whether the current time is past the
  // Access Token's expiry time
  let expiresAt = JSON.parse(localStorage.getItem("expires_at"))
  return new Date().getTime() < expiresAt
}

const router = new Router({
  routes: [
    { path: "/", name: "Index", component: Index, meta: { requiresAuth: true } },
    { path: "/login", name: "Authentication", component: Authentication },
    { path: "/playground", name: "Flex", component: Flex }
  ]
})

router.beforeEach((to, from, next) => {
  console.log("beforeEach", to, from)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isAuthenticated()) {
      console.log("Not authenticated")
      next({ path: "/login" })
    } else {
      console.log("Authenticated")
      next()
    }
  } else {
    console.log("?????")
    auth.parseHash((err, authResult) => {
      console.log("parseHash")
      if (authResult && authResult.accessToken && authResult.idToken) {
        // this.setSession(authResult)
        // router.replace("home")
        console.log(authResult)
        let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
        localStorage.setItem("access_token", authResult.accessToken)
        localStorage.setItem("id_token", authResult.idToken)
        localStorage.setItem("expires_at", expiresAt)

        next({ path: "/" })
      } else if (err) {
        next({ path: "/login" })
        console.log(err)
      }
    })
    next()

    // next() // make sure to always call next()!
  }
})

export default router
