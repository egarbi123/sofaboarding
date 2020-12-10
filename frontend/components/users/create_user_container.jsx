import { connect } from 'react-redux';
import SignUpForm from './sign_up_form';
import { signup } from '../../actions/session_actions';

const mSTP = state => ({
    user: {
        name: '',
        email: '',
        password: '',
        password2: ''
    },
    formtype: 'Create User'
});

const mDTP = dispatch => ({
    action: user => dispatch(signup(user))
});

export default connect(mSTP, mDTP)(SignUpForm);