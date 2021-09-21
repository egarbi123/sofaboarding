import React from 'react';
import MessagesBlock from './messages_block';

class RoomIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": "",
            "roomIds": []
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
    }

    componentDidUpdate() {
        this.determineRooms();
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

    handleClick(roomId) {
        this.props.clearMessages();
        this.props.setActiveRoom(roomId);
    }

    handleSubmit(e) {
        e.preventDefault();
        let object = { "title": this.state.title };
        this.props.createRoom(object);
        this.setState({ "title": ''});
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
        let rooms = [];
        if (this.props.state.rooms) {
            rooms = Object.values(this.props.state.rooms);
        } 

        console.log(this);

        return (
            <div className="roomIndex">
                <h3>CHAT ROOMS</h3>                
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
            </div>
        )
    }
}

export default RoomIndex;