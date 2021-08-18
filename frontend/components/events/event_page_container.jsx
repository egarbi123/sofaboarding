import { connect } from 'react-redux';
import EventPage from './event_page';
import { fetchAllEvents, deleteEvent, createEventMembership, fetchEventMemberships } from '../../actions/event_actions';

const mSTP = state => ({
    state: state
})

const mDTP = dispatch => ({
    fetchAllEvents: () => dispatch(fetchAllEvents()),
    deleteEvent: (id) => dispatch(deleteEvent(id)),
    createEventMembership: (eventId) => dispatch(createEventMembership(eventId)),
    fetchEventMemberships: () => dispatch(fetchEventMemberships())
})

export default connect(mSTP, mDTP)(EventPage);