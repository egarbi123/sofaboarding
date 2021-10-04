import React from 'react';
import MessagesBlock from './messages_block';
import MessagesAreaContainer from './messages_area_container';


class NewChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": "",
            "roomIds": [],
            "friends": [],
            "activeRoom": 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteMembership = this.deleteMembership.bind(this);
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
    
    mapRooms(rooms, handleClick, roomIds) {
        return rooms.map(room => {
            if (room && roomIds.includes(room.id)) {
                return (
                    <div className="room" key={room.id}>
                        <div className="room-name" key={room.id} onClick={() => handleClick(room.id)}>
                            <p key={room.id}>
                                {room.title}
                            </p>
                        </div>
                    </div>
                )
            }
        });
    }
    
    handleClick(roomId) {
        if (this.state.activeRoom !== roomId) {
            this.props.clearMessages();
        }
        this.props.setActiveRoom(roomId);
        this.setState({ activeRoom: roomId})
    }
    
    handleSubmit(e) {
        e.preventDefault();
        let object = { "title": this.state.title };
        this.props.createRoom(object);
        this.setState({ "title": '' });
    }
    
    showRoom() {
        if (this.props.state.session.activeRoom && this.state.activeRoom > 0) {
            return (
                <div className="section-border">
                    <div className="single-room">
                        {this.showControls()}
                        <MessagesAreaContainer />
                    </div>
                </div>
            )
        }
    }
    
    showControls() {
        let chatters = [];
        let memberships = Object.values(this.props.state.roomMemberships);
        memberships.map(member => {
            if (member.room_id === this.props.state.session.activeRoom) {
                chatters.push(this.props.state.users[member.user_id].name);
            }
        })
        return (
            <div className="room-controls">
                {/* <h2>{this.props.state.rooms[this.props.state.session.activeRoom].title} controls</h2> */}
                <h4>PARTICIPANTS</h4>
                {chatters.map((names) => (<div className="room-user" key={names}>{names}</div>))}
                <h4>INVITE FRIENDS</h4>
                {this.showFriends()}
                {this.removeFromRoom()}
            </div>
        )
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
            return (<div className="room-user pointer" key={friend.id} onClick={() => this.addFriendToRoom(friend.id)} >{friend.name}</div>)
        })
    }
    
    addFriendToRoom(friendId) {
        let object = {
            "user_id": friendId,
            "room_id": this.props.state.session.activeRoom
        };
        this.props.createRoomMembership(object);
    }
    
    removeFromRoom() {
        let memberships = Object.values(this.props.state.roomMemberships);
        let myMembership = 0;
        let roomId = 0;
        
        memberships.map((membership) => {
            if (membership.user_id === this.props.state.session.id && membership.room_id === this.props.state.session.activeRoom) {
                myMembership = membership.id;
                roomId = membership.room_id;
            }
        })
        return (
            <div className="chat-leave-btn" onClick={() => this.deleteMembership(myMembership, roomId)}>LEAVE ROOM</div>
            )
    }
    
    deleteMembership(myMembership, roomId) {
        this.props.deleteRoomMembership(myMembership);
        let roomIds = [];
        this.state.roomIds.map(id => { if (id !== roomId) { roomIds.push(id) }});
        console.log(roomIds);
        console.log(this);
        this.setState({ "roomIds": roomIds, activeRoom: 0 });
        console.log(this);
    }
    
    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    render() {
        let rooms = [];
        if (this.props.state.rooms) {
            rooms = Object.values(this.props.state.rooms);
        }
        return (
            <div className="roomIndex">
                <div className="room-index-cont">
                    <h3>CHAT ROOMS</h3>
                    <div className="roomBox">
                        {this.mapRooms(rooms, this.handleClick, this.state.roomIds)}
                    </div>
                    <form className="room-form" onSubmit={this.handleSubmit}>
                        <input className="room-input"
                            type="text"
                            value={this.state.title}
                            onChange={this.update('title')}
                        />
                        <button type='submit' className='chat-btn button'>CREATE</button>
                    </form>
                </div>
                {this.showRoom()}
            </div>
        )
    }
}

export default NewChat;