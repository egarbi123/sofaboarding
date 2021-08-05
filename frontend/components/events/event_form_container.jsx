import { connect } from 'react-redux';
import EventForm from './event_form';

const mSTP = state => ({
    state: state
})

const mDTP = dispatch => ({

})

export default connect(mSTP, mDTP)(EventForm);