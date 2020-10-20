import { API_ROOT, HEADERS } from '../constants/chat_constants';

export const fetchRooms = () => (
    $.ajax({
        url: `${API_ROOT}/rooms`,
        method: 'GET'
    })
)

export const subscribeToRoom = room => (
    fetch(`${API_ROOT}/rooms`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(room)
    })
)

export const postMessage = message => (
    fetch(`${API_ROOT}/messages`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(message)
    })
)