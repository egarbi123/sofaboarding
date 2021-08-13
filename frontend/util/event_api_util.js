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

export const updateEvent = (data) => (
    $.ajax({
        url: `/api/events/${data.event.id}`,
        method: 'PATCH',
        data: data.form
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

export const createEventMembership = membership => (
    $.ajax({
        url: `/api/eventmemberships`,
        method: 'POST',
        data: { membership }
    })
)

export const removeEventMembership = membershipId => (
    $.ajax({
        url: `/api/eventmemberships/${membershipId}`,
        method: 'DELETE'
    })
)