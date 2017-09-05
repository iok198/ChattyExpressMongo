import React from "react"
import { observer, inject } from "mobx-react"
import { Link } from "react-router"

import AppBar from "material-ui/AppBar"
import FlatButton from "material-ui/FlatButton"

const buttonStyle = {
    color: "white"
}

class NavLinks extends React.Component {
    render() {
        let loggedIn = this.props.loggedIn
        console.log(`NavLinks.Logged: ${loggedIn}`)
        if (loggedIn) {
            return (
                <div>
                    <FlatButton 
                        label="Dashboard"
                        containerElement={<Link to="/user"/>}
                        style={buttonStyle}
                    />
                    <FlatButton 
                        label="Chat"
                        containerElement={<Link to="/user/chat"/>}
                        style={buttonStyle}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <FlatButton
                        label="Signin"
                        containerElement={<Link to="/signin"/>} 
                        style={buttonStyle}
                    />
                    <FlatButton 
                        label="Signup"
                        containerElement={<Link to="/signup"/>}
                        style={buttonStyle}
                    />
                </div>
            )
        }
    }
}

@inject("userStore")
@observer
class NavBar extends React.Component {
    render() {
        return (
            <AppBar 
                title={<Link to="/"><FlatButton label="Chat" style={buttonStyle} /></Link>}
                iconElementRight={<NavLinks loggedIn={this.props.userStore.loggedIn}/>}
            />
        )
    }
}

export default NavBar
