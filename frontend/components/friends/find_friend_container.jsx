import { connect } from 'react-redux';
import FindFriends from './find_friend';
import { fetchUsers } from '../../actions/user_actions';

const mSTP = state => ({
    state: state
});

const mDTP = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mSTP, mDTP)(FindFriends);