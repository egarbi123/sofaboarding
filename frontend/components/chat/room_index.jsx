import React from 'react';
import MessagesBlock from './messages_block';

class RoomIndex extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchRooms();
    }

    handleClick(roomId) {
        this.props.clearMessages();
        this.props.setActiveRoom(roomId);
    }

    mapRooms(rooms, handleClick) {
        return rooms.map(room => {
            if (room) {
                return (
                    <li key={room.id} onClick={() => handleClick(room.id)}>
                        {room.title}
                    </li>
                )
            }
        });
    }

    render() {
        let rooms = [];
        if (this.props.state.rooms) {
            rooms = Object.values(this.props.state.rooms);
        } 
        return (
            <div className="roomIndex">
                <h2>Rooms</h2>
                <ul>{this.mapRooms(rooms, this.handleClick)}</ul>
            </div>
        )
    }
}

export default RoomIndex;