import React from 'react';
import { Link } from 'react-router-dom';
// import UsersIndexContainer from '../users/user_index_container';

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        return (
            <div className="splash">
                <div className="welcome-info">
                    <h3>WELCOME TO SOFABOARDING!</h3>
                    <p>Here you can meet new people around the world</p>
                    <p>Share awesome travel tips and ideas</p>
                    <p>Here we are friends!</p>
                    <div className="splash-buttons">
                        <div className="splash-split">
                            <div className="button">
                                <Link className="nav-link" to="/login">LOGIN</Link>
                            </div>
                        </div>
                        <div className="splash-split">
                            <div className="button">
                                <Link className="nav-link" to="/signup">SIGN UP</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Splash;