import { connect } from 'react-redux';
import MessageForm from './message_form';
import { newMessage } from '../../actions/chat_actions';

const mSTP = state => {
    console.log('container', state)
    return {
    message: {
        body: '',
        room_id: 2,
        user_id: 1
    },
    formtype: 'New Message'
}};

const mDTP = dispatch => ({
    action: message => dispatch(newMessage(message))
});

export default connect(mSTP, mDTP)(MessageForm);