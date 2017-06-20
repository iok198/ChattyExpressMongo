import { observable, action, computed, reaction, extendObservable } from "mobx"
import jwtDecode from "jwt-decode"

class UserStore {

    constructor() {
        extendObservable(this, {
            loggedIn: false,
            token: ""
        })
    }
    
    @action 
    login(userCredentials) {
        var _this = this
        console.log("thing one: " + this)
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
                if(result.success) {
                    _this.token = result.token
                    // localStorage.setItem("token", result.token)
                    return result
                } else {
                    _this.loggedIn = false
                    return result.error
                }
            })
    }

    @action 
    signup(userCredentials) {
        return new Promise((resolve, reject) => {
            fetch("/user/signup", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userCredentials)
            })
            .then(r => r.json())
            .then(result => {
                if(result.success) {
                    this.loggedIn = true
                    this.token = result.token
                    resolve(result)
                } else {
                    this.loggedIn = false
                    reject(result.error)
                }
            })
        })
    }

    @computed get user() {
        try {
            return jwtDecode(this.token)

        } catch(e) {
            this.loggedIn = false
        }
    }
}

var userStore = new UserStore()

export default userStore