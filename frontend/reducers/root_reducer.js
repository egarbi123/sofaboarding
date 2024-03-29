import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import sessionReducer from './session_reducer';
import roomReducer from './room_reducer';
import messageReducer from './message_reducer';
import friendRequestReducer from './friend_request_reducer';
import friendshipReducer from './friendship_reducer';
import roomMembershipReducer from './room_membership_reducer';
import bioReducer from './profile_bio_reducer';
import eventReducer from './event_reducer';
import eventMembershipReducer from './event_membership_reducer';

const RootReducer = combineReducers({
    users: usersReducer,
    session: sessionReducer,
    rooms: roomReducer,
    messages: messageReducer,
    friendRequests: friendRequestReducer,
    friendships: friendshipReducer,
    roomMemberships: roomMembershipReducer,
    bio: bioReducer,
    event: eventReducer,
    eventMemberships: eventMembershipReducer,
});

export default RootReducer;