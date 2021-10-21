import React from 'react';
import EventPage from './event_page_container';

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "events": [],
            "eventsActive": true,
        }
        this.toggleEvents = this.toggleEvents.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllEvents();
    }

    componentDidUpdate() {
        let events = Object.values(this.props.state.event);
        if (this.state.events.length !== events.length) {
            this.setState({ events: events})
        } 
    }

    toggleEvents() {
        this.state.eventsActive ? 
            this.setState({ "eventsActive": false }) :
            this.setState({ "eventsActive": true })
    }

    render() {
        return this.state.eventsActive ?
            <EventPage events={this.state.events} /> :
            <div className="enter-events">
                <div className="row">
                    <h3>Click Below To Enter Events Section</h3>
                    <p style={{ "fontSize": "x-small" }}>Please Note: Although This Section Is Available, It Is Still Undergoing Maintenance.  Thank You For Your Understanding</p>
                </div>
                <button onClick={() => this.toggleEvents()}>Enter Events</button>
            </div>
    }
}

export default Events;