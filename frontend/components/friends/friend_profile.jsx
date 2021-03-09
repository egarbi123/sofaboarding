import React from 'react';
import ChatBlockContainer from '../chat/chat_block_container';

class FriendProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "status": "",
            "friendships": [],
            "friendRequests": []
        }
        // console.log(parseInt(this.props.location.pathname.substr(1)));
        this.friendId = parseInt(this.props.location.pathname.substr(1));
    }

    componentDidMount() {
        console.log('IN CDM:', this)
        if (Object.values(this.props.state.friendRequests).length < 1) {
            // get friend requests
            console.log('in CDM fetching requests')
            this.props.fetchAllRequests();
        }
        if (Object.values(this.props.state.friendships).length < 1) {
            // get friendships
            console.log('in CDM fetching friendships')
            this.props.fetchAllFriendships();
        }
        if (Object.values(this.props.state.users).length < 2) {
            console.log('in CDM fetching users')
            this.props.fetchUsers();
        }
    }

    componentDidUpdate() {
        // console.log('IN CDU:', this)
        let friendRequests = Object.values(this.props.state.friendRequests);
        let friendships = Object.values(this.props.state.friendships);

        // find last request to compare if id exists
        // console.log(friendRequests[0])
        let lastRequestId = null;
        if (friendRequests[0]) {
            lastRequestId = friendRequests[0].id
            for (let i = 1; i < friendRequests.length; i++) {
                if (friendRequests[i].id > lastRequestId) {
                    lastRequestId = friendRequests[i].id
                }
            }
        }
        console.log(lastRequestId);
        // for (let )


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
        // console.log(this.friendId)
        // console.log("++++++", this.props.state.users);
        // console.log(this.props.state.users[8])
        // if (this.friendId && this.props.state.user[this.friendId] && this.props.state.users[this.friendId].name) {
        //     return (
        //         <h5>{this.props.state.users[this.friendId].name}</h5>
        //     )
        // } else {
            return (
                <h5>USER NAME</h5>
            )
        // }
    }

    sendFriendRequest() {
        let object = {
            requestor_id: this.props.state.session.id,
            receiver_id: this.friendId
        };
        // console.log(object);
        this.props.sendFriendRequest(object);
        let newRequests = this.state.friendRequests;
        newRequests.push(object)
        this.setState({'friendRequests': newRequests})
    }

    deleteFriendRequest() {
        console.log('this:', this);
        let propstateRequests = this.state.friendRequests;
        let requestId = 0;
        let requestor_id = 0;
        let receiver_id = 0;
        let request_id = 0;
        for (let i = 0; i < propstateRequests.length; i++) {
            requestor_id = propstateRequests[i].requestor_id;
            receiver_id = propstateRequests[i].receiver_id
            request_id = propstateRequests[i].id
            console.log('CDC', requestor_id, receiver_id)
            if (requestor_id === this.props.state.session.id && receiver_id === this.friendId) {
                console.log('made it')
                requestId = request_id;
            }
        }
        console.log(requestId);
        if (requestId !== 0 && requestId !== undefined) {
            console.log('REQUEST SENT')
            this.props.deleteFriendRequest(requestId);
            let newRequests = [];
            let requests = this.state.friendRequests
            for (let i = 0; i < requests.length; i++) {
                if (requests[i].id !== requestId) {
                    newRequests.push(requests[i]);
                }
            }
            console.log('NEWREQUESTS:', newRequests);
            console.log('OLDREQUESTS:', requests);
            this.setState({'friendRequests': newRequests})
        }
    }
    

    requestButton() {
        let status = "unknown";
        let friendships = this.state.friendships;
        let friendRequests = this.state.friendRequests;
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
        // if (this.state.status !== status) {
        //     this.setState({"status": status});
        // }
        console.log('STATUS', status)
        switch (status) {
            case "friends":
                return <div>Already Friends: Unfriend</div>;
            case "iAlreadyRequested":
                return <div onClick={() => this.deleteFriendRequest()}>Unsend Friend Request</div>;
            case "iAmRequested":
                return <div>They want to be your friend! Accept Friend Request!</div>;
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
                </div>
                {<ChatBlockContainer friendId={this.friendId}/>}
            </div>
        )
    }
}

export default FriendProfile;