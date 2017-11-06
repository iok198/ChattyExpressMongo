import React from "react"
import { observer, inject } from "mobx-react"
import RaisedButton from "material-ui/RaisedButton"

@inject("userStore")
@observer
class ProfilePage extends React.Component {
  constructor (props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

  logout () {
    const {logout} = this.props.userStore

    logout()
    this.props.history.push("/signin")
  }

  render () {
    let username = this.props.userStore.user.username || "Unknown"
    console.log(this.props.userStore)
    return (
        <div>
            <h1>Your Profile</h1>
            <p>Hello {username}</p>
            <RaisedButton onClick={this.logout}>Logout</RaisedButton>
        </div>
    )
  }
}

export default ProfilePage
