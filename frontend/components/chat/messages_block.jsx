import React from 'react';
// import RoomIndexContainer from './room_index_container';
// import RoomFormContainer from './room_form_container';
import MessagesAreaContainer from './messages_area_container';
import MessageFormContainer from './message_form_container';

class MessagesBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                {/* <RoomIndexContainer />
                <RoomFormContainer /> */}
                <MessagesAreaContainer />
                <MessageFormContainer />
            </div>
        )
    }
}

export default MessagesBlock;