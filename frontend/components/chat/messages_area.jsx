import React from 'react';
import ActionCable from 'actioncable';
import MessageForm from './message_form_container';

class MessagesArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRoom: null
        }
        this.createSocket = this.createSocket.bind(this);

    }

    componentDidMount() {
        if (this.props.activeRoom) {
            this.setState({
                activeRoom: this.props.activeRoom,
                messages: this.props.messages
            })
        }
        this.getMessages();
        this.createSocket();
    }

    componentDidUpdate(previousProps) {
        if (previousProps.activeRoom !== this.props.activeRoom) {
            this.setState({
                activeRoom: this.props.activeRoom
            })
            this.getMessages();
        };
    }

    createSocket() {
        let room_id = this.props.activeRoom;
        this.cable = ActionCable.createConsumer('ws://' + window.location.host + '/cable');
        this.chats = this.cable.subscriptions.create({
            channel: 'RoomsChannel',
            room_id: room_id
        }, {
            connected: () => {},
            received: (data) => {
                this.props.receiveMessage(data);
            }
        });
    }

    getMessages() {
        if (this.props.activeRoom !== null) {
            this.props.fetchMessages(this.props.activeRoom);
        }
    }

    mapMessages(messages) {
        return messages.map(message => {
            return (
                <li key={message.id}>
                    {message.body}
                </li>
            )
        })
    }

    render() {
        let messages = [];
        if (this.props.messages) {
            messages = Object.values(this.props.messages);
        }
        return (
            <div>
                <p>in messages area</p>
                {this.mapMessages(messages)}
            </div>
        )
    }
}

export default MessagesArea;
