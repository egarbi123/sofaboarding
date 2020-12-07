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
                <div className="messageBlock">
                    <MessagesAreaContainer />
                    <MessageFormContainer />
                </div>
            )
        }
    }
    render() {
        return (
            <div className="chatBlock">
                <div className="roomBlock">
                    <RoomIndexContainer />
                    <RoomFormContainer />
                </div>
                {this.showMessages()}
                {/* <MessagesAreaContainer />
                <MessageFormContainer /> */}
            </div>
        )
    }
}

export default ChatBlock;