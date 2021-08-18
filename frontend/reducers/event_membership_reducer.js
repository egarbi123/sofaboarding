import {
    RECEIVE_ALL_EVENT_MEMBERSHIPS,
    CREATE_EVENT
} from '../actions/event_actions';

const eventMembershipReducer = (oldState = {}, action) => {
    Object.freeze(oldState);

    switch (action.type) {
        case RECEIVE_ALL_EVENT_MEMBERSHIPS:
            return Object.assign({}, oldState, action.memberships);
        case CREATE_EVENT:
            return Object.assign({}, oldState, action.event.eventMemberships);
        default:
            return oldState;
    }
}

export default eventMembershipReducer;