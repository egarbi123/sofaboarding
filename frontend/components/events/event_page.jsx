import React from 'react';
import EventForm from './event_form_container';

class EventPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "eventId": this.props.events,
        }
        this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
        this.eventInfo = this.eventInfo.bind(this);
    }

    // componentDidMount() {
    //     this.props.fetchAllEvents();
    // }

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
                console.log(ev);
                if (ev.id === this.state.eventId) {
                    event = ev
                }
            })
            console.log(event);
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
        console.log(this);

        let events = Object.values(this.props.state.event);
        // let events = this.state.events;
        console.log(events);
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