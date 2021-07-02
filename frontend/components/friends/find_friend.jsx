import React from 'react';
import FriendCarousel from './friend_carousel_container';

class FindFriends extends React.Component {
    constructor(props) {
        super(props);
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
        return (
            <div className="show-users">
                <FriendCarousel friendsList={yourFriends} label="Friends"/>
                <FriendCarousel friendsList={acceptFriends} label="Requests"/>
                <FriendCarousel friendsList={requestedFriends} label="You Requested"/>
                <FriendCarousel friendsList={newFriends} label="Find New Friends"/>
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
