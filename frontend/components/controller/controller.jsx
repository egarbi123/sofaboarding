import React from 'react';
import UserProfile from '../users/user_profile_container';
import Splash from '../splash/splash_container';

class Controller extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUsers();
        this.props.fetchAllFriendships();
        this.props.fetchAllRequests();
    }

    display() {
        if (localStorage.userId || this.props.state.session.id && this.props.state.users.length) {
            return <UserProfile />
        } else {
            return <Splash />
        }
    }

    render() {
        return (
            <div className="controller">
                {this.display()}
            </div>
        )
    }
}

export default Controller;