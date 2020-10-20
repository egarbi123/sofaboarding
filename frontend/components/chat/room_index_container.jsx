import { connect } from 'react-redux';
import RoomIndex from './room_index';
import { fetchRooms } from '../../actions/chat_actions';

const mSTP = state => ({
    state: state
})

const mDTP = dispatch => ({
    fetchRooms: () => dispatch(fetchRooms())
})

export default connect(mSTP, mDTP)(RoomIndex);