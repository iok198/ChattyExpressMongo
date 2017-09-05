import React from "react"
import {observer, inject} from "mobx-react"

@inject("chatStore")
@inject("userStore")
@observer
class ChatRoom extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            message: ""
        }

        this.sendMessage = this.sendMessage.bind(this)
        this.changeMessage = this.changeMessage.bind(this)
    }

    sendMessage(e) {
        e.preventDefault()
        let { username } = this.props.userStore.user

        this.props.chatStore.sendMessage(username, this.state.message)
        this.setState({ message: "" })
    }

    changeMessage(e) {
        this.setState({
            message: e.target.value
        })
    }

    render() {
        let { messages } = this.props.chatStore

        return (
            <div>
                <h1>Chat Thing</h1>
                <form onSubmit={this.sendMessage}>
                    <input type="text" onChange={this.changeMessage} value={this.state.message} />
                    <button onClick={this.sendMessage}>Send Message</button>
                </form>
                <ul>
                    {messages.map((msg, i) => (<li key={i}>{msg.username}: {msg.message}</li>))}
                </ul>
            </div>
        )
    }
}

export default ChatRoom
