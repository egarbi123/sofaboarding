import React from 'react';
import ActionCable from 'actioncable';
import MessageForm from './message_form_container';

class MessagesArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRoom: null
        }
        // console.log('this.props- messagesArea', this.props );
        this.createSocket = this.createSocket.bind(this);

    }

    componentDidMount() {
        // console.log('in componentD, MessagesArea')

        // this.props.fetchMessages(2);
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
        // console.log('prevProps:', previousProps);
        // console.log('this.props:', this.props)
        if (previousProps.activeRoom !== this.props.activeRoom) {
            this.setState({
                activeRoom: this.props.activeRoom
            })
            this.getMessages();
            // this.getMessages();
        };
        
        // console.log('in conmponent update:',this.props);
        // if (!!this.props.messages && this.props.messages.length === 0) {
        //     this.getMessages();
        // }

    }

    createSocket() {
        let room_id = this.props.activeRoom;
        console.log('in messages area, room_id:', room_id);
        this.cable = ActionCable.createConsumer('ws://' + window.location.host + '/cable');
        this.chats = this.cable.subscriptions.create({
            channel: 'RoomsChannel',
            room_id: room_id
        }, {
            connected: () => {},
            received: (data) => {
                console.log('DATA RECEIVED,', data);
                this.props.receiveMessage(data);
            }
        });
    }

    getMessages() {
        // console.log('in get messages-this.props', this.props);
        if (this.props.activeRoom !== null) {
            this.props.fetchMessages(this.props.activeRoom);
        }
        // if (!this.props.state.chat.activeRoom) {
        // } else {
        //     console.log('in getMessages for messagesArea')
        //     this.props.fetchMessages(this.props.state.chat.activeRoom);
        // }
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
        // console.log('messagesArea this.props', this.props)
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

// const MessagesArea = ({
//     room: { id, title, messages },
// }) => {
//     return (
//         <div className="messagesArea">
//             <h3>{title}</h3>
//             <ul>{orderedMessages(messages)}</ul>
//             <MessageFrom room_id={id} />
//         </div>
//     );
// };

// // helper

const orderedMessages = messages => {
    console.log('in orderedMessages')
    const sortedMessages = messages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    return sortedMessages.map(message => {
        return <li key={message.id}>{message.text}</li>
    })
};