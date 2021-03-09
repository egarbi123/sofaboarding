import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { CHANGE_ROOM } from '../actions/chat_actions';
import { SET_ACTIVE_FRIEND } from '../actions/friendship_actions';

const _nullSession = {
    id: null,
    activeRoom: null,
    friendId: null
}

const sessionReducer = (oldState = _nullSession, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            // console.log('in sessionReducer, action:', action)
            localStorage.setItem('userId', action.user.id);
            return Object.assign({}, oldState, { id: action.user.id });
        case LOGOUT_CURRENT_USER:
            localStorage.removeItem('userId');
            return Object.assign({}, oldState, { id: null });
        case CHANGE_ROOM:
            return Object.assign({}, oldState, { activeRoom: action.roomId });
        case SET_ACTIVE_FRIEND:
            return Object.assign({}, oldState, { friendId: action.friendId });
        default:
            return oldState;
    }
}

export default sessionReducer;