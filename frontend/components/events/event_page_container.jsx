import { connect } from 'react-redux';
import EventPage from './event_page';

const mSTP = state => ({
    state: state
})

const mDTP = dispatch => ({

})

export default connect(mSTP, mDTP)(EventPage);