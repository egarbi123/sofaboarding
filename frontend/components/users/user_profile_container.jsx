import { connect } from 'react-redux';
import UserProfile from './user_profile';
import { fetchUsers } from '../../actions/user_actions';

const mSTP = state => ({
    state
})

const mDTP = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mSTP, mDTP)(UserProfile);