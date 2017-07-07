import React from "react"
import { observer, inject } from "mobx-react"

@inject("userStore")
@observer
class ProfilePage extends React.Component {
  render () {
    let username = this.props.userStore.user.username || "Unknown"
    console.log(this.props.userStore)
    return (
        <div>
            <h1>Your Profile</h1>
            <p>Hello {username}</p>
        </div>
    )
  }
}

export default ProfilePage
