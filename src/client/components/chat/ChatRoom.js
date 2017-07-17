import React from "react"
import {observer, inject} from "mobx-react"

@inject("chatStore")
@inject("userStore")
@observer
class ChatRoom extends React.Component {
    constructor(props) {
        super(props)

        this.sendMessage = this.sendMessage.bind(this)
    }

    sendMessage() {
        let {username} = this.props.userStore.user

        this.props.chatStore.sendMessage(username, "hey")
    }

    render() {
        let { messages } = this.props.chatStore

        return (
            <div>
                <h1>Chat Thing</h1>
                <button onClick={this.sendMessage}>Send Message</button>
                <ul>
                    {messages.map((msg, i) => (<li key={i}>{msg.username}: {msg.message}</li>))}
                </ul>
            </div>
        )
    }
}

export default ChatRoom
