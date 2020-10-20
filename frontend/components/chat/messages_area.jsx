import React from 'react';
import MessageForm from './message_form_container';

const MessagesArea = ({
    room: { id, title, messages },
}) => {
    return (
        <div className="messagesArea">
            <h3>{title}</h3>
            <ul>{orderedMessages(messages)}</ul>
            <MessageFrom room_id={id} />
        </div>
    );
};

export default MessagesArea;

// helper

const orderedMessages = messages => {
    const sortedMessages = messages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    return sortedMessages.map(message => {
        return <li key={message.id}>{message.text}</li>
    })
};