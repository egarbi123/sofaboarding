import {
    RECEIVE_ALL_EVENTS,
    REMOVE_EVENT,
    CREATE_EVENT
} from '../actions/event_actions';

const _nullEvent = {

}

const eventReducer = (oldState = _nullEvent, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_ALL_EVENTS:
            return Object.assign({}, oldState, action.events);
        case REMOVE_EVENT:
            return Object.assign({}, oldState, action.event.events);
        case CREATE_EVENT:
            return Object.assign({}, oldState, action.event.events);
        default:
            return oldState;
    }
}

export default eventReducer;