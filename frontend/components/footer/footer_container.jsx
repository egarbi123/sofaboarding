import { connect } from 'react-redux';
import Footer from './footer';

const mSTP = state => ({
    state: state
});

const mDTP = dispatch => ({

});

export default connect(mSTP, mDTP)(Footer);