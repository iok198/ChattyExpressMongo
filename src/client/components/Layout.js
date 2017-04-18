import React from "react"

class LayoutPage extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}