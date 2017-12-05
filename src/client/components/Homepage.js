import React from "react"
import {observer, inject} from "mobx-react"

@inject("userStore")
@observer
class HomePage extends React.Component {
  render () {
    if (!this.props.userStore.loggedIn) {
      return (
        <div>
            <h1>Chat</h1>
            <p>Hello, this is a chat app, go to login or signup to get started</p>
        </div>
      ) 
    } 
    else {
        return (
          <div>
            <h1>Chat</h1>
            <p>Hello, to start chatting, go to the chat, or go to dashboard</p>
          </div>
        )
    }
  }
}

export default HomePage
