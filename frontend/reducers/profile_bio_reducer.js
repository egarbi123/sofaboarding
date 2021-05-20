import {
    RECEIVE_BIO
} from '../actions/user_actions';

const bioReducer = (oldState = {}, action) => {
    Object.freeze(oldState);

    switch (action.type) {
        case RECEIVE_BIO:
            return Object.assign({}, oldState, action.bio);
        default:
            return oldState;
    }
}

export default bioReducer;