import auth0 from "auth0-js"
import router from "../router"
import defaultConfig from '../config'

export default class AuthenticationService {
  constructor (options = {}) {
    this.config = Object.assign(defaultConfig, options.config || {})
    this.router = options.router || Router
    this.store = options.store || window.sessionStorage
    this.auth = new auth0.WebAuth(this.config)
    this.profile = this.store.getItem('profile')
  }

  login (options = {}) {
    console.log(this.config)
    this.auth.authorize(options)
  }

  signup () {
    this.auth.authorize({})
  }

  handleCallback (redirectUri = window.location.href) {
    this.auth.parseHash((error, authResult) => {
      if (error) {
        // NOTE: Redirect back to hosted login page and provide the error description
        this.login({ redirectUri: redirectUri, errorDescription: error.errorDescription })
      } else if (authResult && authResult.accessToken && authResult.idToken) {
        this._setSession(authResult)
        setTimeout(() => {
          this.router.replace('/')
        }, 500)
      } else {
        // TODO: Redirect to generic error page?
        this.login({ redirectUri: redirectUri, errorDescription: 'Missing required parameter in response' })
      }
    })
  }

  renewToken () {
    return this._checkSession()
  }

  isAuthenticated () {
    // NOTE: Check whether expires_at exists in storage and the current time is past the Access Token's expiry time
    const expiresAt = this.store.getItem('expires_at')
    return !!(new Date().getTime() < parseInt(expiresAt))
  }

  getProfile () {
    if (this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        resolve(JSON.parse(this.profile))
      })
    } else {
      return this._checkSession()
    }
  }

  logout (options = {}) {
    // NOTE: Clear Access Token and ID Token from local storage
    this.store.removeItem('access_token')
    this.store.removeItem('id_token')
    this.store.removeItem('expires_at')
    this.store.removeItem('profile')

    this.profile = null
    const defaultOptions = { returnTo: options.returnTo || window.location.href }

    console.log('logout: Redirect to', defaultOptions.returnTo)
    this.auth.logout(Object.assign(defaultOptions, options))

    // FIXME: How to notify consumer?
    // this.authNotifier.emit("authChange", false)

    // FIXME: navigate to the home route
  }

  _checkSession () {
    console.log('_checkSession')

    return new Promise((resolve, reject) => {
      this.auth.checkSession({}, (err, authResult) => {
        if (err) {
          reject(err)
        } else {
          console.log(authResult)
          this._setSession(authResult)
          resolve(authResult.idTokenPayload)
        }
      })
    })
  }

  _setSession (authResult) {
    // Set the time that the Access Token will expire at
    this.store.setItem('access_token', authResult.accessToken)
    this.store.setItem('id_token', authResult.idToken)
    this.store.setItem('expires_at', authResult.expiresIn * 1000 + Date.now())
    this.store.setItem('profile', JSON.stringify(authResult.idTokenPayload))
  }
}
