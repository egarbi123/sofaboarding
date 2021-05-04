import {
    RECEIVE_ROOMS,
    CREATE_ROOM
} from '../actions/chat_actions';

const _nullSession = {
    rooms: null,
}

const roomReducer = (oldState = _nullSession, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_ROOMS:
            return Object.assign({}, oldState, action.rooms);
        case CREATE_ROOM:
            return Object.assign({}, oldState, action.room.rooms);
        default:
            return oldState;
    }
}

export default roomReducer;