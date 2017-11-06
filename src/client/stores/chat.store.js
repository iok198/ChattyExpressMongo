import {observable, action} from "mobx"
import io from "socket.io-client"

class ChatStore {
    @observable username = ""
    @observable messages = []
    @observable unseenMessages = 0

    constructor() {
      this.handleMessage = this.handleMessage.bind(this)

      this.socket = io()
      this.socket.on("msg", this.handleMessage)
    }

    sendMessage(username, message) {
        this.socket.emit("msg", {
            username,
            message
        })
    }

    @action
    handleMessage(data) {
        console.log(data)
        this.messages.unshift(data)
        this.unseenMessages++
    }
}

var chatStore = new ChatStore()

export default chatStore
