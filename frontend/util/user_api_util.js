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

export const updateUser = (data) => {
    return $.ajax({
        url: `api/users/${data.user.id}`,
        method: 'PATCH',
        data: data.form,
        contentType: false,
        processData: false
    })
}


export const signUp = (user) => (
    $.ajax({
        url: `api/users`,
        method: 'POST',
        data: { user }
    })
)