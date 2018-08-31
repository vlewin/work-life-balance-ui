import auth0 from "auth0-js"
import router from "../router"
import defaultConfig from '../config'

export default class AuthenticationService {
  constructor (options = {}) {
    this.config = Object.assign(defaultConfig, options.config || {})
    this.router = router
    this.store = options.store || window.localStorage
    this.auth = new auth0.WebAuth(this.config)
  }

  // login() {
  //   console.log('--- login - checkSession')
  //   this.auth.checkSession({ nonce: 'very-long-and-secure-nonce' }, (err, authResult) => {
  //     debugger
  //     if (err) {
  //       console.log('--- login - checkSession - error')
  //       console.log(err)
  //       const url = AuthService.auth.client.buildAuthorizeUrl({
  //         clientID: 'Uwn1T7EyBw83RQ5FEVRzHoc0E6MB1UaT', // string
  //         responseType: 'token id_token', // code
  //         redirectUri: `${window.location.origin}/callback`,
  //         state: 'very-long-and-secure-state',
  //         nonce: 'very-long-and-secure-nonce'
  //       })
  //
  //       window.location.replace(url)
  //     } else {
  //       console.log('--- login - checkSession - success')
  //
  //       this._setSession(authResult)
  //       this.router.push('/')
  //     }
  //   })
  // }

  login(email, password) {
    this.auth.client.login({
      realm: 'Username-Password-Authentication',
      username: email,
      password: password
    }, (error, authResult) => {
      if (error) {
        this.router.push({ path: 'login', query: { message: JSON.stringify(error) }})
      } else {
        this._setSession(authResult)
        this.router.push('/')
      }
    })
  }

  signup () {
    this.auth.authorize({})
  }

  handleCallback (hash, redirectUri = window.location.href) {
    console.log('*** handleCallback')
    this.auth.parseHash(hash, (error, authResult) => {
      console.log('Hash', hash)
      console.log('Hash', error)
      console.log('Hash', authResult)
      if (error) {
        this.router.push({ path: 'login', query: { message: JSON.stringify(error) }})
      } else {
        this._setSession(authResult)
        this.router.push('/')
      }
    })
  }

  renewToken () {
    return this._checkSession()
  }

  isAuthenticated () {
    const expiresAt = this.store.getItem('expires_at')
    return !!(new Date().getTime() < parseInt(expiresAt))
  }

  getProfile () {
    if (this.isAuthenticated()) {
      return this.store.getItem('profile')
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

    this.auth.logout({ returnTo: options.returnTo || window.location.href })
  }

  _checkSession () {
    this.auth.checkSession({}, (err, authResult) => {
      if (err) {
        alert('Error', err)
      } else {
        this._setSession(authResult)
      }
    })
  }

  _setSession (authResult) {
    // Set the time that the Access Token will expire at
    this.store.setItem('access_token', authResult.accessToken)
    this.store.setItem('id_token', authResult.idToken)
    this.store.setItem('expires_at', authResult.expiresIn * 1000 + Date.now())

    this.auth.client.userInfo(authResult.accessToken, (err, user) => {
      this.store.setItem('profile', JSON.stringify(user))
    })
  }
}
