import React from "react"

class TestComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    handleClick() {
        this.props.history.replace("/")
    }

    handleSumbit(e) {
        e.preventDefault()
        var formData = new FormData(this.form)

        fetch("/user/signin", {
            method: "POST",
            body: formData
        })
        .then(r => r.json())
        .then(result => {
            console.log(result)
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick.bind(this)}>Go home!</button>
                <form onSubmit={this.handleSumbit.bind(this)} ref={(form) => this.form = form}>
                    <input type="text" name="username" /> <br />
                    <input type="password" name="password"/> <br />
                    <input type="submit"/> <br />
                </form>
            </div>
        )
    }
}

export default TestComponent