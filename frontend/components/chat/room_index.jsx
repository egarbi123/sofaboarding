import React from 'react';
import MessagesBlock from './messages_block';

class RoomIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.room;
        this.rooms = []
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchRooms();
        this.props.fetchRoomMemberships();
    }

    componentDidUpdate() {
        if (this.props.state.rooms) {
            this.rooms = Object.values(this.props.state.rooms);
        } 
    }

    // makeRoomMembership(room_id) {
    //     console.log(room_id);
    //     let user_id = this.props.state.session.id;
    //     let object = { user_id: user_id, room_id: room_id };
    //     this.props.createRoomMembership(object);
    // }
    
    // removeRoomMembership() {
    //     // this.props.deleteRoomMembership(2)
    // }

    handleClick(roomId) {
        this.props.clearMessages();
        this.props.setActiveRoom(roomId);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this)
        this.props.createRoom(this.state);
        this.setState({ title: '' });
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

    render() {
        console.log(this);
        if (this.props.state.rooms) {
            this.rooms = Object.values(this.props.state.rooms);
        } 
        if (this.props.state.roomMemberships) {
            this.memberships = Object.values(this.props.state.roomMemberships)
        }
        let roomIds = [];
        for (let i = 0; i < this.memberships.length; i++) {
            if (this.memberships[i].user_id === this.props.state.session.id) {
                roomIds.push(this.memberships[i].room_id);
            }
        }
        // check for friendIds
        // let specificRoomIds = [];
        // if (this.props.friendId) {
        //     for (let j = 0; j < roomIds.length; j++) {
        //         for (let i = 0; i < this.memberships.length; i++) {
        //             if (this.memberships[i].room_id === roomIds[j] && this.memberships[i].user_id === this.props.friendId) {
        //                 specificRoomIds.push(this.memberships[i].room_id);
        //             }
        //         }
        //     }
        // } else {
        //     specificRoomIds = roomIds;
        // }

        
        return (
            <div className="roomIndex">
                <h2>Chat Rooms:</h2>                
                <div className="roomBox">
                    {this.mapRooms(this.rooms, this.handleClick, roomIds)}
                    <form onSubmit={this.handleSubmit}>
                        <input className="room-input"
                            type="text"
                            value={this.state.title}
                            onChange={this.update('title')}
                        />
                        <button type='submit' className='chat-btn'>CREATE</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default RoomIndex;