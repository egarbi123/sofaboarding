import { connect } from 'react-redux';
import UserProfile from './user_profile';
import { sendFriendRequest, createFriendship, deleteFriendRequest, fetchAllFriendships, fetchAllRequests, makeActiveFriend } from '../../actions/friendship_actions';

const mSTP = state => ({
    state: state
});

const mDTP = dispatch => ({
    sendFriendRequest: (friendRequest) => dispatch(sendFriendRequest(friendRequest)),
    createFriendship: (friendship) => dispatch(createFriendship(friendship)),
    deleteFriendRequest: (requestId) => dispatch(deleteFriendRequest(requestId)),
    fetchAllRequests: () => dispatch(fetchAllRequests()),
    fetchAllFriendships: () => dispatch(fetchAllFriendships()),
    makeActiveFriend: (friendId) => dispatch(makeActiveFriend(friendId))
});

export default connect(mSTP, mDTP)(UserProfile);