import React from "react"
import { Link } from "react-router"

class SignupPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Sign up</h1>
                <form action="/user/signup" method="post">
                    <input type="text" name="username" />
                    <input type="password" name="password" />
                    <input type="submit" />
                </form>
                <p>Already have an account? <Link to="/user/signin">Sign in</Link></p>
            </div>
        )
    }
}

export default SignupPage