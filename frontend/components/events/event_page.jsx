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

    showEvents(events) {
        return events.map(event => {
            if (event) {console.log(event.description)}
            if (event  && event.description) {
                console.log('in if')
                return (<div>
                    <p>{event.description}</p>
                </div>)
            } else {
                console.log('in else')
                return (<div><p>NO EVENT HERE ;D</p></div>)
            }
        })
    }

    render() {
        console.log(this);
        // this.showEvents();
        let events = Object.values(this.props.state.event);

        return (
            <div className="event-page">
                In event page
                {this.showEvents(events)}
                {<EventForm />}
            </div>
        )
    }
}

export default EventPage;