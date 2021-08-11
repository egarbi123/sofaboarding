import { connect } from 'react-redux';
import Events from './events';
import { fetchAllEvents, deleteEvent } from '../../actions/event_actions';

const mSTP = state => ({
    state: state
})

const mDTP = dispatch => ({
    fetchAllEvents: () => dispatch(fetchAllEvents()),
    deleteEvent: (id) => dispatch(deleteEvent(id))
})

export default connect(mSTP, mDTP)(Events);