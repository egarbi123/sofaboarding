import { connect } from 'react-redux';
import EventForm from './event_form';
import { createEvent } from '../../actions/event_actions';

const mSTP = state => ({
    state: state
})

const mDTP = dispatch => ({
    createEvent: (event) => dispatch(createEvent(event)),
})

export default connect(mSTP, mDTP)(EventForm);