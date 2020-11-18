import React from 'react';
import RoomIndexContainer from './room_index_container';
import RoomFormContainer from './room_form_container';
import MessagesAreaContainer from './messages_area_container';
import MessageFormContainer from './message_form_container';

class ChatBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    showMessages() {
        if (this.props.state.session.activeRoom) {
            return (
                <div>
                    <MessagesAreaContainer />
                    <MessageFormContainer />
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                <RoomIndexContainer />
                <RoomFormContainer />
                {this.showMessages()}
                {/* <MessagesAreaContainer />
                <MessageFormContainer /> */}
            </div>
        )
    }
}

export default ChatBlock;