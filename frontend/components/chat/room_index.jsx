import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../../constants/chat_constants';
import roomForm from './room_form';
import messagesArea from './messages_area';
import Cable from './cable';


class RoomIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeRoom: null };
        this.handleReceivedRoom = this.handleReceivedRoom.bind(this);
        this.handleReceivedMessage = this.handleReceivedMessage.bind(this);
    }

    componentDidMount() {
        console.log('in compDidMount')
        this.props.fetchRooms();
        console.log('this.props, ', this.props);
    }

    handleClick(id) {
        this.setState({ activeRoom: id });
    }

    handleReceivedRoom(response) {
        const { room } = response;
        this.setState({
            rooms: [...this.state.rooms, room]
        })
    }

    handleReceivedMessage(response) {
        const { message } = response;
        const rooms = [this.props.state.rooms];
        const room = rooms.find(
            room => room.id === message.room_id
        );
        room.messages = [...room.messages, message];
        this.setState({ rooms });
    }

    render() {
        console.log('in render', this.props);
        const rooms = this.props.state.chat;
        // console.log('rooms', rooms)
        return (
            <div>
                In Room_Index
                <ActionCable
                    room={{ room: 'RoomsChannel' }}
                    onReceived={this.handleReceivedRoom}
                />
                {this.props.state.chat.length ? (
                    <Cable
                        rooms={rooms}
                        handleReceivedMessage={this.handleReceivedMessage}
                    />
                ) : null}
                <h2>Rooms:</h2>
                {/* <ul>{this.mapRooms(rooms, this.handleClick)}</ul> */}
            </div>
        )
    }

    findActiveRoom(rooms, activeRoom) {
        return rooms.find(
            room => room.id === activeRoom
        );
    }

    mapRooms(rooms, handleClick) {
        return rooms.map(room => {
            return (
                <li key={room.id} onClick={() => handleClick(room.id)}>
                    {room.title}
                </li>
            );
        });
    }
}

export default RoomIndex;