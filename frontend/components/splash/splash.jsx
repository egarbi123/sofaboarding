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
        console.log(this);
        return (
            <div className="splash">
                <div className="welcome-info">
                    <h3>WELCOME TO SOFABOARDING!</h3>
                    <p>Here you can meet new people around the world</p>
                    <p>Share awesome travel tips and ideas</p>
                    <p>Here we are friends!</p>
                    <p>Already have an account? <Link className="nav-link" to="/login">Click Here</Link></p>
                    <p>Would you like to sign up? <Link className="nav-link" to="/signup">Click Here</Link></p>
                </div>
            </div>
        )
    }
}

export default Splash;