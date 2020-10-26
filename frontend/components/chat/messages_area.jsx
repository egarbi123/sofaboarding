import React from 'react';
// import MessageForm from './message_form_container';

class MessagesArea extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('in componentD, MessagesArea')
        this.props.fetchMessages(2);
        // this.getMessages();
    }

    getMessages() {
        console.log('in get messages-this.props', this.props);
        if (this.props.state.chat.activeRoom !== null) {
            this.props.fetchMessages(2);
        }
        // if (!this.props.state.chat.activeRoom) {
        // } else {
        //     console.log('in getMessages for messagesArea')
        //     this.props.fetchMessages(this.props.state.chat.activeRoom);
        // }
    }

    render() {
        console.log('messagesArea this.props', this.props)
        return (
            <div>
                <p>in messages area</p>
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

// const orderedMessages = messages => {
//     const sortedMessages = messages.sort(
//         (a, b) => new Date(a.created_at) - new Date(b.created_at)
//     );
//     return sortedMessages.map(message => {
//         return <li key={message.id}>{message.text}</li>
//     })
// };