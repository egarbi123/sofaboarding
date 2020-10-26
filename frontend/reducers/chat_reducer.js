import { RECEIVE_ROOMS, CREATE_ROOM, RECEIVE_MESSAGE, CHANGE_ROOM, RECEIVE_MESSAGES } from '../actions/chat_actions';

const _nullSession = {
    rooms: null,
    activeRoom: null,
    messages: []
}

const chatReducer = (oldState = _nullSession, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_ROOMS:
            return Object.assign({}, oldState, { rooms: action.rooms });
            // return Object.assign({}, oldState, { chat: { rooms: action.rooms } });
        case CHANGE_ROOM:
            return Object.assign({}, oldState, { activeRoom: action.roomId });
        case CREATE_ROOM:
            console.log(action)
            return Object.assign({}, oldState, { rooms: action.room });
            // return Object.assign({}, oldState, { chat: { rooms: action.rooms } });
        case RECEIVE_MESSAGE:
            return Object.assign({}, oldState, { messages: action.message });
        case RECEIVE_MESSAGES:
            return Object.assign({}, oldState, { messages: action.messages });
        default:
            return oldState;
    }
}

export default chatReducer;