import React from 'react';
import ChatBlockContainer from '../chat/chat_block_container';

class FriendProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "status": "unknown"
        }
        this.friendId = parseInt(this.props.location.pathname.substr(1));
    }

    componentDidMount() {
        if (Object.values(this.props.state.friendRequests).length < 1) {
            this.props.fetchAllRequests();
        }
        if (Object.values(this.props.state.friendships).length < 1) {
            this.props.fetchAllFriendships();
        }
        if (Object.values(this.props.state.users).length < 2) {
            this.props.fetchUsers();
        }
    }

    componentDidUpdate() {
        this.updateStatus();
    }

    updateStatus() {
        let status = "unknown";
        let friendships = Object.values(this.props.state.friendships);
        let friendRequests = Object.values(this.props.state.friendRequests);
        let myId = this.props.state.session.id;
        let friendId = this.friendId;
        if (friendRequests.length > 0) {
            status = 'notFriends';
        } else {
            return
        }
        for (let i = 0; i < friendships.length; i++) {
            if (friendships[i].user_id === myId) {
                if (friendships[i].friend_id === friendId) {
                    status = "friends";
                }
            }
        }
        for (let i = 0; i < friendships.length; i++) {
            if (friendships[i].friend_id === myId) {
                if (friendships[i].user_id === friendId) {
                    status = "friends";
                }
            }
        }
        for (let i = 0; i < friendRequests.length; i++) {
            if (friendRequests[i].requestor_id === myId) {
                if (friendRequests[i].receiver_id === friendId) {
                    // console.log('length', friendRequests.length)
                    // console.log('in loops')
                    status = "iAlreadyRequested";
                }
            }
        }
        for (let i = 0; i < friendRequests.length; i++) {
            if (friendRequests[i].receiver_id === myId) {
                if (friendRequests[i].requestor_id === friendId) {
                    status = "iAmRequested";
                }
            }
        }
        if (this.state.status === "unknown") {
            this.setState({ 'status': status })
        }
    }

    imageRender() {
        if (this.props.state.users[this.props.state.session.friendId] && this.props.state.users[this.props.state.session.friendId].profilePicUrl) {
            return (
                <img className="profile-pic" src={this.props.state.users[this.props.state.session.friendId].profilePicUrl} />
            )
        } else {
            return (
                <img className="profile-pic" src={window.profile_pic} />
            )
        }
    }

    nameRender() {
        if (this.friendId && this.props.state.users[this.friendId] && this.props.state.users[this.friendId].name) {
            return (
                <h5>{this.props.state.users[this.friendId].name}</h5>
            )
        } else {
            return (
                <h5>USER NAME</h5>
            )
        }
    }

    sendFriendRequest() {
        let object = {
            requestor_id: this.props.state.session.id,
            receiver_id: this.friendId
        };
        this.props.sendFriendRequest(object);
        this.setState({ 'status': 'iAlreadyRequested' });
        this.props.fetchAllRequests();
    }

    getRequestId() {
        let requestor_id = this.props.state.session.id;
        let receiver_id = this.friendId;
        let friendRequests = Object.values(this.props.state.friendRequests);
        let request_id = 0;
        for (let i = 0; i < friendRequests.length; i++) {
            if (friendRequests[i].requestor_id === requestor_id && friendRequests[i].receiver_id === receiver_id) {
                request_id = friendRequests[i].id;
            }
        }
        return request_id
    }

    deleteFriendRequest() {
        let requestId = this.getRequestId();
        if (this.props.deleteFriendRequest(requestId)) {
            this.setState({ 'status': 'notFriends' });
        }
        this.props.fetchAllRequests();
    }

    getFriendId() {
        let myId = this.props.state.session.id;
        let friendId = this.friendId;
        let friendships = Object.values(this.props.state.friendships)
        let friendshipId = '';
        for (let i = 0; i < friendships.length; i++) {
            if (friendships[i].user_id === myId) {
                if (friendships[i].friend_id === friendId) {
                    friendshipId = friendships[i].id
                }
            }
            if (friendships[i].friend_id === myId) {
                if (friendships[i].user_id === friendId) {
                    friendshipId = friendships[i].id
                }
            }
        }
        return friendshipId;
    }

    removeFriend() {
        this.props.deleteFriendship(this.getFriendId());
        this.setState({ 'status': 'notFriends' })
        this.props.fetchAllFriendships();
    }

    addFriend() {
        let object = {
            'user_id': this.props.state.session.id,
            'friend_id': this.friendId
        }
        this.props.createFriendship(object);
        this.setState({ 'status': 'friends' });
        this.props.fetchAllFriendships();
        this.props.fetchAllRequests();
    }

    requestButton() {
        switch (this.state.status) {
            case "friends":
                return <div onClick={() => this.removeFriend()}>Already Friends: Unfriend</div>;
            case "iAlreadyRequested":
                return <div onClick={() => this.deleteFriendRequest()}>Unsend Friend Request</div>;
            case "iAmRequested":
                return <div onClick={() => this.addFriend()}>Accept Friendship!</div>;
            case "notFriends":
                return <div onClick={() => this.sendFriendRequest()}>Send Friend Request!</div>;
            default:
                return <div>Status unknown!</div>;

        }
    }

    render() {
        return (
            <div className="friend-profile">
                <div className="friend-info">
                    <div className="friend-pic">
                        <div className="photo-container">
                            {this.imageRender()}
                        </div>
                    </div>
                    <div className="friend-request">
                        {this.nameRender()}
                        {this.requestButton()}
                    </div>
                </div>
                {<ChatBlockContainer friendId={this.friendId} />}
            </div>
        )
    }
}

export default FriendProfile;