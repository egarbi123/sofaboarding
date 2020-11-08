import { connect } from 'react-redux';
import ChatBlock from './chat_block';
// import { createRoom } from '../../actions/chat_actions';

const mSTP = state => ({
    // room: {
    //     title: ''
    // },
    // formtype: 'Create Room'
    state: state
});

const mDTP = dispatch => ({
    // action: room => dispatch(createRoom(room))
});

export default connect(mSTP, mDTP)(ChatBlock);