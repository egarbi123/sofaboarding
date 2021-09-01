import { connect } from 'react-redux';
import SignUpForm from './sign_up_form';
import { signup, login } from '../../actions/session_actions';

const mSTP = state => ({
    state: state
});

const mDTP = dispatch => ({
    signup: user => dispatch(signup(user)),
    login: user => dispatch(login(user))
});

export default connect(mSTP, mDTP)(SignUpForm);