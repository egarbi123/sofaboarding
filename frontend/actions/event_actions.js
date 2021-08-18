import * as EventApiUtil from '../util/event_api_util';

export const RECEIVE_ALL_EVENTS = 'RECEIVE_ALL_EVENTS';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const RECEIVE_ALL_EVENT_MEMBERSHIPS = 'RECEIVE_ALL_EVENT_MEMBERSHIPS';
export const CREATE_EVENT = 'CREATE_EVENT';


const receiveAllEvents = (events) => ({
    type: RECEIVE_ALL_EVENTS,
    events
})

const removeEvent = (event) => ({
    type: REMOVE_EVENT,
    event
})

const receiveEventMemberships = memberships => ({
    type: RECEIVE_ALL_EVENT_MEMBERSHIPS,
    memberships
})

const makeEvent = event => ({
    type: CREATE_EVENT,
    event
})

export const fetchEventMemberships = () => dispatch => (
    EventApiUtil.fetchEventMemberships()
    .then(memberships => dispatch(receiveEventMemberships(memberships)))
)

export const createEventMembership = membership => dispatch => (
    EventApiUtil.createEventMembership(membership)
    .then(memberships => dispatch(receiveEventMemberships(memberships)))
)

export const createEvent = (event) => dispatch => (
    EventApiUtil.createEvent(event)
    .then(events => dispatch(makeEvent(events)))
)

export const fetchAllEvents = () => dispatch => (
    EventApiUtil.fetchEvents()
    .then(events => dispatch(receiveAllEvents(events)))
)

export const deleteEvent = (event) => dispatch => (
    EventApiUtil.deleteEvent(event)
    .then(event => dispatch(removeEvent(event)))
)