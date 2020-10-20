import { connect } from 'react-redux';
import UserForm from './user_form';
import { login } from '../../actions/session_actions';

const mSTP = state => ({
    user: {
        name: '',
        email: '',
        password: ''
    },
    formtype: 'Login User'
});

const mDTP = dispatch => ({
    action: (user) => dispatch(login(user))
});

export default connect(mSTP, mDTP)(UserForm);