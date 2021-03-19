import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class FindFriends extends React.Component {
    constructor(props) {
        super(props);
        this.imageRender = this.imageRender.bind(this);
        this.state = {
            "friendsArray": [],
            "acceptFriendsArray": [],
            "alreadyRequestedArray": [],
            "newFriendsArray": []

        }
    }
    
    componentDidUpdate() {
        if (this.state.friendsArray.length !== this.props.friendsArray.length) {
            this.setState({'friendsArray': this.props.friendsArray})
        }
        if (this.state.acceptFriendsArray.length !== this.props.acceptFriendsArray.length) {
            this.setState({'acceptFriendsArray': this.props.acceptFriendsArray})
        }
        if (this.state.alreadyRequestedArray.length !== this.props.alreadyRequestedArray.length) {
            this.setState({'alreadyRequestedArray': this.props.alreadyRequestedArray})
        }
        if (this.state.newFriendsArray.length !== this.props.newFriendsArray.length) {
            this.setState({'newFriendsArray': this.props.newFriendsArray})
        }
    }

    // sendRequest(friendId) {
    //     let myId = this.props.state.session.id;
    //     let friendInteger = parseInt(friendId);
    //     let object = {
    //         requestor_id: myId,
    //         receiver_id: friendInteger
    //     }
    //     this.props.sendFriendRequest(object);
    //     let newNewFriendsArray = [];
    //     for (let i = 0; i < this.state.newFriendsArray.length; i++) {
    //         if (this.state.newFriendsArray[i] !== friendId) {
    //             newNewFriendsArray.push(this.state.newFriendsArray[i]);
    //         }
    //     }
    //     let newAlreadyRequestedArray = [];
    //     for (let i = 0; i < this.state.alreadyRequestedArray.length; i++) {
    //         newAlreadyRequestedArray.push(this.state.alreadyRequestedArray[i]);
    //     }
    //     newAlreadyRequestedArray.push(friendId);
    //     this.setState({
    //         'alreadyRequestedArray': newAlreadyRequestedArray,
    //         'newFriendsArray': newNewFriendsArray
    //     })
    // }

    // deleteFriendRequest(id, friendId) {
    //     this.props.deleteFriendRequest(id);
    //     let newAlreadyRequestedArray = [];
    //     for (let i = 0; i < this.state.alreadyRequestedArray.length; i++) {
    //         if (this.state.alreadyRequestedArray[i] !== friendId) {
    //             newAlreadyRequestedArray.push(this.state.alreadyRequestedArray[i]);
    //         }
    //     }
    //     let newNewFriendsArray = [];
    //     for (let i = 0; i < this.state.newFriendsArray.length; i++) {
    //         newNewFriendsArray.push(this.state.newFriendsArray[i]);
    //     }
    //     newNewFriendsArray.push(friendId);
    //     this.setState({
    //         'alreadyRequestedArray': newAlreadyRequestedArray,
    //         'newFriendsArray': newNewFriendsArray
    //     })
    // }

    // addFriend(friendId) {
    //     let myId = this.props.state.session.id;
    //     let friendInteger = parseInt(friendId);
    //     let object = {
    //         user_id: myId,
    //         friend_id: friendInteger
    //     }
    //     this.props.createFriendship(object);
    //     let newFriendsList = [];
    //     for (let i = 0; i < this.state.friendsArray; i++) {
    //         newFriendsList.push(this.state.friendsArray[i]);
    //     }
    //     newFriendsList.push(friendId);
    //     let newAcceptFriendsList = [];
    //     for (let i = 0; i < this.state.acceptFriendsArray.length; i++) {
    //         if (this.state.acceptFriendsArray[i] !== friendId) {
    //             newAcceptFriendsList.push(this.state.acceptFriendsArray[i])
    //         }
    //     }
    //     this.setState({
    //         'friendsArray': newFriendsList,
    //         'acceptFriendsArray': newAcceptFriendsList
    //     })
    // }

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
          
    // infoToState() {
    //     // Gather info to use
    //     let usersArray = Object.values(this.props.state.users);
    //     // console.log('usersArray', usersArray);
    //     let requests = {};
    //     let friendships = {};
    //     if (this.props.state.friendRequests) {
    //         requests = this.props.state.friendRequests;
    //     }
    //     if (this.props.state.friendships) {
    //         friendships = this.props.state.friendships;
    //     }

    //     // Turn objects into arrays
    //     let requestsArray = Object.values(requests);
    //     let friendshipsArray = Object.values(friendships);

    //     // Set up  different categories
    //     let requested = [];
    //     let receivedRequests = [];
    //     let alreadyFriends = [];

    //     // Distinguish categories
    //     if (requestsArray.length > 1) {
    //         requestsArray.map(request => {
    //             if (request.requestor_id === this.props.state.session.id) {
    //                 requested.push(request.receiver_id);
    //             }
    //             if (request.receiver_id === this.props.state.session.id) {
    //                 receivedRequests.push(request.requestor_id);
    //             }
    //         })
    //     }
    //     if (friendshipsArray.length > 1) {
    //         friendshipsArray.map(friend => {
    //             if (friend) {
    //                 if (friend.user_id === this.props.state.session.id) {
    //                     alreadyFriends.push(friend.friend_id);
    //                 }
    //                 if (friend.friend_id === this.props.state.session.id) {
    //                     alreadyFriends.push(friend.user_id);
    //                 }
    //             }
    //         })
    //     }

    //     // Info into objects/ arrays
    //     let newFriendsObject = {};
    //     let acceptFriendsObject = {};
    //     let alreadyRequestedObject = {};
    //     let friendsObject = {};
    //     this.friendsArray = [];
    //     this.acceptFriendsArray = [];
    //     this.alreadyRequestedArray = [];
    //     this.newFriendsArray = [];
    //     usersArray.map((user) => {
    //         let id = parseInt(user.id);
    //         if (id === this.props.state.session.id) {
    //             return;
    //         } else if (alreadyFriends.includes(id)) {
    //             friendsObject[user.id] = user;
    //             this.friendsArray.push(user.id);
    //         } else if (receivedRequests.includes(id)) {
    //             acceptFriendsObject[user.id] = user;
    //             this.acceptFriendsArray.push(user.id)
    //         } else if (requested.includes(id)) {
    //             alreadyRequestedObject[user.id] = user;
    //             this.alreadyRequestedArray.push(user.id);
    //         } else {
    //             newFriendsObject[user.id] = user;
    //             this.newFriendsArray.push(user.id);
    //         }
    //     })
    // }

    setActiveFriend(friendId) {
        this.props.makeActiveFriend(friendId)
    }

    showUsers() {
        // // Gather info to use
        let usersArray = Object.values(this.props.state.users);



        // let requests = {};
        // let friendships = {};
        // if (this.props.state.friendRequests) {
        //     requests = this.props.state.friendRequests;
        // }
        // if (this.props.state.friendships) {
        //     friendships = this.props.state.friendships;
        // }

        // // Turn objects into arrays
        // let requestsArray = Object.values(requests);
        // let friendshipsArray = Object.values(friendships);

        // // Set up  different categories
        // let requested = [];
        // let receivedRequests = [];
        // let alreadyFriends = [];

        // // Distinguish categories
        // if (requestsArray.length > 1) {
        //     requestsArray.map(request => {
        //         if (request.requestor_id === this.props.state.session.id) {
        //             requested.push(request.receiver_id);
        //         }
        //         if (request.receiver_id === this.props.state.session.id) {
        //             receivedRequests.push(request.requestor_id);
        //         }
        //     })
        // }
        // if (friendshipsArray.length > 1) {
        //     friendshipsArray.map(friend => {
        //         if (friend) {
        //             if (friend.user_id === this.props.state.session.id) {
        //                 alreadyFriends.push(friend.friend_id);
        //             }
        //             if (friend.friend_id === this.props.state.session.id) {
        //                 alreadyFriends.push(friend.user_id);
        //             }
        //         }
        //     })
        // }

        // // Info into objects/ arrays
        // let friendsArray = [];
        // let acceptFriendsArray = [];
        // let alreadyRequestedArray = [];
        // let newFriendsArray = [];
        // usersArray.map((user) => {
        //     let id = parseInt(user.id);
        //     if (id === this.props.state.session.id) {
        //         return;
        //     } else if (alreadyFriends.includes(id)) {
        //         friendsArray.push(user.id);
        //     } else if (receivedRequests.includes(id)) {
        //         acceptFriendsArray.push(user.id)
        //     } else if (requested.includes(id)) {
        //         alreadyRequestedArray.push(user.id);
        //     } else {
        //         newFriendsArray.push(user.id);
        //     }
        // })

        // if (this.friendsArray !== friendsArray) {
        //     this.infoToState();
        // } else if (this.acceptFriendsArray !== acceptFriendsArray) {
        //     this.infoToState();
        // } else if (this.alreadyRequestedArray !== alreadyRequestedArray) {
        //     this.infoToState();
        // } else if (this.newFriendsArray !== newFriendsArray) {
        //     this.infoToState();
        // } else {

        // }

        // console.log(this.state.newFriendsArray)
        return (
            <div className="show-users">
                <div className="friends-section">
                    <h3>Find New Friends:</h3>
                    <ul>
                        {usersArray.map((user) => {
                            if (this.state.newFriendsArray.includes(user.id)) {
                                return (
                                    <li key={user.id} onClick={() => this.setActiveFriend(user.id)}>
                                        <Link className="nav-link" to={`/${user.id}`}>
                                            <div key={user.id} className="med-user-cont">
                                                <div className="med-image-cont">
                                                    {this.imageRender(user)}
                                                </div>
                                                <p>
                                                    {user.name}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            }
                        }
                        )}
                    </ul>
                </div>
                <div className="friends-section">
                    <h3>Friend Requests Sent To:</h3>
                    <ul>
                        {usersArray.map((user) => {
                            if (this.state.alreadyRequestedArray.includes(user.id)) {
                                return (
                                    <li key={user.id} onClick={() => this.setActiveFriend(user.id)}>
                                        <Link className="nav-link" to={`/${user.id}`}>
                                            <div key={user.id} className="med-user-cont">
                                                <div className="med-image-cont">
                                                    {this.imageRender(user)}
                                                </div>
                                                <p>
                                                    {user.name}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            }
                        }
                        )}
                    </ul>
                </div>
                
                <div className="friends-section">
                    <h3>Your Friends:</h3>
                    <ul>
                        {usersArray.map((user) => {
                            if (this.state.friendsArray.includes(user.id)) {
                                return (
                                    <li key={user.id} onClick={() => this.setActiveFriend(user.id)}>
                                        <Link className="nav-link" to={`/${user.id}`}>
                                            <div key={user.id} className="med-user-cont">
                                                <div className="med-image-cont">
                                                    {this.imageRender(user)}
                                                </div>
                                                <p>
                                                    {user.name}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            }
                        }
                        )}
                    </ul>
                </div>
                {/* <div className="friends-section">
                    <h3>Friend requests already sent to:</h3>
                    <ul>
                        {usersArray.map(
                            (user) => {
                                if (this.state.alreadyRequestedArray.includes(user.id)) {
                                    let requestId = 0;
                                    let friendId = 0;
                                    for (let i = 0; i < requestsArray.length; i++) {
                                        if (requestsArray[i].receiver_id === user.id && requestsArray[i].requestor_id === this.props.state.session.id) {
                                            requestId = requestsArray[i].id;
                                            friendId = requestsArray[i].receiver_id;

                                        }
                                    }
                                    return (
                                        <li key={user.id} onClick={() => this.deleteFriendRequest(requestId, friendId)}>
                                            <div key={user.id} className="small-user-container">
                                                <div className="small-image-container">
                                                    {this.imageRender(user)}
                                                </div>
                                                <p>
                                                    {user.name}
                                                </p>
                                            </div>
                                        </li>
                                    )
                                }
                            }
                        )}
                    </ul>
                </div> */}
                {/* <div className="friends-section">
                    <h3>Accept friends requests from:</h3>
                    <ul>
                        {usersArray.map((user) => {
                            if (this.state.acceptFriendsArray.includes(user.id)) {
                                return (
                                    <li key={user.id} onClick={() => this.addFriend(user.id)}>
                                        <div className="small-user-container">
                                            <div className="small-image-container">
                                                {this.imageRender(user)}
                                            </div>
                                            <p>
                                                {user.name}
                                            </p>
                                        </div>
                                    </li>
                                )
                            }
                        }
                        )}
                    </ul>
                </div> */}
            </div>
        )
    }

    render() {
        if (!this.props.state) {
            return (<div> "loading </div>)
        }
        console.log(this);
        console.log(this.state);
        return (
            <div className="find-friends">
                {this.showUsers()}
            </div>
        )
    }
}

export default FindFriends;