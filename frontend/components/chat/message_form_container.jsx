import { connect } from 'react-redux';
import MessageForm from './message_form';
import { newMessage } from '../../actions/chat_actions';

const mSTP = state => ({
    message: {
        body: '',
        room_id: state.session.activeRoom,
        user_id: state.session.id
    },
    activeRoom: state.session.activeRoom,
    formtype: 'New Message'
}
);

const mDTP = dispatch => ({
    action: message => dispatch(newMessage(message))
});

export default connect(mSTP, mDTP)(MessageForm);