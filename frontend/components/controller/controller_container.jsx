import { connect } from 'react-redux';
import Controller from './controller';
import { fetchUsers } from '../../actions/user_actions';

// import { logout } from '../../actions/session_actions';

const mSTP = state => ({
    state: state
});

const mDTP = dispatch => ({
    // logout: () => dispatch(logout())
    fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mSTP, mDTP)(Controller);