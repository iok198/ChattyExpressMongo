import React from "react"
import ReactDOM from "react-dom"
import { Router, browserHistory } from "react-router"

import TheRouter from "./routes"

class Component extends React.Component {
    render() {
        return <h1>React Works!</h1>
    }
}

ReactDOM.render(<TheRouter />, document.getElementById("demo"))