import { Router, Route, browserHistory, IndexRoute } from "react-router"

import HomePage from "./components/Homepage"
import LayoutPage from "./components/Layout"

import SigninPage from "./components/user/Signin"
import SignupPage from "./components/user/Signup"
import ProfilePage from "./components/user/Profile"

import ChatRoom from "./components/chat/ChatRoom"

import TestComponent from "./components/TestComponent"
import requireAuth from "./utils/requireAuth"

import React from "react"

class TheRouter extends React.Component {
  render () {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={LayoutPage}>
                <IndexRoute component={HomePage} />
                <Route path="tester" component={TestComponent} />
                <Route path="signin" component={SigninPage} />
                <Route path="signup" component={SignupPage} />
                <Route path="user" onEnter={requireAuth}>
                    <Route path="profile" component={ProfilePage}/>
                    <Route path="chat" component={ChatRoom}/>
                    <IndexRoute component={ProfilePage}/>
                </Route>
            </Route>
        </Router>
    )
  }
}

export default TheRouter
