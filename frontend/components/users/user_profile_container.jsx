import { connect } from 'react-redux';
import UserProfile from './user_profile';
import { fetchAllRequests, fetchAllFriendships } from '../../actions/friendship_actions';

const mSTP = state => ({
    state
})

const mDTP = dispatch => ({
    fetchAllRequests: () => dispatch(fetchAllRequests()),
    fetchAllFriendships: () => dispatch(fetchAllFriendships())
})

export default connect(mSTP, mDTP)(UserProfile);