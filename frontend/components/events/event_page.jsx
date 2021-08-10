import React from 'react';
import EventForm from './event_form_container';

class EventPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "guestList": [],
        }
    }

    componentDidMount() {
        this.props.fetchAllEvents();
    }

    render() {
        console.log(this);
        return (
            <div className="event-page">
                In event page
                {<EventForm />}
            </div>
        )
    }
}

export default EventPage;