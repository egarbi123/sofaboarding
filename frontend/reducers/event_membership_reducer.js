import {
    RECEIVE_ALL_EVENT_MEMBERSHIPS
} from '../actions/event_actions';

const eventMembershipReducer = (oldState = {}, action) => {
    Object.freeze(oldState);

    switch (action.type) {
        case RECEIVE_ALL_EVENT_MEMBERSHIPS:
            return Object.assign({}, oldState, action.memberships);
        default:
            return oldState;
    }
}

export default eventMembershipReducer;