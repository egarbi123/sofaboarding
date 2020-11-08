import React from 'react';
import { Link } from 'react-router-dom';
// import UsersIndexContainer from '../users/user_index_container';

class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>in splash</p>
                <div>
                    <Link to="users">Users List</Link>
                    <Link to="chat">To chat</Link>
                </div>
            </div>
        )
    }
}

export default Splash;