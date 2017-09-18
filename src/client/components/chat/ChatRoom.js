import React from "react"
import { observer, inject } from "mobx-react"

import { List, ListItem } from "material-ui/List"
import TextField from "material-ui/TextField"

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

    changeMessage(e, newValue) {
        this.setState({
            message: newValue
        })
    }

    render() {
        let { messages } = this.props.chatStore

        return (
            <div>
                <h1>Chat Thing</h1>
                <form onSubmit={this.sendMessage}>
                    <TextField value={this.state.message} onChange={this.changeMessage}/>
                </form>
                <List>
                    {messages.map((msg, i) => (
                        <ListItem
                            primaryText={msg.message}
                            secondaryText={msg.username} 
                        />
                    ))}
                </List>
            </div>
        )
    }
}

export default ChatRoom
