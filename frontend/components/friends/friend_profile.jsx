import React from 'react';
import ChatBlockContainer from '../chat/chat_block_container';

class FriendProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "status": "notFriends",
            "friendships": [],
            "friendRequests": []
        }
        this.friendId = parseInt(this.props.location.pathname.substr(1));
    }

    componentDidMount() {
        console.log('IN CDM:', this)
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
        let friendRequests = Object.values(this.props.state.friendRequests);
        let friendships = Object.values(this.props.state.friendships);

        // find last request to compare if id exists
        let lastRequestId = null;
        if (friendRequests[0]) {
            lastRequestId = friendRequests[0].id
            for (let i = 1; i < friendRequests.length; i++) {
                if (friendRequests[i].id > lastRequestId) {
                    lastRequestId = friendRequests[i].id
                }
            }
        }

        if (friendRequests.length > 0 && this.state.friendRequests.length < friendRequests.length - 1) {
            this.setState({
                "friendRequests": friendRequests
            })
        }
        if (friendships.length > 0 && this.state.friendships.length < friendships.length) {
            this.setState({
                "friendships": friendships
            })
        }
        if (this.props.state.users.length < 2) {
            this.props.fetchUsers();
        }
        // let status = "unknown";
        // let myId = this.props.state.session.id;
        // let friendId = this.friendId;
        // for (let i = 0; i < this.state.friendships.length; i++) {
        //     if (this.state.friendships[i].user_id === myId) {
        //         if (this.state.friendships[i].friend_id === friendId) {
        //             status = "friends";
        //         }
        //     }
        // }
        // for (let i = 0; i < this.state.friendships.length; i++) {
        //     if (this.state.friendships[i].friend_id === myId) {
        //         if (this.state.friendships[i].user_id === friendId) {
        //             status = "friends";
        //         }
        //     }
        // }
        // for (let i = 0; i < this.state.friendRequests.length; i++) {
        //     if (this.state.friendRequests[i].requestor_id === myId) {
        //         if (this.state.friendRequests[i].receiver_id === friendId) {
        //             status = "iAlreadyRequested";
        //         }
        //     }
        // }
        // for (let i = 0; i < this.state.friendRequests.length; i++) {
        //     if (this.state.friendRequests[i].receiver_id === myId) {
        //         if (this.state.friendRequests[i].requestor_id === friendId) {
        //             status = "iAmRequested";
        //         }
        //     }
        // }
        // if (this.state.status !== status) {
        //     this.setState({'status': status})
        // }
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
        let newRequests = this.state.friendRequests;
        newRequests.push(object)
        this.setState({
            'friendRequests': newRequests,
            'status': "iAlreadyRequested"
        })
        this.props.fetchAllRequests();
    }

    deleteFriendRequest() {
        // identify if my current state has any matching request, by comparing requestor_id && receiver_id
        // if match exists, find it in props.state.friendRequests for request_id
        // if request_id is found, recreate a new state to set. And make API call to remove request.

        let stateRequests = this.state.friendRequests;
        let requestor_id = 0;
        let receiver_id = 0;
        let exists = false;
        for (let i = 0; i < stateRequests.length; i++) {
            requestor_id = stateRequests[i].requestor_id;
            receiver_id = stateRequests[i].receiver_id;
            if (requestor_id === this.props.state.session.id && receiver_id === this.friendId) {
                exists = true;
            }
        }
        let propsRequests = Object.values(this.props.state.friendRequests);
        let object = {};
        let props_requestor = 0;
        let props_receiver = 0;
        let props_id = 0;
        if (exists === true) {
            for (let i = propsRequests.length - 1; i >= 0; i--) {
                props_requestor = propsRequests[i].requestor_id;
                props_receiver = propsRequests[i].receiver_id
                if (props_requestor === this.props.state.session.id && props_receiver === this.friendId) {
                    props_id = propsRequests[i].id;
                    break;
                }
            }
            if (props_id !== 0) {
                object = {
                    "requestor_id": props_requestor,
                    "receiver_id": props_receiver,
                    "id": props_id
                }
            }
        }
        console.log(object)
        if (object.id) {
            console.log('IN IF STATEMENT')
            this.props.deleteFriendRequest(props_id);
            let newRequests = [];
            let requests = this.state.friendRequests
            for (let i = 0; i < requests.length; i++) {
                if (requests[i].requestor_id !== props_requestor && requests[i].receiver_id !== props_receiver) {
                    newRequests.push(requests[i]);
                }
            }
            this.setState({
                'status': 'notFriends' 
            })
            this.setState({ 
                'friendRequests': newRequests,
            })
        }
        this.props.fetchAllRequests();
        // console.log('this:', this);
        // let propstateRequests = this.state.friendRequests;
        // console.log(propstateRequests);
        // let requestId = 0;
        // let requestor_id = 0;
        // let receiver_id = 0;
        // let request_id = 0;
        // for (let i = 0; i < propstateRequests.length; i++) {
        //     requestor_id = propstateRequests[i].requestor_id;
        //     receiver_id = propstateRequests[i].receiver_id
        //     request_id = propstateRequests[i].id
        //     console.log('CDC', requestor_id, receiver_id)
        //     if (requestor_id === this.props.state.session.id && receiver_id === this.friendId) {
        //         console.log('made it')
        //         requestId = request_id;
        //     }
        // }
        // console.log(requestId);
        // if (requestId !== 0 && requestId !== undefined) {
        //     console.log('REQUEST SENT')
        //     this.props.deleteFriendRequest(requestId);
        //     let newRequests = [];
        // let requests = this.state.friendRequests
        // for (let i = 0; i < requests.length; i++) {
        //     if (requests[i].id !== requestId) {
        //         newRequests.push(requests[i]);
        //     }
        // }
        //     console.log('NEWREQUESTS:', newRequests);
        //     console.log('OLDREQUESTS:', requests);
        //     this.setState({'friendRequests': newRequests})
        // }
    }



    removeFriend() {
        console.log(this);
        let myId = this.props.state.session.id;
        let friendId = this.friendId; 
        let friendships = Object.values(this.state.friendships)
        console.log(friendships);
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
        console.log(friendshipId);
        if (typeof(friendshipId) === 'number') {
            console.log(true);
        }
        this.props.deleteFriendship(friendshipId);
        this.setState({
            'status': 'notFriends'
        })
        this.props.fetchAllFriendships();
    }

    addFriend() {
        // find friendRequest.id => delete,
        let requestId = '';
        let myId = this.props.state.session.id;
        let friendId = this.friendId; 
        let friendRequests = Object.values(this.props.state.friendRequests);
        for (let i = 0; i < friendRequests.length; i++) {
            if (friendRequests[i].receiver_id === myId) {
                if (friendRequests[i].requestor_id === friendId) {
                    requestId = friendRequests[i].id;
                }
            }
        }
        console.log(requestId);
        // this.props.deleteFriendRequest(requestId);

        // grap myId and FriendId, addFriendship
        let object = {
            'user_id': myId,
            'friend_id': friendId
        }
        this.props.createFriendship(object)

        // update status for button change
        this.setState({'status': 'friends'})
        this.props.fetchAllFriendships();
        this.props.fetchAllRequests();
    }

    requestButton() {
        let status = "notFriends";
        let friendships = Object.values(this.props.state.friendships);
        let friendRequests = Object.values(this.props.state.friendRequests);
        // console.log('friendships:', friendships);
        // console.log('friendRequests:', friendRequests);
        let myId = this.props.state.session.id;
        let friendId = this.friendId;
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
        console.log(this.state.status)
        console.log(status)
        if (this.state.status !== status) {
            this.setState({'status': status})
        }

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
                return <div onClick={() => this.sendFriendRequest()}>Send Friend Request!</div>;
            
        }
    }

    render() {
        console.log(this);
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
                    {<ChatBlockContainer friendId={this.friendId}/>}
                </div>
            </div>
        )
    }
}

export default FriendProfile;