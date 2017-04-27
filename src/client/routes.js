// import { BrowserRouter as Router, Route, IndexRoute } from "react-router-dom"
import { Router, Route, Switch, Redirect, browserHistory } from "react-router"
import { createBrowserHistory } from "history"

import HomePage from "./components/Homepage"
import LayoutPage from "./components/Layout"

import SigninPage from "./components/user/Signin"
import SignupPage from "./components/user/Signup"
import ProfilePage from "./components/user/Profile"

import TestComponent from "./components/TestComponent"

import React from "react"

class TheRouter extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <div>
                    <Route path="/" component={HomePage} exact={true}/>
                    <Route path="/signin" component={SigninPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/tester" component={TestComponent}/>
                </div>
            </Router>
        )

    }
}

export default TheRouter