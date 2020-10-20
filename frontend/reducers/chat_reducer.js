import { RECEIVE_ROOMS, CREATE_ROOM, RECEIVE_MESSAGE, CHANGE_ROOM } from '../actions/chat_actions';

const _nullSession = {
    chat: null,
}

const chatReducer = (oldState = _nullSession, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_ROOMS:
            console.log('in chat reducer', action);
            return Object.assign({}, oldState, { chat: { rooms: action.rooms } });
        case CHANGE_ROOM:
            console.log('change room reducer:', action)
            return Object.assign({}, oldState, { chat: { activeRoom: action.id } })
        case CREATE_ROOM:
            return Object.assign({}, oldState, { chat: { rooms: action.rooms } });
        case RECEIVE_MESSAGE:
            return Object.assign({}, oldState, { messages: action.message })
        default:
            return oldState;
    }
}

export default chatReducer;