import Vue from "vue"
import Router from "vue-router"
import AuthService from "../main"

Vue.use(Router)

const lazyLoad = (component) => {
  return r => require.ensure([], () => r(require(`@/components/${component}`)), 'group-routes')
}

const router = new Router({
  mode: "history",
  routes: [
    { path: "/", name: "Index", component: lazyLoad('Index'), meta: { requiresAuth: true } },
    { path: "/login", name: "Login", component: lazyLoad('Auth'), props: (route) => ({ message: route.query.message, action: "login" }) },
    { path: "/logout", name: "Logout", component: lazyLoad('Auth'), props: { action: "logout" } },
    { path: "/callback", name: "Callback", component: lazyLoad('Callback') },
    { path: "/settings", name: "Settings", component: lazyLoad('Settings') },
    { path: "/playground", name: "Playground", component: lazyLoad('Playground') }
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
      next({ path: "/login" })

      // FIXME:  Workaround for vue-router hash mode
      // if (window.location.hash.includes("access_token")) {
      //   AuthService.handleCallback({ hash: window.location.hash })
      // } else {
      //   next({ path: "/login" })
      // }
    }
  }

  if (to.matched.length) {
    next()
  } else {
    next({ path: "/" })
  }
})

export default router
