import { connect } from 'react-redux';
import UserForm from './user_form';
import { signup } from '../../actions/session_actions';

const mSTP = state => ({
    user: {
        name: '',
        email: '',
        password: ''
    },
    formtype: 'Create User'
});

const mDTP = dispatch => ({
    action: user => dispatch(signup(user))
});

export default connect(mSTP, mDTP)(UserForm);