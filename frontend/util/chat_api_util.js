import { API_ROOT, HEADERS } from '../constants/chat_constants';

export const fetchRooms = () => (
    $.ajax({
        url: `api/rooms`,
        method: 'GET'
    })
)

export const createRoom = room => (
    $.ajax({
        method: 'POST',
        url: `/api/rooms`,
        data: { room }
    })
)

export const fetchMessages = roomId => (
    $.ajax({
        url: `/api/messages`,
        method: 'GET',
        data: { roomId }
    })
)

export const postMessage = message => {
    // console.log('CHAT UTILLLLLLLLL');
    return $.ajax({
        method: 'POST',
        url: `/api/messages`,
        data: { message }
    })
}

export const subscribeToRoom = room => (
    fetch(`${API_ROOT}/rooms`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(room)
    })
)

export const fetchRoomMemberships = () => (
    $.ajax({
        url: `/api/roommemberships`,
        method: 'GET'
    })
)

export const createRoomMembership = membership => (
    $.ajax({
        url: `/api/roommemberships`,
        method: 'POST',
        data: { membership }
    })
)

export const removeRoomMembership = memebershipId => (
    $.ajax({
        url: `/api/roommemberships/${memebershipId}`,
        method: 'DELETE'
    })
)