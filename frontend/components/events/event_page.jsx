import React from 'react';
import EventForm from './event_form_container';

class EventPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "events": this.props.events,
        }
        this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
        this.eventInfo = this.eventInfo.bind(this);
    }

    handleRemoveEvent(eventId) {
        this.props.deleteEvent(eventId);
    }

    showEvents(events, handleClick) {
        return events.map(event => {
            return (<li key={event.id} onClick={() => handleClick(event.id)}>
                <p>{event.name}</p>
            </li>)
        })
    }

    eventInfo(events) {
        let event = {
            name: "No Current Event",
            description: "No Description",
            date: "No Date",
            time: "No Time"
        }
        if (this.state.eventId !== null) {
            events.map(ev => {
                if (ev.id === this.state.eventId) {
                    event = ev
                }
            })
            return (
                <div className="event-display">
                    <div className="event-info">
                        <p>Name: {event.name}</p>
                        <p>Description: {event.description}</p>
                        <p>Date: {event.date}</p>
                        <p>Time: {event.time}</p>
                        <button onClick={() => this.handleRemoveEvent(event.id)}>Delete Event</button>
                    </div>
                    <div className="exit" onClick={() => this.setState({ "eventId": null })}>X</div>
                </div>
            )
        }
    }

    showEventList(events) {
        if (events.length > 0) {
            return (<h5>These Are The Current Events</h5>)
        }
    }
    render() {
        let events = this.state.events;

        return (
            <div className="event-page">
                {this.showEventList(events)}
                <ul>
                    {this.showEvents(events, (eventId) => this.setState({ eventId: eventId }))}
                </ul>
                {this.eventInfo(events)}
                {<EventForm />}
            </div>
        )
    }
}

export default EventPage;