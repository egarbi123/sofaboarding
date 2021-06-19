import React from 'react';
import RoomIndexContainer from './room_index_container';
import SingleRoomContainer from './single_room_container';
import NewChatContainer from './new_chat_container';

class ChatBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    showRoom() {
        if (this.props.state.session.activeRoom) {
            return (
                <div className="messageBlock">
                    <SingleRoomContainer friendId={this.props.friendId}/>
                </div>
            )
        }
    }

    showIndex() {
        if (this.props.friendId) {
            return (
                <NewChatContainer friendId={this.props.friendId} />
            )
        } else {
            return <NewChatContainer />
        }
    }

    render() {
        return (
            <div className="chatBlock">
                <div className="roomBlock">
                    {this.showIndex()}
                </div>
            </div>
        )
    }
}

export default ChatBlock;