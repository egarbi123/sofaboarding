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
            // console.log('action.rooms', action.rooms)
            return Object.assign({}, oldState, action.rooms);
            // return Object.assign({}, oldState, { chat: { rooms: action.rooms } });
        case CREATE_ROOM:
            // console.log(action)
            return Object.assign({}, oldState, {
                [action.room.roomId]: action.room
            });
            // return Object.assign({}, oldState, { chat: { rooms: action.rooms } });
        default:
            return oldState;
    }
}

export default roomReducer;