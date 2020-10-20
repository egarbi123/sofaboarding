import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import sessionReducer from './session_reducer';
import chatReducer from './chat_reducer';

const RootReducer = combineReducers({
    users: usersReducer,
    session: sessionReducer,
    chat: chatReducer
});

export default RootReducer;