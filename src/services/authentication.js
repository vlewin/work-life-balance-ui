import auth0 from "auth0-js"
import router from "../router"

export default class AuthService {
  constructor() {
    // FIXME: Move to config
    this.auth0 = auth0
    this.auth = new auth0.WebAuth({
      domain: "mrstealth.eu.auth0.com",
      clientID: "fC4Z1HSO4PHNJTWu9K4Emn90bo6CCgCM",
      redirectUri: new URL("/callback", window.location.href).href,
      audience: "https://mrstealth.eu.auth0.com/userinfo",
      responseType: "token id_token",
      scope: "openid"
    })
  }

  login() {
    this.auth.authorize()
  }

  handleAuthentication(redirectUrl = "/") {
    this.auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        console.log("Redirect to", redirectUrl)
        // FIXME: navigate to the home route
        setTimeout(() => {
          router.replace(redirectUrl)
        }, 1000)
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
  }

  isAuthenticated() {
    // NOTE: Check whether the current time is past the Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"))
    return new Date().getTime() < expiresAt
  }

  logout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("id_token")
    localStorage.removeItem("expires_at")
    this.userProfile = null

    // FIXME: navigate to the home route
    router.push("/login")
  }
}
