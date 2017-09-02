import { observable, action, computed, reaction } from "mobx"
import jwtDecode from "jwt-decode"

import verifyToken from "../utils/verifyToken"

class UserStore {
  @observable token = localStorage.getItem("token") || ""

  constructor() {
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
    this.logout = this.logout.bind(this)
  }

  @action
  login(userCredentials) {
    console.log("thing one: " + JSON.stringify(this))
    return fetch("/user/signin", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCredentials)
    })
      .then(r => r.json())
      .then(result => {
        if (result.success) {
          this.token = result.token
          return Promise.resolve(result)
        } else {
          return Promise.reject(result.message)
        }
      })
  }

  @action
  signup(userCredentials) {
    return fetch("/user/signup", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCredentials)
    })
      .then(r => r.json())
      .then(result => {
        if (result.success) {
          this.token = result.token
          return Promise.resolve(result)
        } else {
          return Promise.reject(result.message)
        }
      })
  }

  @action
  logout() {
    this.token = ""
  }

  @computed get loggedIn() {
    let { token } = this
    if (!token) return false

    let res = (async function() {
      let isAuth = await verifyToken(token)
      return isAuth
    })()

    console.log("Result: " + res)
    return res
  }

  @computed get user() {
    try {
      return jwtDecode(this.token)
    } catch (e) {
      console.error(e)
    }
  }
}

var userStore = new UserStore()

reaction(
  () => userStore.token,
  token => {
    if (token !== "") {
      console.log("success with token: " + token)
      localStorage.setItem("token", token)
    } else {
      localStorage.removeItem("token")
    }
  }
)

export default userStore
