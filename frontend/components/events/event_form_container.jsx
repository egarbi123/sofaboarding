import { connect } from 'react-redux';
import EventForm from './event_form';
import { fetchAllEvents, createEvent, createEventMembership } from '../../actions/event_actions';

const mSTP = state => ({
    state: state
})

const mDTP = dispatch => ({
    createEvent: (event) => dispatch(createEvent(event)),
    createEventMembership: (membership) => dispatch(createEventMembership(membership)),
    fetchAllEvents: () => dispatch(fetchAllEvents()),
})

export default connect(mSTP, mDTP)(EventForm);