import React from 'react';
import RoomIndexContainer from './room_index_container';
import RoomFormContainer from './room_form_container';
import MessagesAreaContainer from './messages_area_container';

function ChatBlock() {
    return (
        <div>
            <RoomIndexContainer />
            <RoomFormContainer />
            <MessagesAreaContainer />
        </div>
    )
}

export default ChatBlock;