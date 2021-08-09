export const createEvent = () => (
    $.ajax({
        url: `/api/events`,
        method: 'POST'
    })
)

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