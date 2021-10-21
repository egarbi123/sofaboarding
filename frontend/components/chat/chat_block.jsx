import React from 'react';
import NewChatContainer from './new_chat_container';

class ChatBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    showIndex() {
        return this.props.friendId ?
            <NewChatContainer friendId={this.props.friendId} /> :
            <NewChatContainer />
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