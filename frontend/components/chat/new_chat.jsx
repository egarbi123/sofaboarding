import React from 'react';
import MessagesBlock from './messages_block';
import MessagesAreaContainer from './messages_area_container';


class NewChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": "",
            "roomIds": [],
            "friends": []
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (Object.values(this.props.state.rooms).length < 2) {
            this.props.fetchRooms();
        }
        if (Object.values(this.props.state.roomMemberships).length < 1) {
            this.props.fetchRoomMemberships();
        }
        if (Object.values(this.props.state.users).length < 2) {
            this.props.fetchUsers();
        }
    }

    componentDidUpdate() {
        this.determineRooms();
        if (this.props.state.session.activeRoom) {
            this.determineFriends();
        }
    }

    determineRooms() {
        let memberships = Object.values(this.props.state.roomMemberships);
        let myId = this.props.state.session.id;
        let roomIds = [];
        memberships.map(membership => {
            if (membership.user_id === myId) {
                roomIds.push(membership.room_id);
            }
        })
        if (this.state.roomIds.length !== roomIds.length) {
            this.setState({ "roomIds": roomIds });
        }
    }

    determineFriends() {
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
        let memberships = Object.values(this.props.state.roomMemberships);
        let alreadyInRoom = [];
        let inviteFriends = [];
        memberships.map((membership) => {
            if (membership.room_id === this.props.state.session.activeRoom) {
                alreadyInRoom.push(membership.user_id);
            }
        })
        for (let i = 0; i < friendIds.length; i++) {
            if (!alreadyInRoom.includes(friendIds[i])) {
                inviteFriends.push(friendIds[i])
            }
        }
        if (this.state.friends.length !== inviteFriends.length) {
            this.setState({ 'friends': inviteFriends });
        }
    }

    handleClick(roomId) {
        this.props.clearMessages();
        this.props.setActiveRoom(roomId);
    }

    handleSubmit(e) {
        e.preventDefault();
        let object = { "title": this.state.title };
        this.props.createRoom(object);
        this.setState({ "title": '' });
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    mapRooms(rooms, handleClick, roomIds) {
        return rooms.map(room => {
            if (room && roomIds.includes(room.id)) {
                return (
                    <div className="room" onClick={() => handleClick(room.id)} key={room.id}>
                        <p>
                            {room.title}
                        </p>
                    </div>
                )
            }
        });
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
        let memberships = Object.values(this.props.state.roomMemberships);
        let myMembership = 0;
        memberships.map((membership) => {
            if (membership.user_id === this.props.state.session.id && membership.room_id === this.props.state.session.activeRoom) {
                myMembership = membership.id;
            }
        })
        return (
            <div className="chat-btn" onClick={() => this.props.deleteRoomMembership(myMembership)}>LEAVE ROOM</div>
        )
    }

    showControls() {
        return (
            <div className="room-controls">
                <h2>{this.props.state.rooms[this.props.state.session.activeRoom].title} Controls:</h2>
                <p>Invite a friend:</p>
                {this.showFriends()}
                {this.removeFromRoom()}
            </div>
        )
    }

    showRoom() {
        if (this.props.state.session.activeRoom) {
            return (
                <div className="single-room">
                    {this.showControls()}
                    <MessagesAreaContainer />
                </div>
            )
        }
    }

    render() {
        let rooms = [];
        if (this.props.state.rooms) {
            rooms = Object.values(this.props.state.rooms);
        }
        return (
            <div className="roomIndex">
                <h2>Chat Rooms:</h2>
                <div className="roomBox">
                    {this.mapRooms(rooms, this.handleClick, this.state.roomIds)}
                    <form onSubmit={this.handleSubmit}>
                        <input className="room-input"
                            type="text"
                            value={this.state.title}
                            onChange={this.update('title')}
                        />
                        <button type='submit' className='chat-btn'>CREATE</button>
                    </form>
                </div>
                {this.showRoom()}
            </div>
        )
    }
}

export default NewChat;