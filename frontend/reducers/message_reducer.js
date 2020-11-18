import {
    RECEIVE_MESSAGE,
    RECEIVE_MESSAGES,
    CLEAR_ROOM_MESSAGES
} from '../actions/chat_actions';

const _nullSession = {

};

const messageReducer = (oldState = _nullSession, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_MESSAGES:
            return Object.assign({}, oldState, action.messages);
        case RECEIVE_MESSAGE:
            return Object.assign({}, oldState, {
                [action.message.id]: action.message
            });
        case CLEAR_ROOM_MESSAGES:
            return Object.assign({}, _nullSession);
        default:
            return oldState;
    }
}

export default messageReducer;