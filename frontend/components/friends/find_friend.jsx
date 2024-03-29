import React from 'react';
import FriendCarousel from './friend_carousel_container';

class FindFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "friendsArray": [],
            "acceptFriendsArray": [],
            "alreadyRequestedArray": [],
            "newFriendsArray": [],
            "currentList": "newFriendsArray"
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

    showUsers() {
        let usersArray = Object.values(this.props.state.users);
        let newFriends = [];
        usersArray.map((user) => {
            if (this.state.newFriendsArray.includes(user.id)) {
                newFriends.push(user);
            }
        })
        let requestedFriends = [];
        usersArray.map((user) => {
            if (this.state.alreadyRequestedArray.includes(user.id)) {
                requestedFriends.push(user);
            }
        })
        let yourFriends = [];
        usersArray.map((user) => {
            if (this.state.friendsArray.includes(user.id)) {
                yourFriends.push(user);
            }
        })
        let acceptFriends = [];
        usersArray.map((user) => {
            if (this.state.acceptFriendsArray.includes(user.id)) {
                acceptFriends.push(user);
            }
        })
        if (this.state.currentList === "friendsArray") {
            return (<FriendCarousel friendsList={yourFriends} label="FRIENDS" />)
        } else if (this.state.currentList === "alreadyAcceptedArray") {
            return (<FriendCarousel friendsList={requestedFriends} label="REQUESTS SENT" />)
        } else if (this.state.currentList === "acceptFriendsArray") {
            if (acceptFriends.length > 0) {
                return (<FriendCarousel friendsList={acceptFriends} label="REQUESTS RECEIVED" />)
            } else {
                return (<FriendCarousel friendsList={newFriends} label="NO REQUESTS, FIND NEW FRIENDS!" />)
            }
        } else {
            return (<FriendCarousel friendsList={newFriends} label="FIND NEW FRIENDS" />)
        }
    }

    render() {
        if (!this.props.state) {
            return (<div> "loading </div>)
        }
        return (
            <div className="find-friends">
                <div className="find-friends-controls">
                    <h3>FRIENDS</h3>
                    <div className="friends-button" onClick={() => this.setState({ "currentList": "friendsArray"})}><p>FRIENDS LIST</p></div>
                    <div className="friends-button" onClick={() => this.setState({ "currentList": "newFriendsArray" })}><p>FIND NEW FRIENDS</p></div>
                    <div className="friends-button" onClick={() => this.setState({ "currentList": "acceptFriendsArray" })}><p>ACCEPT FRIEND REQUESTS</p></div>
                    <div className="friends-button" onClick={() => this.setState({ "currentList": "alreadyAcceptedArray" })}><p>FRIENDS REQUESTED</p></div>
                </div>
                <div className="show-users">
                    {this.showUsers()}
                </div>
            </div>
        )
    }
}

export default FindFriends;
