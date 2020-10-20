import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';

const _nullSession = {
    id: null,
}

const sessionReducer = (oldState = _nullSession, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            console.log('in sessionReducer, action:', action)
            return Object.assign({}, oldState, { id: action.user.id });
        case LOGOUT_CURRENT_USER:
            return Object.assign({}, oldState, _nullSession);
        default:
            return oldState;
    }
}

export default sessionReducer;