import {observable, action} from "mobx"
import io from "socket.io-client"

class ChatStore {
    @observable username = ""
    @observable messages = []

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
        this.messages.push(data)
    }
}

var chatStore = new ChatStore()

export default chatStore
