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

    display() {
        if (this.props.state.session.id) {
            return (
                <div className="nav-session">
                    <Link className="nav-link" to="/" onClick={this.props.logout}>
                        <p>LOG OUT</p>
                    </Link>
                    <Link className="nav-link" to="/">
                        <p>HOME</p>
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="nav-session">
                    <Link className="nav-link" to="/signup">
                        <p>SIGN UP</p>
                    </Link>
                    <Link className="nav-link" to="/login">
                        <p>LOG IN</p>
                    </Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="nav">
                <Link className="nav-logo" to="/">
                    <p>SOFABOARDING</p>
                </Link>
                <div className="nav-search"></div>
                {this.display()}
            </div>
        )
    }
}

export default NavBar;