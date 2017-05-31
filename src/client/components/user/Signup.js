import React from "react"
import { Link } from "react-router"

class SignupPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      error: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()

    fetch("/user/signup", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then(result => {
      if (result.success) {
        this.props.history.push("/user")
      } else {
        this.setState({
          error: result.error
        })
      }
    })
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
            <div>
                <h1>Sign up</h1>
                <div style={{color: "red"}}>
                    {this.state.error}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" onChange={this.handleChange}/>
                    <input type="password" name="password" onChange={this.handleChange}/>
                    <input type="submit" />
                </form>
                <p>Already have an account? <Link to="/signin">Sign in</Link></p>
            </div>
    )
  }
}

export default SignupPage
