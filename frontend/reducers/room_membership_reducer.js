import {
    RECEIVE_ALL_ROOM_MEMBERSHIPS,
    RECEIVE_ROOM_MEMBERSHIP,
    REMOVE_ROOM_MEMBERSHIP,
    CREATE_ROOM
} from '../actions/chat_actions';

const roomMembershipReducer = (oldState = {}, action) => {
    Object.freeze(oldState);

    switch (action.type) {
        case RECEIVE_ALL_ROOM_MEMBERSHIPS:
            return Object.assign({}, oldState, action.memberships);
        case RECEIVE_ROOM_MEMBERSHIP:
            return Object.assign({}, oldState, action.membership);
        case REMOVE_ROOM_MEMBERSHIP:
            return Object.assign({}, oldState, action.membershipId);
        case CREATE_ROOM:
            return Object.assign({}, oldState, action.room.memberships);
        default:
            return oldState;
    }
}

export default roomMembershipReducer;