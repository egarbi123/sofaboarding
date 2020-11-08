import * as ChatApiUtil from '../util/chat_api_util';

export const RECEIVE_ROOMS = 'RECEIVE_ROOMS';
export const CREATE_ROOM = 'CREATE_ROOM';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const CHANGE_ROOM = 'CHANGE_ROOM';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';

const setActiveRoom = roomId => ({
    type: CHANGE_ROOM,
    roomId
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

const receiveMessages = messages => ({
    type: RECEIVE_MESSAGES,
    messages
})

export const makeActiveRoom = roomId => dispatch => (
    dispatch(setActiveRoom(roomId))
)

export const fetchRooms = () => dispatch => (
    ChatApiUtil.fetchRooms()
    .then(rooms => {
        return dispatch(receiveRooms(rooms))
    })
)

export const createRoom = room => dispatch => (
    ChatApiUtil.createRoom(room)
    .then(rooms => dispatch(connectRoom(rooms)))
)

export const fetchMessages = (roomId) => dispatch => {
        console.log('in chat action', roomId)
        return (
            ChatApiUtil.fetchMessages(roomId)
            .then(messages => dispatch(receiveMessages(messages)))
        )
    }
    // export const fetchMessages = (roomId) => dispatch => (
    //     ChatApiUtil.fetchMessages(roomId)
    //     .then(messages => dispatch(receiveMessages(messages)))
    // )

export const newMessage = message => dispatch => (
    ChatApiUtil.postMessage(message)
    .then(messages => {
        console.log('in action,', messages)
        return dispatch(receiveMessages(messages))
    })
)