import React from "react"

class TestComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    handleClick() {
        this.props.history.replace("/")
    }

    render() {
        return (
            <button onClick={this.handleClick.bind(this)}>Click Me!</button>
        )
    }
}

export default TestComponent