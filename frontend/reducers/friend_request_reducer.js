import {
    RECEIVE_FRIEND_REQUEST,
    RECEIVE_ALL_FRIEND_REQUESTS,
    REMOVE_FRIEND_REQUEST
} from '../actions/friendship_actions';

const friendRequestReducer = (oldState = {}, action) => {
    Object.freeze(oldState);

    switch (action.type) {
        case RECEIVE_FRIEND_REQUEST:
            // console.log(action);
            return Object.assign({}, oldState, action.requests);
        case RECEIVE_ALL_FRIEND_REQUESTS:
            // console.log(action);
            return Object.assign({}, oldState, action.requests);
        case REMOVE_FRIEND_REQUEST:
            return Object.assign({}, oldState, action.request)
        default:
            return oldState;
    }
}

export default friendRequestReducer;