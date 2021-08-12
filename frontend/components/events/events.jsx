import React from 'react';
import EventPage from './event_page_container';

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "events": []
        }
    }

    componentDidMount() {
        // console.log('IN CDM')
        this.props.fetchAllEvents();
    }

    componentDidUpdate() {
        // console.log('IN CDU')
        let events = Object.values(this.props.state.event);
        if (this.state.events.length !== events.length) {
            this.setState({ events: events})
        } 
    }

    mapEvents() {

    }

    render() {
        // console.log(this);
        if (this.state.events.length >= 1) {
            return (<EventPage events={this.state.events} />)
        } else {
            return (<div>No Events Yet :/</div>)
        }
    }
}

export default Events;