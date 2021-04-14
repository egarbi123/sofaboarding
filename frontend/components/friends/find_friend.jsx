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
    
    setActiveFriend(friendId) {
        this.props.makeActiveFriend(friendId)
    }

    displayLabel(label, list) {
        if (list.length > 0) {
            return <h3>{label}</h3>
        }
    }
    
    showUsers() {
        let usersArray = Object.values(this.props.state.users);
        return (
            <div className="show-users">
                <div className="friends-section">
                    {this.displayLabel('Find New Friends:', this.state.newFriendsArray)}
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
                    {this.displayLabel('Friend Requests Sent To:', this.state.alreadyRequestedArray)}
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
                    {this.displayLabel('Your Friends:', this.state.friendsArray)}
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
                <div className="friends-section">
                    {this.displayLabel('Friend Request received from:', this.state.acceptFriendsArray)}
                    <ul>
                        {usersArray.map((user) => {
                            if (this.state.acceptFriendsArray.includes(user.id)) {
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
            </div>
        )
    }
    
    render() {
        if (!this.props.state) {
            return (<div> "loading </div>)
        }
        return (
            <div className="find-friends">
                {this.showUsers()}
            </div>
        )
    }
}

export default FindFriends;


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