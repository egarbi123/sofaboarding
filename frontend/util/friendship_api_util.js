export const fetchFriendRequests = () => (
    $.ajax({
        url: `/api/friendrequests`,
        method: 'GET'
    })
)

export const createFriendRequest = (friendRequest) => (
    $.ajax({
        url: `/api/friendrequests`,
        method: 'POST',
        data: { friendRequest }
    })
)

export const deleteFriendRequest = (id) => (
    $.ajax({
        url: `/api/friendrequests/${id}`,
        method: 'DELETE'
    })
)

export const fetchFriendships = () => (
    $.ajax({
        url: `/api/friendships`,
        method: 'GET'
    })
)

export const createFriendship = (friendship) => (
    $.ajax({
        url: `/api/friendships`,
        method: 'POST',
        data: { friendship }
    })
)