import { connect } from 'react-redux';
import MessagesArea from './messages_area';
import { fetchMessages } from '../../actions/chat_actions';

const mSTP = state => ({
    activeRoom: state.chat.activeRoom,
    messages: state.chat.messages,
});

const mDTP = dispatch => ({
    fetchMessages: (room_id) => dispatch(fetchMessages(room_id))
});

export default connect(mSTP, mDTP)(MessagesArea);