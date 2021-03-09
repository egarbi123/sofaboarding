import { connect } from 'react-redux';
import UserInfo from './user_info';
import { fetchUsers, updateUser } from '../../actions/user_actions';

const mSTP = state => ({
    state: state
});

const mDTP = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
    updateUser: (user) => dispatch(updateUser(user))
})

export default connect(mSTP, mDTP)(UserInfo);