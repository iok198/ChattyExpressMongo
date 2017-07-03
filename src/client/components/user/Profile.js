import React from "react"
import { observer, inject } from "mobx-react"

@inject("userStore")
@observer
class ProfilePage extends React.Component {
  render () {
    return (
        <div>
            <h1>Your Profile</h1>
            <p>Hello {this.props.userStore.user.username}</p>
        </div>
    )
  }
}

export default ProfilePage
