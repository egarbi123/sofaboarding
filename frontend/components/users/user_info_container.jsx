import { connect } from 'react-redux';
import UserInfo from './user_info';
import { fetchUsers, updateUser, createBio, updateBio, fetchBio } from '../../actions/user_actions';

const mSTP = state => ({
    state: state
});

const mDTP = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
    updateUser: (user) => dispatch(updateUser(user)),
    createBio: (profileBio) => dispatch(createBio(profileBio)),
    updateBio: (profileBio) => dispatch(updateBio(profileBio)),
    fetchBio: (profileBio) => dispatch(fetchBio(profileBio))
})

export default connect(mSTP, mDTP)(UserInfo);