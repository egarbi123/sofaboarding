import { connect } from 'react-redux';
import MessagesArea from './messages_area';
import { fetchMessages, receiveMessage, newMessage } from '../../actions/chat_actions';

const mSTP = state => ({
    activeRoom: state.session.activeRoom,
    messages: state.messages,
    state: state,
    message: {
        body: '',
        room_id: state.session.activeRoom,
        user_id: state.session.id
    }
});

const mDTP = dispatch => ({
    fetchMessages: (room_id) => dispatch(fetchMessages(room_id)),
    receiveMessage: (message) => dispatch(receiveMessage(message)),
    newMessage: (message) => dispatch(newMessage(message))
});

export default connect(mSTP, mDTP)(MessagesArea);