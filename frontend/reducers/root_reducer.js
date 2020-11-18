import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import sessionReducer from './session_reducer';
import roomReducer from './room_reducer';
import messageReducer from './message_reducer';

const RootReducer = combineReducers({
    users: usersReducer,
    session: sessionReducer,
    rooms: roomReducer,
    messages: messageReducer
});

export default RootReducer;