import React from "react"
import { Link } from "react-router"
import { observer, inject } from "mobx-react"

@inject("userStore")
@observer
class SigninPage extends React.Component {
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
    const { login } = this.props.userStore

    login({
      username: this.state.username,
      password: this.state.password
    })
    .then(user => {
      console.log(user)
      this.props.history.push("/user")
    })
    .catch(error => {
      console.log(error)
      this.setState({error})
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
            <h1>Sign in</h1>
            <div style={{ color: "red" }}>
                {this.state.error}
            </div>
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" onChange={this.handleChange} />
                <input type="password" name="password" onChange={this.handleChange} />
                <input type="submit" name="submit" />
            </form>
            <p>{"Don't"} have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    )
  }
}

export default SigninPage
