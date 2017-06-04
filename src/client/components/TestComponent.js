import React from "react"

class TestComponent extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      username: "",
      password: ""
    }

    this.changeValue = this.changeValue.bind(this)
    this.handleSumbit = this.handleSumbit.bind(this)
  }

  changeRoute () {
    this.props.router.replace("/")
  }

  handleSumbit (e) {
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

  changeValue (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
        <div>
            <button onClick={this.changeRoute.bind(this)}>Go home!</button>
            <div>
                <input type="text" name="username" onChange={this.changeValue}/> <br />
                <input type="password" name="password" onChange={this.changeValue}/> <br />
                <input type="button" value="Submit" onClick={this.handleSumbit}/> <br />
            </div>
        </div>
    )
  }
}

export default TestComponent
