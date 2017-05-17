// import { BrowserRouter as Router, Route, IndexRoute } from "react-router-dom"
import { Router, Route, Switch, Redirect, browserHistory, IndexRoute } from "react-router"
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
                <Route path="/">
                    <IndexRoute component={HomePage} />
                    <Route path="tester" component={TestComponent} />
                    <Route path="signin" component={SigninPage} />
                    <Route path="signup" component={SignupPage} />
                    <Route path="user">
                        <Route path="profile" component={ProfilePage}/>
                        <IndexRoute component={ProfilePage}/>
                    </Route>
                </Route>
            </Router>
        )

    }
}

export default TheRouter