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
            return (<FriendCarousel friendsList={yourFriends} label="Friends" />)
        } else if (this.state.currentList === "alreadyAccepted") {
            return (<FriendCarousel friendsList={requestedFriends} label="Requests Sent" />)
        } else if (this.state.currentList === "acceptFriendsArray") {
            return (<FriendCarousel friendsList={acceptFriends} label="Requests Received" />)
        } else {
            return (<FriendCarousel friendsList={newFriends} label="Find New Friends" />)
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
                    <div className="friends-button" onClick={() => this.setState({"currentList": "friendsArray"})}>FRIENDS LIST</div>
                    <div className="friends-button" onClick={() => this.setState({"currentList": "newFriendsArray"})}>FIND NEW FRIENDS</div>
                    <div className="friends-button" onClick={() => this.setState({"currentList": "acceptFriendsArray"})}>ACCEPT FRIEND REQUESTS</div>
                    <div className="friends-button" onClick={() => this.setState({"currentList": "alreadyAcceptedArray"})}>FRIENDS REQUESTED</div>
                </div>
                <div className="show-users">
                    {this.showUsers()}
                </div>
            </div>
        )
    }
}

export default FindFriends;
