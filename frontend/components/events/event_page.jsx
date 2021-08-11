import React from 'react';
import EventForm from './event_form_container';

class EventPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "guestList": [],
        }
        this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllEvents();
    }

    handleRemoveEvent(eventId) {
        console.log(eventId);
        this.props.deleteEvent(eventId);
    }

    showEvents(events, handleClick) {
        return events.map(event => {
            if (event) {console.log(event.description)}
            if (event  && event.name) {
                return (<li onClick={() => handleClick(event.id)}>
                    <p>{event.name}</p>
                </li>)
            } else {
                return (<li><p>NO EVENT HERE ;D</p></li>)
            }
        })
    }

    render() {
        console.log('THIS', this);
        let events = Object.values(this.props.state.event);
        console.log(events);
        return (
            <div className="event-page">
                <h5>These Are The Current Events</h5>
                <ul>
                    {this.showEvents(events, this.handleRemoveEvent)}
                </ul>
                {<EventForm />}
            </div>
        )
    }
}

export default EventPage;