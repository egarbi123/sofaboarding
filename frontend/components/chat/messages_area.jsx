import React from 'react';
import ActionCable from 'actioncable';
// import MessageForm from './message_form_container';

class MessagesArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRoom: null
        }
        console.log('this.props- messagesArea', this.props )
    }

    componentDidMount() {
        console.log('in componentD, MessagesArea')
        // this.props.fetchMessages(2);
        if (this.props.activeRoom) {
            this.setState({
                activeRoom: this.props.activeRoom
            })
        }
        this.getMessages();
    }

    componentDidUpdate(previousProps) {
        if (previousProps.activeRoom !== this.props.activeRoom) {
            this.setState({
                activeRoom: this.props.activeRoom
            })
        }
    }

    createSocket() {

    }

    getMessages() {
        console.log('in get messages-this.props', this.props);
        if (this.state.activeRoom !== null) {
            this.props.fetchMessages(this.state.activeRoom);
        }
        // if (!this.props.state.chat.activeRoom) {
        // } else {
        //     console.log('in getMessages for messagesArea')
        //     this.props.fetchMessages(this.props.state.chat.activeRoom);
        // }
    }

    organizeMessages(messages) {
        let outputMessages = [];

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
        console.log('messagesArea this.props', this.props)
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