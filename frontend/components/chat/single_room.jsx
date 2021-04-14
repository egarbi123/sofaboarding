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
        console.log('DETERMINE:', this)
        let friendships = Object.values(this.props.state.friendships);
        let friendIds = [];
        friendships.map((friendship) => {
            if (friendship.user_id === this.props.state.session.id) {
                friendIds.push(friendship.friend_id);
            }
            if (friendship.friend_id === this.props.state.session.id) {
                friendIds.push(friendship.user_id);
            }
        })
        if (!friendIds.includes(this.props.friendId)) {
            friendIds.push(this.props.friendId);
        }
        let memberships = Object.values(this.props.state.roomMemberships)
        console.log('memberships', memberships);
        console.log('friendIds:', friendIds);
        console.log('roomId', this.props.state.session.activeRoom);

        let alreadyInRoom = [];
        let inviteFriends = [];
        memberships.map((membership) => {
            if (membership.room_id === this.props.state.session.activeRoom) {
                alreadyInRoom.push(membership.user_id);
            }
        })
        console.log(alreadyInRoom);
        for (let i = 0; i < friendIds.length; i++) {
            if (!alreadyInRoom.includes(friendIds[i])) {
                inviteFriends.push(friendIds[i])
            }
        }
        console.log('inviteFriends:', inviteFriends);
        if (this.state.friends.length !== inviteFriends.length) {
            this.setState({ 'friends': inviteFriends });
        }
        // let users = Object.values(this.props.state.users);
        // let myFriends = [];
        // users.map((user) => {
        //     if (friendIds.includes(user.id)) {
        //         myFriends.push(user);
        //     }
        // })

        // console.log('IN DETERMINE:', myFriends);

        // if (this.state.friends.length !== myFriends.length) {
        //     this.setState({'friends': myFriends});
        // }
    }

    addFriendToRoom(friendId) {
        let object = {
            "user_id": friendId,
            "room_id": this.props.state.session.activeRoom
        };
        this.props.createRoomMembership(object);
    }

    showFriends() {
        let users = Object.values(this.props.state.users);
        let friendsInRoom = [];
        for (let i = 0; i < users.length; i++) {
            if (this.state.friends.includes(users[i].id)) {
                friendsInRoom.push(users[i]);
            }
        }
        return friendsInRoom.map(friend => {
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
        // console.log(myMembership);
        return (
            <div className="chat-btn" onClick={() => this.props.deleteRoomMembership(myMembership)}>LEAVE ROOM</div>
        )
        // this.props.deleteRoomMembership(myMembership);
    }

    showControls() {

        // console.log(this.props.state.rooms[this.props.state.session.activeRoom].title);
        return (<div className="room-controls">
            <h2>{this.props.state.rooms[this.props.state.session.activeRoom].title} Controls:</h2>
            <p>Invite a friend:</p>
            {this.showFriends()}
            {this.removeFromRoom()}
        </div>)
    }

    render() {
        // this.determineFriends();
        // console.log(this);
        return (
            <div className="single-room">
                {this.showControls()}
                <MessagesAreaContainer />
            </div>
        )
    }
}

export default SingleRoom;