import { connect } from 'react-redux';
import RoomForm from './room_form';
import { createRoom } from '../../actions/chat_actions';

const mSTP = state => ({
    room: {
        title: ''
    },
    formtype: 'Create Room'
});

const mDTP = dispatch => ({
    action: room => dispatch(createRoom(room))
});

export default connect(mSTP, mDTP)(RoomForm);