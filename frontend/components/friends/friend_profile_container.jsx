import { connect } from 'react-redux';
// import FriendProfile from './friend_profile';
import FriendProfile from './test_friend_profile';
import { sendFriendRequest, createFriendship, deleteFriendRequest, fetchAllFriendships, fetchAllRequests } from '../../actions/friendship_actions';
import { fetchUsers, fetchBio } from '../../actions/user_actions';
import { deleteFriendship } from '../../actions/friendship_actions';


const mSTP = state => ({
    state
});

const mDTP = dispatch => ({
    sendFriendRequest: (friendId) => dispatch(sendFriendRequest(friendId)),
    createFriendship: (friendship) => dispatch(createFriendship(friendship)),
    deleteFriendRequest: (requestId) => dispatch(deleteFriendRequest(requestId)),
    fetchAllRequests: () => dispatch(fetchAllRequests()),
    fetchAllFriendships: () => dispatch(fetchAllFriendships()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchBio: () => dispatch(fetchBio()),
    deleteFriendship: (friendshipId) => dispatch(deleteFriendship(friendshipId)),
});

export default connect(mSTP, mDTP)(FriendProfile);