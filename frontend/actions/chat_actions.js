import * as ChatApiUtil from '../util/chat_api_util';

export const RECEIVE_ROOMS = 'RECEIVE_ROOMS';
export const CREATE_ROOM = 'CREATE_ROOM';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const CHANGE_ROOM = 'CHANGE_ROOM';

const setActiveRoom = id => ({
    type: CHANGE_ROOM,
    id
})

const receiveRooms = rooms => ({
    type: RECEIVE_ROOMS,
    rooms
});

const connectRoom = room => ({
    type: CREATE_ROOM,
    room
})

const receiveMessage = message => ({
    type: RECEIVE_MESSAGE,
    message
})

export const makeActiveRoom = id => dispatch => (
    dispatch(setActiveRoom(id))
)

export const fetchRooms = () => dispatch => (
    ChatApiUtil.fetchRooms()
    .then(rooms => {
        console.log('in action', rooms);
        return dispatch(receiveRooms(rooms))
    })
)

export const createRoom = room => dispatch => (
    ChatApiUtil.subscribeToRoom(room)
    .then(room => dispatch(connectRoom(room)))
)

export const newMessage = message => dispatch => (
    ChatApiUtil.postMessage(message)
    .then(message => dispatch(receiveMessage(message)))
)