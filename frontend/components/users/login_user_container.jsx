import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LogInForm from './login_form';

const mSTP = state => ({
    user: {
        email: '',
        password: ''
    },
    formtype: 'Login User'
});

const mDTP = dispatch => ({
    action: (user) => dispatch(login(user))
});

export default connect(mSTP, mDTP)(LogInForm);