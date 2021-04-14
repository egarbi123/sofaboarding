import * as ChatApiUtil from '../util/chat_api_util';

export const RECEIVE_ROOMS = 'RECEIVE_ROOMS';
export const CREATE_ROOM = 'CREATE_ROOM';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const CHANGE_ROOM = 'CHANGE_ROOM';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const CLEAR_ROOM_MESSAGES = 'CLEAR_ROOM_MESSAGES';
export const RECEIVE_ALL_ROOM_MEMBERSHIPS = 'RECEIVE_ALL_ROOM_MEMBERSHIPS';
export const RECEIVE_ROOM_MEMBERSHIP = 'RECEIVE_ROOM_MEMBERSHIP';
export const REMOVE_ROOM_MEMBERSHIP = 'REMOVE_ROOM_MEMBERSHIP';


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

const addRoomMembership = membership => ({
    type: RECEIVE_ROOM_MEMBERSHIP,
    membership
})

const receiveRoomMemberships = memberships => ({
    type: RECEIVE_ALL_ROOM_MEMBERSHIPS,
    memberships
})

const removeRoomMembership = membershipId => ({
    type: REMOVE_ROOM_MEMBERSHIP,
    membershipId
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
    .then(rooms => dispatch(receiveRooms(rooms)))
)

export const fetchRoomMemberships = () => dispatch => (
    ChatApiUtil.fetchRoomMemberships()
    .then(memberships => dispatch(receiveRoomMemberships(memberships)))
)

export const createRoom = room => dispatch => (
    ChatApiUtil.createRoom(room)
    .then(rooms => dispatch(connectRoom(rooms)))
)

export const createRoomMembership = membership => dispatch => (
    ChatApiUtil.createRoomMembership(membership)
    .then(membership => dispatch(receiveRoomMemberships(membership)))
)

export const deleteRoomMembership = membershipId => dispatch => (
    ChatApiUtil.removeRoomMembership(membershipId)
    .then(membershipId => dispatch(receiveRoomMemberships(membershipId)))
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