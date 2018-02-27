import auth0 from "auth0-js"
import router from "../router"

export default class AuthService {
  constructor() {
    // FIXME: Move to config
    this.auth0 = auth0
    this.auth = new auth0.WebAuth({
      domain: "mrstealth.eu.auth0.com",
      clientID: "fC4Z1HSO4PHNJTWu9K4Emn90bo6CCgCM",
      redirectUri: "http://192.168.178.20:8080/callback",
      audience: "https://mrstealth.eu.auth0.com/userinfo",
      responseType: "token id_token",
      scope: "openid"
    })
  }

  login() {
    this.auth.authorize()
  }

  handleAuthentication() {
    this.auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        console.log("Redirect to /")
        // FIXME: navigate to the home route
        setTimeout(() => {
          router.replace("/")
        }, 2000)
      } else if (err) {
        // FIXME: navigate to the home route
        router.replace("/login")
        console.log(err)
      }
    })
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
    localStorage.setItem("access_token", authResult.accessToken)
    localStorage.setItem("id_token", authResult.idToken)
    localStorage.setItem("expires_at", expiresAt)

    // FIXME: How to notify consumer?
    // this.authNotifier.emit("authChange", { authenticated: true })
  }

  isAuthenticated() {
    // NOTE: Check whether the current time is past the Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"))
    return new Date().getTime() < expiresAt
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem("access_token")
    localStorage.removeItem("id_token")
    localStorage.removeItem("expires_at")
    this.userProfile = null

    // FIXME: How to notify consumer?
    // this.authNotifier.emit("authChange", false)

    // FIXME: navigate to the home route
    router.push("/login")
  }
}
// src/Auth/AuthService.js

// import auth0 from "auth0-js"
// import EventEmitter from "EventEmitter"
// import router from "../router"

// export default class AuthService {
//   authenticated = this.isAuthenticated()
//   authNotifier = new EventEmitter()
//
//   constructor() {
//     this.login = this.login.bind(this)
//     this.setSession = this.setSession.bind(this)
//     this.logout = this.logout.bind(this)
//     this.isAuthenticated = this.isAuthenticated.bind(this)
//   }
//
//   // ...
//   handleAuthentication() {
//     this.auth0.parseHash((err, authResult) => {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         this.setSession(authResult)
//         router.replace("home")
//       } else if (err) {
//         router.replace("home")
//         console.log(err)
//       }
//     })
//   }
//
//   setSession(authResult) {
//     // Set the time that the Access Token will expire at
//     let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
//     localStorage.setItem("access_token", authResult.accessToken)
//     localStorage.setItem("id_token", authResult.idToken)
//     localStorage.setItem("expires_at", expiresAt)
//     this.authNotifier.emit("authChange", { authenticated: true })
//   }
//
//   logout() {
//     // Clear Access Token and ID Token from local storage
//     localStorage.removeItem("access_token")
//     localStorage.removeItem("id_token")
//     localStorage.removeItem("expires_at")
//     this.userProfile = null
//     this.authNotifier.emit("authChange", false)
//     // navigate to the home route
//     router.replace("home")
//   }
//
//   isAuthenticated() {
//     // Check whether the current time is past the
//     // Access Token's expiry time
//     let expiresAt = JSON.parse(localStorage.getItem("expires_at"))
//     return new Date().getTime() < expiresAt
//   }
// }
