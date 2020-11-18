import React from 'react';
import MessagesBlock from './messages_block';

class RoomIndex extends React.Component {
    constructor(props) {
        super(props);
        // this.handleReceivedRoom = this.handleReceivedRoom.bind(this);
        // this.handleReceivedMessage = this.handleReceivedMessage.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchRooms();
    }

    handleClick(roomId) {
        this.props.clearMessages();
        this.props.setActiveRoom(roomId);
        // this.setState({ activeRoom: id });

    }

    // handleReceivedRoom(response) {
    //     const { room } = response;
    //     this.setState({
    //         rooms: [...this.state.rooms, room]
    //     })
    // }

    // handleReceivedMessage(response) {
    //     const { message } = response;
    //     const rooms = [this.props.state.rooms];
    //     const room = rooms.find(
    //         room => room.id === message.room_id
    //     );
    //     room.messages = [...room.messages, message];
    //     this.setState({ rooms });
    // }
    
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
            <div>
                {/* <ActionCable
                    room={{ room: 'RoomsChannel' }}
                    onReceived={this.handleReceivedRoom}
                /> */}
                {/* {this.props.state.chat.length ? (
                    <Cable
                        rooms={rooms}
                        handleReceivedMessage={this.handleReceivedMessage}
                    />
                ) : null} */}
                {/* {this.loadRooms()} */}
                <h2>Rooms:</h2>

                <ul>{this.mapRooms(rooms, this.handleClick)}</ul>
            </div>
        )
    }
}

export default RoomIndex;