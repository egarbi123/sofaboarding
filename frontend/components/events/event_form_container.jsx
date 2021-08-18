import { connect } from 'react-redux';
import EventForm from './event_form';
import { createEvent, createEventMembership } from '../../actions/event_actions';

const mSTP = state => ({
    state: state
})

const mDTP = dispatch => ({
    createEvent: (event) => dispatch(createEvent(event)),
    createEventMembership: (membership) => dispatch(createEventMembership(membership)),
})

export default connect(mSTP, mDTP)(EventForm);