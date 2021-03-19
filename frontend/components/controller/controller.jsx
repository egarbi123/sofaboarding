import React from 'react';
import UserProfile from '../users/user_profile_container';
import Splash from '../splash/splash_container';

class Controller extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    display() {
        if (localStorage.userId || this.props.state.session.id && this.props.state.users.length) {
            return <UserProfile />
        } else {
            return <Splash />
        }
    }

    render() {
        // console.log(this);
        return (
            <div className="controller">
                {this.display()}
            </div>
        )
    }
}

export default Controller;