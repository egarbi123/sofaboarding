import {
    RECEIVE_FRIENDSHIP,
    RECEIVE_ALL_FRIENDSHIPS
} from '../actions/friendship_actions';

const friendshipReducer = (oldState = {}, action) => {
    Object.freeze(oldState);

    switch (action.type) {
        case RECEIVE_FRIENDSHIP:
            return Object.assign({}, oldState, action.friendship);
        case RECEIVE_ALL_FRIENDSHIPS:
            return Object.assign({}, oldState, action.friendships);
        default:
            return oldState;
    }
}

export default friendshipReducer;