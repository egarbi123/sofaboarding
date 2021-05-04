import React from 'react';
import ActionCable from 'actioncable';
import MessageForm from './message_form_container';

class MessagesArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.message;
        this.createSocket = this.createSocket.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(e) {
        e.preventDefault();
        this.chats.create(this.state.room_id, this.state.user_id, this.state.body);
        this.setState({ body: ""});
    }

    handleKeyPress(e) {
        console.log(e);
        if (e.key === 'Enter' && !e.shiftKey) {
            this.handleSubmit(e)
        }
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    createSocket() {
        let room_id = this.props.activeRoom;
        if (process.env.NODE_ENV === 'development') {
            this.cable = ActionCable.createConsumer('ws://' + window.location.host + '/cable');
        } else {
            this.cable = ActionCable.createConsumer('wss://' + window.location.host + '/cable');
        }
        this.chats = this.cable.subscriptions.create({
            channel: 'RoomsChannel',
            room_id: room_id
        }, {
            connected: () => {},
            received: (data) => {
                this.props.receiveMessage(data);
            },
            create: function (currentRoomId, currentUserId, messageBody) {
                this.perform('create', {
                    body: messageBody,
                    room_id: currentRoomId,
                    user_id: currentUserId
                });
                console.log(this);
            }
        });
    }

    getMessages() {
        if (this.props.activeRoom !== null) {
            this.props.fetchMessages(this.props.activeRoom);
        }
    }

    imageRender(userId) {
        if (this.props.state.users[userId].profilePicUrl) {
            return (
                <img className="chat-pic" src={this.props.state.users[userId].profilePicUrl} />
            )
        } else {
            return (
                <img className="chat-pic" src={window.profile_pic} />
            )
        }
    }

    mapMessages(messages) {
        return messages.map(message => {
            // console.log(message)
            // console.log('messages props', this.props.state.users[message.user_id])
            let user = this.props.state.users[message.user_id];
            // console.log(user)
            if (user.id !== this.props.state.session.id) {
                return (
                    <div className="my-message" key={message.id}>
                        <div className="chat-pic-container">
                            {this.imageRender(user.id)}
                        </div>
                        <p className="bold-text">{this.props.state.users[message.user_id].name}:</p>
                        <p>{message.body}</p>
                    </div>
                )
            } else {
                return (
                    <div className="message" key={message.id}>
                        <div className="chat-pic-container">
                            {this.imageRender(user.id)}
                        </div>
                        <p>{message.body}</p>
                    </div>
                )
            }
        })
    }

    render() {
        let messages = [];
        if (this.props.messages) {
            messages = Object.values(this.props.messages);
        }
        // console.log('messages props', this.props.state.rooms)
        return (
            <div className="messageArea">
                {/* <h2>{this.props.state.rooms[this.props.activeRoom].title}</h2> */}
                <div className="messageRoom">
                    <div className="messageBox">
                        {this.mapMessages(messages)}
                    </div>
                    <h4>{this.props.formtype}</h4>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            value={this.state.body}
                            onChange={this.update('body')}
                        />
                        <button type='submit' className='chat-btn'>SEND</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default MessagesArea;
