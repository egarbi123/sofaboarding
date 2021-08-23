import { connect } from 'react-redux';
import Controller from './controller';
import { fetchUsers } from '../../actions/user_actions';
import { fetchAllFriendships, fetchAllRequests } from '../../actions/friendship_actions';


// import { logout } from '../../actions/session_actions';

const mSTP = state => ({
    state: state
});

const mDTP = dispatch => ({
    // logout: () => dispatch(logout())
    fetchUsers: () => dispatch(fetchUsers()),
    fetchAllFriendships: () => dispatch(fetchAllFriendships()),
    fetchAllRequests: () => dispatch(fetchAllRequests())
});

export default connect(mSTP, mDTP)(Controller);