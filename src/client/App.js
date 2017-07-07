import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "mobx-react"

import TheRouter from "./routes"
import UserStore from "./stores/user.store"
import ChatStore from "./stores/chat.store"

const stores = {
  userStore: UserStore,
  chatStore: ChatStore
}

ReactDOM.render(
    (
        <Provider {...stores}>
            <TheRouter />
        </Provider>
    ), document.getElementById("demo")
)
