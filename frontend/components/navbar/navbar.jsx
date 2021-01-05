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
        let name = '"NAME"';
        if (this.props.state.users[this.props.state.session.id] && this.props.state.users[this.props.state.session.id].name) {
            name = this.props.state.users[this.props.state.session.id].name
            return (
                <div className="nav-logo">
                    <p>Welcome, {name}!</p>
                </div>
            )
        } else {
            return (
                <div className="nav-logo">
                    <p>SOFABOARDING</p>
                </div>
            )
        }
    }

    display() {
        if (this.props.state.session.id) {
            return (
                <div className="nav-session">
                    <ul className="nav-link-list">
                        <li>
                            {/* <button className="button" onClick={this.props.logout}>Log Out</button> */}
                            <Link className="nav-link" to="/" onClick={this.props.logout}>LOG OUT</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/">HOME</Link>
                        </li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="nav-session">
                    <ul className="nav-link-list">
                        <li>
                            <Link className="nav-link" to="/signup">SIGN UP</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/login">LOG IN</Link>
                        </li>
                    </ul>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="nav">
                {this.welcome()}
                <div className="nav-search"></div>
                {this.display()}
            </div>
        )
    }
}

export default NavBar;