import { connect } from 'react-redux';
import ChatBlock from './chat_block';
// import { createRoom } from '../../actions/chat_actions';
import { fetchAllFriendships } from '../../actions/friendship_actions';
import { fetchRooms, makeActiveRoom, clearRoomMessages, createRoom, fetchRoomMemberships, createRoomMembership, deleteRoomMembership } from '../../actions/chat_actions';


const mSTP = state => ({
    // room: {
    //     title: ''
    // },
    // formtype: 'Create Room'
    state: state
});

const mDTP = dispatch => ({
    fetchAllFriendships: () => dispatch(fetchAllFriendships()),
    fetchRooms: () => dispatch(fetchRooms()),
    setActiveRoom: (roomId) => dispatch(makeActiveRoom(roomId)),
    clearMessages: () => dispatch(clearRoomMessages()),
    createRoom: (room) => dispatch(createRoom(room)),
    fetchRoomMemberships: () => dispatch(fetchRoomMemberships()),
    createRoomMembership: (membership) => dispatch(createRoomMembership(membership)),
    deleteRoomMembership: (membershipId) => dispatch(deleteRoomMembership(membershipId))
});

export default connect(mSTP, mDTP)(ChatBlock);