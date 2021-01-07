import React from 'react';
import FindFriends from '../friends/find_friend_container';
import UserInfo from '../users/user_info_container';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        // console.log("props,", this.props);
        this.state = this.props.user;
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        return (
            <div className="user-profile">
                <div className="profile-info">
                    {<UserInfo />}
                </div>
                <div className="profile-main">
                    {<FindFriends />}
                </div>
            </div>
        )
    }
}

export default UserProfile;