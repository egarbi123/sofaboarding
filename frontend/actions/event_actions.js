import { Event } from 'jquery';
import * as EventApiUtil from '../util/event_api_util';

export const RECEIVE_ALL_EVENTS = 'RECEIVE_ALL_EVENTS';
export const REMOVE_EVENT = 'REMOVE_EVENT';

const receiveAllEvents = (events) => ({
    type: RECEIVE_ALL_EVENTS,
    events
})

const removeEvent = (event) => ({
    type: REMOVE_EVENT,
    event
})

export const fetchAllEvents = () => dispatch => (
    EventApiUtil.fetchEvents()
    .then(events => dispatch(receiveAllEvents(events)))
)

export const deleteEvent = (event) => dispatch => (
    EventApiUtil.deleteEvent(event)
    .then(event => dispatch(removeEvent(event)))
)