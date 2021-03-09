import { connect } from 'react-redux';
import RoomIndex from './room_index';
import { fetchRooms, makeActiveRoom, clearRoomMessages, createRoom, fetchRoomMemberships, createRoomMembership, deleteRoomMembership } from '../../actions/chat_actions';

const mSTP = state => ({
    state: state,
    room: {
        title: ''
    }
})

const mDTP = dispatch => ({
    fetchRooms: () => dispatch(fetchRooms()),
    setActiveRoom: (roomId) => dispatch(makeActiveRoom(roomId)),
    clearMessages: () => dispatch(clearRoomMessages()),
    createRoom: (room) => dispatch(createRoom(room)),
    fetchRoomMemberships: () => dispatch(fetchRoomMemberships()),
    createRoomMembership: (membership) => dispatch(createRoomMembership(membership)),
    deleteRoomMembership: (membershipId) => dispatch(deleteRoomMembership(membershipId))
})

export default connect(mSTP, mDTP)(RoomIndex);