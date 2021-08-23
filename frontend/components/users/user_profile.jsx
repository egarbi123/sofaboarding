import React from 'react';
import FindFriends from '../friends/find_friend_container';
import UserInfo from '../users/user_info_container';
import ChatBlockContainer from '../chat/chat_block_container';
import Events from '../events/events_container';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "friends": [],
            "acceptFriends": [],
            "requestedFriends": [],
            "newFriends": [],
        }
        this.infoToState = this.infoToState.bind(this);
        this.imageRender = this.imageRender.bind(this);
    }
    
    componentDidMount() {
        this.usersToState();
    }

    componentDidupdate() {
        if (this.friends.length > 0 && this.state.friends.length < 1) {
            this.setState({ "friends": this.friends })
        }
        if (this.acceptFriends.length > 0 && this.state.acceptFriends.length < 1) {
            this.setState({ "acceptFriends": this.acceptFriends })
        }
        if (this.requestedFriends.length > 0 && this.state.requestedFriends.length < 1) {
            this.setState({ "requestedFriends": this.requestedFriends })
        }
        if (this.newFriends.length > 0 && this.state.newFriends.length < 1) {
            this.setState({ "newFriends": this.newFriends })
        }
    }

    
    imageRender(user) {
        if (user.profilePicUrl) {
            return (
                <img className="profile-pic-mid" src={user.profilePicUrl} />
            )
        } else {
            return (
                <img className="profile-pic-mid" src={window.profile_pic} />
                )
        }
    }
    
    infoToState() {
        // Gather info to use
        // console.log('++++',this);
        let usersArray = Object.values(this.props.state.users);
        let requests = {};
        let friendships = {};
        if (this.props.state.friendRequests) {
            requests = this.props.state.friendRequests;
        }
        if (this.props.state.friendships) {
            friendships = this.props.state.friendships;
        }
        
        // Turn objects into arrays
        let requestsArray = Object.values(requests);
        let friendshipsArray = Object.values(friendships);

        // Set up  different categories
        let requested = [];
        let receivedRequests = [];
        let alreadyFriends = [];

        // Distinguish categories
        if (requestsArray.length > 1) {
            requestsArray.map(request => {
                if (request.requestor_id === this.props.state.session.id) {
                    requested.push(request.receiver_id);
                }
                if (request.receiver_id === this.props.state.session.id) {
                    receivedRequests.push(request.requestor_id);
                }
            })
        }
        if (friendshipsArray.length > 1) {
            friendshipsArray.map(friend => {
                if (friend) {
                    if (friend.user_id === this.props.state.session.id) {
                        alreadyFriends.push(friend.friend_id);
                    }
                    if (friend.friend_id === this.props.state.session.id) {
                        alreadyFriends.push(friend.user_id);
                    }
                }
            })
        }
        
        // Info into objects/ arrays
        
        this.friendsArray = [];
        this.acceptFriendsArray = [];
        this.alreadyRequestedArray = [];
        this.newFriendsArray = [];
        usersArray.map((user) => {
            let id = parseInt(user.id);
            if (id === this.props.state.session.id) {
                return;
            } else if (alreadyFriends.includes(id)) {
                this.friendsArray.push(user.id);
            } else if (receivedRequests.includes(id)) {
                this.acceptFriendsArray.push(user.id)
            } else if (requested.includes(id)) {
                this.alreadyRequestedArray.push(user.id);
            } else {
                this.newFriendsArray.push(user.id);
            }
        })
        if (this.friendsArray.length !== this.state.friends.length) {
            this.setState({'friends': this.friendsArray})
        }
        if (this.acceptFriendsArray.length !== this.state.acceptFriends.length) {
            this.setState({'acceptFriends': this.acceptFriendsArray})
        }
        if (this.alreadyRequestedArray.length !== this.state.requestedFriends.length) {
            this.setState({'requestedFriends': this.alreadyRequestedArray})
        }
        if (this.newFriendsArray.length !== this.state.newFriends.length) {
            this.setState({'newFriends': this.newFriendsArray})
        }

    }

    setActiveFriend(friendId) {
        this.props.makeActiveFriend(friendId)
    }

    usersToState() {
        // Gather info to use
        let usersArray = Object.values(this.props.state.users);
        let requests = {};
        let friendships = {};
        if (this.props.state.friendRequests) {
            requests = this.props.state.friendRequests;
        }
        if (this.props.state.friendships) {
            friendships = this.props.state.friendships;
        }

        // Turn objects into arrays
        let requestsArray = Object.values(requests);
        let friendshipsArray = Object.values(friendships);
        
        // Set up  different categories
        let requested = [];
        let receivedRequests = [];
        let alreadyFriends = [];
        
        // Distinguish categories
        if (requestsArray.length > 1) {
            requestsArray.map(request => {
                if (request.requestor_id === this.props.state.session.id) {
                    requested.push(request.receiver_id);
                }
                if (request.receiver_id === this.props.state.session.id) {
                    receivedRequests.push(request.requestor_id);
                }
            })
        }
        if (friendshipsArray.length > 1) {
            friendshipsArray.map(friend => {
                if (friend) {
                    if (friend.user_id === this.props.state.session.id) {
                        alreadyFriends.push(friend.friend_id);
                    }
                    if (friend.friend_id === this.props.state.session.id) {
                        alreadyFriends.push(friend.user_id);
                    }
                }
            })
        }
        
        let friendsArray = [];
        let acceptFriendsArray = [];
        let alreadyRequestedArray = [];
        let newFriendsArray = [];
        usersArray.map((user) => {
            let id = parseInt(user.id);
            if (id === this.props.state.session.id) {
                return;
            } else if (alreadyFriends.includes(id)) {
                friendsArray.push(user.id);
            } else if (receivedRequests.includes(id)) {
                acceptFriendsArray.push(user.id)
            } else if (requested.includes(id)) {
                alreadyRequestedArray.push(user.id);
            } else {
                newFriendsArray.push(user.id);
            }
        })
        console.log(friendsArray)
        if (this.state.friends.length !== friendsArray) {
            this.infoToState();
        } else if (this.state.acceptFriends.length !== acceptFriendsArray) {
            this.infoToState();
        } else if (this.state.requestedFriends.length !== alreadyRequestedArray.length) {
            this.infoToState();
        } else if (this.state.newFriends.length !== newFriendsArray.length) {
            this.infoToState();
        } else {
            return
        }
    }
    
    render() {
        let {friends, acceptFriends, requestedFriends, newFriends} = this.state;
        if (!this.props.state) {
            return (<div> "loading </div>)
        }
        this.usersToState();
        return (
            <div className="user-profile">
                <div className="profile-info">
                    {<UserInfo />}
                </div>
                <div className="profile-main">
                    {<FindFriends 
                        friendsArray={friends} 
                        acceptFriendsArray={acceptFriends} 
                        alreadyRequestedArray={requestedFriends} 
                        newFriendsArray={newFriends} 
                    />}
                    {<ChatBlockContainer />}
                    {<Events />}
                </div>
            </div>
        )
    }
}

export default UserProfile;