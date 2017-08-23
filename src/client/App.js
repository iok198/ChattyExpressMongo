import React from "react"
import { Provider } from "mobx-react"

import TheRouter from "./routes"
import UserStore from "./stores/user.store"
import ChatStore from "./stores/chat.store"

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

const stores = {
  userStore: UserStore,
  chatStore: ChatStore
}

let App = props => (
    <MuiThemeProvider>
        <Provider {...stores}>
            <TheRouter />
        </Provider>
    </MuiThemeProvider >
)

export default App
