import React from 'react';

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.message
        this.createSocket = this.createSocket.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.createSocket();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.chats.create(this.state.room_id, this.state.user_id, this.state.body);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            this.handleSubmit(e)
        }
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    createSocket() {
        let room_id = this.props.activeRoom;
        this.cable = ActionCable.createConsumer('wss://' + window.location.host + '/cable');
        this.chats = this.cable.subscriptions.create({
            channel: 'RoomsChannel',
            room_id: room_id
        }, {
            connected: () => {},
            create: function(currentRoomId, currentUserId, messageBody) {
                this.perform('create', {
                    body: messageBody,
                    room_id: currentRoomId,
                    user_id: currentUserId
                });
            }
        });
    }

    render() {
        return (
            <div>
                <h4>{this.props.formtype}</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>Message
                        <input
                            type="text"
                            value={this.state.body}
                            onChange={this.update('body')}
                        />
                    </label>
                    <button type='submit' className='button' value={this.props.formtype}></button>
                </form>
            </div>
        )
    }
}

export default MessageForm;
