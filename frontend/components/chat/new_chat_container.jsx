import { connect } from 'react-redux';
import NewChat from './new_chat';
import { fetchRooms, makeActiveRoom, clearRoomMessages, createRoom, fetchRoomMemberships, createRoomMembership, deleteRoomMembership } from '../../actions/chat_actions';
import { fetchUsers } from '../../actions/user_actions'

const mSTP = state => ({
    state: state
})

const mDTP = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
    fetchRooms: () => dispatch(fetchRooms()),
    setActiveRoom: (roomId) => dispatch(makeActiveRoom(roomId)),
    clearMessages: () => dispatch(clearRoomMessages()),
    createRoom: (room) => dispatch(createRoom(room)),
    fetchRoomMemberships: () => dispatch(fetchRoomMemberships()),
    createRoomMembership: (membership) => dispatch(createRoomMembership(membership)),
    deleteRoomMembership: (membershipId) => dispatch(deleteRoomMembership(membershipId))
})

export default connect(mSTP, mDTP)(NewChat);