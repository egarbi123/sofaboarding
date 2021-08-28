export const createEvent = (event) => {
    console.log(event)
    return (
        $.ajax({
            url: `/api/events`,
            method: 'POST',
            data: { event }
        })
    )
}

export const updateEvent = (event) => (
    $.ajax({
        url: `/api/events/${event.id}`,
        method: 'PATCH',
        data: event
    })
)

export const fetchEvents = () => (
    $.ajax({
        url: `api/events`,
        method: 'GET'
    })
)

export const deleteEvent = (id) => (
    $.ajax({
        url: `/api/events/${id}`,
        method: 'DELETE'
    })
)

export const fetchEventMemberships = () => (
    $.ajax({
        url: `/api/eventmemberships`,
        method: 'GET'
    })
)

export const createEventMembership = membership => {
    console.log('IN API UTIL', membership)
    return $.ajax({
        url: `/api/eventmemberships`,
        method: 'POST',
        data: { membership }
    })
}


export const removeEventMembership = membershipId => (
    $.ajax({
        url: `/api/eventmemberships/${membershipId}`,
        method: 'DELETE'
    })
)