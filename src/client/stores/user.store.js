import { observable, action, computed, reaction, extendObservable } from "mobx"
import jwtDecode from "jwt-decode"

class UserStore {

    @observable loggedIn = false
    @observable token = ""

    constructor() {
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
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
                    this.loggedIn = true
                    this.token = result.token
                    return result
                } else {
                    this.loggedIn = false
                    return result.error
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
                    this.loggedIn = true
                    this.token = result.token
                    return result
                } else {
                    this.loggedIn = false
                    return result.error
                }
            })
    }

    @computed get user() {
        try {
            return jwtDecode(this.token)
        } catch(e) {
            console.log(e)
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