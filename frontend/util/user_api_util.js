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

export const createBio = (profilebio) => {
    console.log(profilebio);
    return $.ajax({
        url: `api/profilebio`,
        method: 'POST',
        data: { profilebio }
    })
}


export const updateBio = (data) => (
    $.ajax({
        url: `api/profilebio/${data.id}`,
        method: 'PATCH',
        data: { data }
    })
)

export const fetchBio = (profilebio) => (
    $.ajax({
        url: `api/profilebio`,
        method: 'GET',
        data: { profilebio }
    })
)