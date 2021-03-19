import React from 'react';
import MessagesAreaContainer from './messages_area_container';

class SingleRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'friends': [],
        }
    }

    componentDidUpdate() {
        this.determineFriends();
    }

    determineFriends() {
        let friendships = Object.values(this.props.state.friendships);
        let myFriendsIDs = [];
        friendships.map((friendship) => {
            if (friendship.user_id === this.props.state.session.id) {
                myFriendsIDs.push(friendship.friend_id);
            }
        })
        let users = Object.values(this.props.state.users);
        let myFriends = [];
        users.map((user) => {
            if (myFriendsIDs.includes(user.id)) {
                myFriends.push(user);
            }
        })
        console.log('this.props:', this.props);
        friendships = Object.values(this.props.state.friendships);
        console.log('friendships', friendships);
        console.log('myId', this.props.state.session.id);

        if (this.state.friends.length !== myFriends.length) {
            this.setState({'friends': myFriends});
        }
    }

    addFriendToRoom(friendId) {
        let object = {
            "user_id": friendId,
            "room_id": this.props.state.session.activeRoom
        };
        this.props.createRoomMembership(object);
    }

    showFriends() {
        let friends = this.state.friends;
        let friendsInRoom = [];
        let roomMemberships = Object.values(this.props.state.roomMemberships);
        for (let i = 0; i < friends.length; i++) {
            for (let j = 0; j < roomMemberships.length; j++) {
                if (roomMemberships[j].room_id === this.props.state.session.activeRoom && roomMemberships[j].user_id === friends[i].id) {
                    friendsInRoom.push(friends[i].id);
                }
            }
        }
        let friendsNotInRoom = [];
        for (let i = 0; i < friends.length; i++) {
            let member = false;
            for (let j = 0; j < friendsInRoom.length; j++) {
                if (friends[i].id === friendsInRoom[j]) {
                    member = true
                }
            }
            if (member === false) {
                friendsNotInRoom.push(friends[i]);
            }
        }
        console.log('friendsNotInRoom', friendsNotInRoom)
        let friendProfileInRoom = false;
        for (let i = 0; i < friendsNotInRoom.length; i++) {
            if (friendsNotInRoom[i].id === this.props.friendId) {
                friendProfileInRoom = true;
            }
        }
        let users = Object.values(this.props.state.users);
        for (let i = 0; i < users.length; i++) {
            if (!friendProfileInRoom && users[i].id === this.props.friendId) {
                friendsNotInRoom.push(users[i]);
            }
        }
        return friendsNotInRoom.map(friend => {
            return (<div key={friend.id} onClick={() => this.addFriendToRoom(friend.id)} >{friend.name}</div>)
        })
    }

    removeFromRoom() {
        // console.log(this);
        let memberships = Object.values(this.props.state.roomMemberships);
        let myMembership = 0;
        memberships.map((membership) => {
            if (membership.user_id === this.props.state.session.id && membership.room_id === this.props.state.session.activeRoom) {
                myMembership = membership.id;
            }
        })
        console.log(myMembership);
        return (
            <div className="chat-btn" onClick={() => this.props.deleteRoomMembership(myMembership)}>LEAVE ROOM</div>
        )
        // this.props.deleteRoomMembership(myMembership);
    }

    showControls() {

        console.log(this.props.state.rooms[this.props.state.session.activeRoom].title);
        return (<div className="room-controls">
            <h2>{this.props.state.rooms[this.props.state.session.activeRoom].title} Controls:</h2>
            <p>Invite a friend:</p>
            {this.showFriends()}
            {this.removeFromRoom()}
        </div>)
    }

    render() {
        // this.determineFriends();
        console.log(this);
        return (
            <div className="single-room">
                {this.showControls()}
                <MessagesAreaContainer />
            </div>
        )
    }
}

export default SingleRoom;