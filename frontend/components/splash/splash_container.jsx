import { connect } from 'react-redux';
import Splash from './splash';
// import { logout } from '../../actions/session_actions';

const mSTP = state => ({
    state: state
});

const mDTP = dispatch => ({
    // logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Splash);