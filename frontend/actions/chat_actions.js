import * as ChatApiUtil from '../util/chat_api_util';

export const RECEIVE_ROOMS = 'RECEIVE_ROOMS';
export const CREATE_ROOM = 'CREATE_ROOM';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const CHANGE_ROOM = 'CHANGE_ROOM';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const CLEAR_ROOM_MESSAGES = 'CLEAR_ROOM_MESSAGES';


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

export const clearRoomMessages = () => ({
    type: CLEAR_ROOM_MESSAGES
})

export const receiveMessage = message => ({
    type: RECEIVE_MESSAGE,
    message
})

export const receiveMessages = messages => ({
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
        // console.log('in chat action', roomId)
        return (
            ChatApiUtil.fetchMessages(roomId)
            .then(messages => dispatch(receiveMessages(messages)))
        )
    }
    // export const fetchMessages = (roomId) => dispatch => (
    //     ChatApiUtil.fetchMessages(roomId)
    //     .then(messages => dispatch(receiveMessages(messages)))
    // )

export const newMessage = message => dispatch => {
    // console.log('ACTION REPEAT?????')
    return ChatApiUtil.postMessage(message)
        .then(message => {
            // console.log('======in action,', message)
            return dispatch(receiveMessage(message))
        })
}