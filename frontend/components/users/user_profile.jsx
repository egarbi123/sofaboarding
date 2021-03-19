import React from 'react';
import FindFriends from '../friends/find_friend_container';
import UserInfo from '../users/user_info_container';
import ChatBlockContainer from '../chat/chat_block_container';
import { Link } from 'react-router-dom';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "friendsArray": [],
            "acceptFriendsArray": [],
            "alreadyRequestedArray": [],
            "newFriendsArray": []

        }
        this.infoToState = this.infoToState.bind(this);
        this.imageRender = this.imageRender.bind(this);
        // this.sendRequest = this.sendRequest.bind(this);
        // this.deleteFriendRequest = this.deleteFriendRequest.bind(this);
        // this.addFriend = this.addFriend.bind(this);
    }
    
    componentDidMount() {
        this.props.fetchAllRequests();
        this.props.fetchAllFriendships();
    }

    componentDidupdate() {
        if (this.friendsArray.length > 0 && this.state.friendsArray.length < 1) {
            this.setState({ "friendsArray": this.friendsArray })
        }
        if (this.acceptFriendsArray.length > 0 && this.state.acceptFriendsArray.length < 1) {
            this.setState({ "acceptFriendsArray": this.acceptFriendsArray })
        }
        if (this.alreadyRequestedArray.length > 0 && this.state.alreadyRequestedArray.length < 1) {
            this.setState({ "alreadyRequestedArray": this.alreadyRequestedArray })
        }
        if (this.newFriendsArray.length > 0 && this.state.newFriendsArray.length < 1) {
            this.setState({ "newFriendsArray": this.newFriendsArray })
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
                // console.log(user.id)
                this.newFriendsArray.push(user.id);
            }
        })
        if (this.friendsArray.length !== this.state.friendsArray.length) {
            this.setState({'friendsArray': this.friendsArray})
        }
        if (this.acceptFriendsArray.length !== this.state.acceptFriendsArray.length) {
            this.setState({'acceptFriendsArray': this.acceptFriendsArray})
        }
        if (this.alreadyRequestedArray.length !== this.state.alreadyRequestedArray.length) {
            this.setState({'alreadyRequestedArray': this.alreadyRequestedArray})
        }
        if (this.newFriendsArray.length !== this.state.newFriendsArray.length) {
            this.setState({'newFriendsArray': this.newFriendsArray})
        }

    }

    setActiveFriend(friendId) {
        this.props.makeActiveFriend(friendId)
    }

    usersToState() {
        // Gather info to use
        let usersArray = Object.values(this.props.state.users);
        // console.log('usersArray', usersArray);
        // console.log(this.props.state.users)
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
        let friendsArray = [];
        let acceptFriendsArray = [];
        let alreadyRequestedArray = [];
        let newFriendsArray = [];
        usersArray.map((user) => {
            let id = parseInt(user.id);
            if (id === this.props.state.session.id) {
                return;
            } else if (alreadyFriends.includes(id)) {
                // friendsObject[user.id] = user;
                friendsArray.push(user.id);
            } else if (receivedRequests.includes(id)) {
                // acceptFriendsObject[user.id] = user;
                acceptFriendsArray.push(user.id)
            } else if (requested.includes(id)) {
                // alreadyRequestedObject[user.id] = user;
                alreadyRequestedArray.push(user.id);
            } else {
                // newFriendsObject[user.id] = user;
                newFriendsArray.push(user.id);
            }
        })
        
        if (this.friendsArray !== friendsArray) {
            this.infoToState();
        } else if (this.acceptFriendsArray !== acceptFriendsArray) {
            this.infoToState();
        } else if (this.alreadyRequestedArray !== alreadyRequestedArray) {
            this.infoToState();
        } else if (this.newFriendsArray !== newFriendsArray) {
            this.infoToState();
        } else {
            
        }
    }
    
    render() {
        let {friendsArray, acceptFriendsArray, alreadyRequestedArray, newFriendsArray} = this.state;
        
        if (!this.props.state) {
            return (<div> "loading </div>)
        }
        console.log(this);
        this.usersToState()
        return (
            <div className="user-profile">
                <div className="profile-info">
                    {<UserInfo />}
                </div>
                <div className="profile-main">
                    {/* <div className="find-friends">
                        {this.showUsers()}
                    </div>                  */}
                    {<FindFriends 
                        friendsArray={friendsArray} 
                        acceptFriendsArray={acceptFriendsArray} 
                        alreadyRequestedArray={alreadyRequestedArray} 
                        newFriendsArray={newFriendsArray} 
                    />}
                    {/* {<ChatBlockContainer />} */}
                </div>
            </div>
        )
    }
}

export default UserProfile;

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

// showUsers() {
//     // Gather info to use
//     let usersArray = Object.values(this.props.state.users);
//     // console.log('usersArray', usersArray);
//     // console.log(this.props.state.users)
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
//     let friendsArray = [];
//     let acceptFriendsArray = [];
//     let alreadyRequestedArray = [];
//     let newFriendsArray = [];
//     usersArray.map((user) => {
    //         let id = parseInt(user.id);
//         if (id === this.props.state.session.id) {
    //             return;
    //         } else if (alreadyFriends.includes(id)) {
        //             // friendsObject[user.id] = user;
        //             friendsArray.push(user.id);
//         } else if (receivedRequests.includes(id)) {
    //             // acceptFriendsObject[user.id] = user;
    //             acceptFriendsArray.push(user.id)
    //         } else if (requested.includes(id)) {
        //             // alreadyRequestedObject[user.id] = user;
        //             alreadyRequestedArray.push(user.id);
        //         } else {
            //             // newFriendsObject[user.id] = user;
            //             newFriendsArray.push(user.id);
            //         }
//     })

//     if (this.friendsArray !== friendsArray) {
    //         this.infoToState();
    //     } else if (this.acceptFriendsArray !== acceptFriendsArray) {
//         this.infoToState();
//     } else if (this.alreadyRequestedArray !== alreadyRequestedArray) {
    //         this.infoToState();
    //     } else if (this.newFriendsArray !== newFriendsArray) {
//         this.infoToState();
//     } else {
    
    //     }
//     // console.log('newFriends', this.state.newFriendsArray);
//     return (
//         <div className="show-users">
//             <div className="friends-section">
//                 <h3>Find New Friends:</h3>
//                 <ul>
//                     {usersArray.map((user) => {
//                         if (this.state.newFriendsArray.includes(user.id)) {
    //                             return (
//                                 <li key={user.id} onClick={() => this.setActiveFriend(user.id)}>
//                                     <Link className="nav-link" to={`/${user.id}`}>
//                                         <div key={user.id} className="med-user-cont">
//                                             <div className="med-image-cont">
//                                                 {this.imageRender(user)}
//                                             </div>
//                                             <p>
//                                                 {user.name}
//                                             </p>
//                                         </div>
//                                     </Link>
//                                 </li>
//                             )
//                         }
//                     }
//                     )}
//                 </ul>
//             </div>
//             <div className="friends-section">
//                 <h3>Friend Requests Sent To:</h3>
//                 <ul>
//                     {usersArray.map((user) => {
    //                         if (this.state.alreadyRequestedArray.includes(user.id)) {
        //                             return (
//                                 <li key={user.id} onClick={() => this.setActiveFriend(user.id)}>
//                                     <Link className="nav-link" to={`/${user.id}`}>
//                                         <div key={user.id} className="med-user-cont">
//                                             <div className="med-image-cont">
//                                                 {this.imageRender(user)}
//                                             </div>
//                                             <p>
//                                                 {user.name}
//                                             </p>
//                                         </div>
//                                     </Link>
//                                 </li>
//                             )
//                         }
//                     }
//                     )}
//                 </ul>
//             </div>

//             <div className="friends-section">
//                 <h3>Your Friends:</h3>
//                 <ul>
//                     {usersArray.map((user) => {
//                         if (this.state.friendsArray.includes(user.id)) {
    //                             return (
//                                 <li key={(user.id)}>
//                                     <div key={user.id} className="med-user-cont">
//                                         <div className="med-image-cont">
//                                             {this.imageRender(user)}
//                                         </div>
//                                         <p>
//                                             {user.name}
//                                         </p>
//                                     </div>
//                                 </li>
//                             )
//                         }
//                     }
//                     )}
//                 </ul>
//             </div>
//         </div>
//     )
// }