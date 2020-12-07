import { connect } from 'react-redux';
import MessagesArea from './messages_area';
import { fetchMessages, receiveMessage } from '../../actions/chat_actions';

const mSTP = state => ({
    activeRoom: state.session.activeRoom,
    messages: state.messages,
    state: state
});

const mDTP = dispatch => ({
    fetchMessages: (room_id) => dispatch(fetchMessages(room_id)),
    receiveMessage: (message) => dispatch(receiveMessage(message))
});

export default connect(mSTP, mDTP)(MessagesArea);