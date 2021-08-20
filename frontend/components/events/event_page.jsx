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
        this.joinEvent = this.joinEvent.bind(this);
        this.showMembers = this.showMembers.bind(this);
        // this.updateEvents = this.updateEvents.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllEvents();
        this.props.fetchEventMemberships()
    }
    
    // updateEvents() {
    //     let stateEvents = Object.values(this.state.events);
    //     let propsEvents = Object.values(this.props.state.event);
    //     if (stateEvents.length !== propsEvents.length) {
    //         this.setState({"events": this.props.state.event})
    //     }
    // }

    handleRemoveEvent(eventId, members) {
        this.props.deleteEvent(eventId);
        console.log('IN handleRemoveEvent: members:', members);
        if (members.length > 0) {
            this.deleteMemberships(eventId);
        }
    }

    deleteMemberships(eventId) {
        let memberships = Object.values(this.props.state.eventMemberships);
        console.log('IN deleteMemberships: memberships:', memberships);
        // console.log('In deleteMemberships: members', members);
        for (let i = 0; i < memberships.length; i++) {
            if (memberships[i].event_id === eventId) {
                console.log('DELETING MEMBERSHIP WITH ID:', memberships[i].id);
                this.props.deleteEventMembership(memberships[i].id);
            }
        }
    }

    handleRemoveMembership(membershipID) {
        console.log(membershipID);
        // this.props.deleteEventMembership(membershipID)
        this.props.deleteEventMembership(membershipID);
    }

    joinEvent(eventId) {
        let membership = {
            "user_id": this.props.state.session.id,
            "event_id": eventId,
            "owner": false
        }
        this.props.createEventMembership(membership);
    }

    showEvents(events, handleClick) {
        return events.map(event => {
            return (<div key={event.id} className="event-piece" onClick={() => handleClick(event.id)}>
                <p>{event.name}</p>
            </div>)
        })
    }

    showMembers(eventMembers, owner) {
        let users = this.props.state.users;

        return eventMembers.map(member => {
            if (member === owner) {
                return (
                    <div key={member} className="pointer" onClick={() => this.handleRemoveMembership(member)}>OWNER -- {users[member].name}</div>
                )
            } else {
                return (<div key={member} className="pointer" onClick={() => this.handleRemoveMembership(member)}>USER -- {users[member].name}</div>)
            }
        })
    }

    eventInfo(events) {
        let event = {
            name: "No Current Event",
            description: "No Description",
            date: "No Date",
            time: "No Time"
        }
        let eventId = undefined;
        if (this.state.eventId !== undefined) {
            events.map(ev => {
                if (ev.id === this.state.eventId) {
                    event = ev;
                    eventId = ev.id
                }
            })
            let eventMemberships = Object.values(this.props.state.eventMemberships);
            let membersIDs = [];
            let owner = undefined;
            eventMemberships.map(membership => {
                if (membership.event_id === eventId) {
                    membersIDs.push(membership.user_id);
                    if (membership.owner) {
                        owner = membership.user_id;
                    }
                }
            })
            
            return (
                <div className="event-display">
                    <div className="event-info">
                        <p>Name: {event.name}</p>
                        <p>Description: {event.description}</p>
                        <p>Date: {event.date}</p>
                        <p>Time: {event.time}</p>
                    </div>
                    <div className="event-controls">
                        <div className="event-name-exit">
                            <div className="column">
                                <h4>Event:</h4>
                                <p>{event.name}</p>
                            </div>
                            <div className="exit" onClick={() => this.setState({ "eventId": undefined })}>X</div>
                        </div>
                        <h4>Members:</h4>
                        {this.showMembers(membersIDs, owner)}
                        <button onClick={() => this.handleRemoveEvent(event.id, membersIDs)}>Delete Event</button>
                        <button onClick={() => this.joinEvent(event.id)}>Join Event</button>
                    </div>
                </div>
            )
        }
    }

    showEventHeader(events) {
        if (events.length > 0) {
            return (<h5>These Are The Current Events</h5>)
        }
    }

    render() {
        let events = this.state.events;

        console.log(this);

        return (
            <div className="event-page">
                {this.showEventHeader(events)}
                <div className="events-list">
                    {this.showEvents(events, (eventId) => this.setState({ eventId: eventId }))}
                </div>
                {this.eventInfo(events)}
                {<EventForm />}
            </div>
        )
    }
}

export default EventPage;