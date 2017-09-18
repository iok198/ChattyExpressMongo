import React from "react"
import NavBar from "./NavBar"

class LayoutPage extends React.Component {
  render () {
    return (
        <div>
            <NavBar />
            <div className="content">{this.props.children}</div>
        </div>
    )
  }
}

export default LayoutPage
