import React from "react"
import { Link } from "react-router"

class SigninPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        fetch("/user/signin", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(r => r.json())
        .then(result => {
            console.log(result)
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>Sign in</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" onChange={this.handleChange}/>
                    <input type="password" name="password" onChange={this.handleChange}/>
                    <input type="submit" />
                </form>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        )
    }
}

export default SigninPage