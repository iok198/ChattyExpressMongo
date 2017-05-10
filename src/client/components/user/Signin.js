import React from "react"
import { Link } from "react-router"

class SigninPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Sign in</h1>
                <form action="/user/signin" method="post">
                    <input type="text" name="username" />
                    <input type="password" name="password" />
                    <input type="submit" />
                </form>
                <p>Don't have an account? <Link to="/user/signup">Sign up</Link></p>
            </div>
        )
    }
}

export default SigninPage