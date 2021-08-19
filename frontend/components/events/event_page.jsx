import React from 'react';
import { fetchEventMemberships } from '../../actions/event_actions';
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
        this.findMembershipID = this.findMembershipID.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllEvents();
        this.props.fetchEventMemberships()
    }

    handleRemoveEvent(eventId, members) {
        this.props.deleteEvent(eventId);
        if (members.length > 0) {
            members.map(member => {
                this.props.deleteEventMembership(this.findMembershipID(member));
            })
        }
    }

    findMembershipID(memberID) {
        let memberships = Object.values(this.props.state.eventMemberships);
        return memberships.map(membership => {
            if (membership.user_id === memberID) {
                return membership.id
            } 
        })
    }

    handleRemoveMember(membershipID) {
        this.props.deleteEventMembership(membershipID)
    }

    joinEvent(eventId) {
        let membership = {
            "user_id": this.props.state.session.id,
            "event_id": eventId,
            "owner": true
        }
        this.props.createEventMembership(membership);
    }

    showEvents(events, handleClick) {
        return events.map(event => {
            return (<li key={event.id} onClick={() => handleClick(event.id)}>
                <p>{event.name}</p>
            </li>)
        })
    }

    showMembers(eventMembers, owner) {
        let users = this.props.state.users;

        return eventMembers.map(member => {
            console.log(member);
            if (member === owner) {
                return (
                    <div key={member} onClick={() => this.handleRemoveMember(member)}>OWNER -- {users[member].name}</div>
                )
            } else {
                return (<div key={member} onClick={() => this.handleRemoveMember(member)}>USER -- {users[member].name}</div>)
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
        if (this.state.eventId !== null) {
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
                    <div>
                        <div className="event-info">
                            <p>Name: {event.name}</p>
                            <p>Description: {event.description}</p>
                            <p>Date: {event.date}</p>
                            <p>Time: {event.time}</p>
                            <button onClick={() => this.handleRemoveEvent(event.id, membersIDs)}>Delete Event</button>
                            <button onClick={() => this.joinEvent(event.id)}>Join Event</button>
                        </div>
                        <div>
                            {this.showMembers(membersIDs, owner)}
                        </div>
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

        console.log(this);

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