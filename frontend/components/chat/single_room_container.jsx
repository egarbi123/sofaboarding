import { connect } from 'react-redux';
import SingleRoom from './single_room';
import { createRoomMembership, deleteRoomMembership } from '../../actions/chat_actions';

const mSTP = state => ({
    state
});

const mDTP = dispatch => ({
    createRoomMembership: (membership) => dispatch(createRoomMembership(membership)),
    deleteRoomMembership: (membershipId) => dispatch(deleteRoomMembership(membershipId)),
});

export default connect(mSTP, mDTP)(SingleRoom);