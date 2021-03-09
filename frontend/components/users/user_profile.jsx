import React from 'react';
import FindFriends from '../friends/find_friend_container';
import UserInfo from '../users/user_info_container';
import ChatBlockContainer from '../chat/chat_block_container';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.fetchAllRequests();
        this.props.fetchAllFriendships();
    }

    render() {
        return (
            <div className="user-profile">
                <div className="profile-info">
                    {<UserInfo />}
                </div>
                <div className="profile-main">
                    {<FindFriends />}
                    {<ChatBlockContainer />}
                </div>
            </div>
        )
    }
}

export default UserProfile;