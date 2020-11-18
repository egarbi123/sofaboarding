import React from 'react';
import { Redirect, Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    redirectToSignup() {  
        return <Link to="/signup"></Link>
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    welcome() {
        if (this.props.state.session.id) {
            let name = this.props.state.users[this.props.state.session.id].name
            if (name) {
                return (<p>Welcome {name}</p>)
            }
        }
    }

    display() {
        if (this.props.state.session.id) {
            return (
                <ul className="nav-link-list">
                    <li>
                        <button className="button" onClick={this.props.logout}>Log Out</button>
                    </li>
                    <li>
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="nav-link-list">
                    <li>
                        <Link className="nav-link" to="signup">Sign Up</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="login">Sign In</Link>
                    </li>
                </ul>
            )
        }
    }

    render() {
        console.log('navbar', this.props);
        return (
            <div className="nav">
                {this.welcome()}
                {this.display()}
            </div>
        )
    }
}

export default NavBar;