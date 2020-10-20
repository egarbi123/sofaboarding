export const fetchUsers = () => (
    $.ajax({
        url: `api/users`,
        method: 'GET'
    })
)

export const fetchUser = userId => (
    $.ajax({
        url: `api/users/${userId}`,
        method: 'GET'
    })
)

export const updateUser = (user) => (
    $.ajax({
        url: `api/users/${user.id}`,
        method: 'PATCH',
        data: { user }
    })
)

export const signUp = (user) => (
    $.ajax({
        url: `api/users`,
        method: 'POST',
        data: { user }
    })
)