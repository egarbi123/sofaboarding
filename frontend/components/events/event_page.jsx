import React from 'react';
import EventForm from './event_form_container';

class EventPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "events": this.props.events,
            "eventId": undefined,
            "userIsOwner": false,
        }
        this.userIsOwner = false;
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

    componentDidUpdate() {
        let owner = null;
        if (this.state.eventId) {
            console.log('IN CDM: WE HAVE an eventID');
            let memberships = Object.values(this.props.state.eventMemberships);
            for (let i = 0; i < memberships.length; i++) {
                if (memberships[i].owner) {
                    owner = memberships[i].user_id;
                }
            }
        }
        console.log('IN CDM', owner);
        if (this.props.state.session.id === owner) {
            console.log('IN CDM: OWNER!', );
            this.userIsOwner = true;
            if (this.state.userIsOwner !== true) {
                this.setState({"userIsOwner": true});
            }
            console.log(this.state.userIsOwner)
        }
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

    handleRemoveMember(memberID, eventID) {
        let memberships = Object.values(this.props.state.eventMemberships);
        let membershipID = undefined;
        for (let i = 0; i < memberships.length; i++) {
            if (memberships[i].event_id === eventID && memberships[i].user_id === memberID) {
                membershipID = memberships[i].id
            }
        }
        if (membershipID) {
            this.handleRemoveMembership(membershipID);
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

    showMembers(eventMembers, owner, eventID) {
        let users = this.props.state.users;
        console.log('IN showMembers: this.userIsOwner', this.userIsOwner);
        return eventMembers.map(member => {
            if (this.userIsOwner === true) {
                if (member === owner) {
                    return (
                        <div key={member}><p>You Are The Owner</p></div>
                    )
                } else {
                    return (
                        <div key={member} className="row">
                            <p>Member: {users[member].name}</p>
                            <button onClick={() => this.handleRemoveMember(member, eventID)} className="pointer ">Remove {users[member].name}</button>
                        </div>
                    )
                }
            } else {
                if (member === owner) {
                    return (
                        <div key={member}>OWNER: {users[member].name}</div>
                    )
                } else {
                    if (this.props.state.session.id !== member) {
                        return (<div key={member}>Member: {users[member].name}</div>)
                    } else {
                        return (
                            <div className="row" key={member}>
                                <button onClick={() => this.handleRemoveMembership(member)}>Leave Event</button>
                            </div>
                        )
                    }
                }
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
                        {this.showMembers(membersIDs, owner, eventId)}
                        <button onClick={() => this.handleRemoveEvent(event.id, membersIDs)}>Delete Event</button>
                        {this.showJoinEventButton(event.id)}
                    </div>
                </div>
            )
        }
    }
    
    showJoinEventButton(eventID) {
        let userID = this.props.state.session.id;
        let memberships = Object.values(this.props.state.eventMemberships);
        let alreadyMember = false;
        for (let i = 0; i < memberships.length; i++) {
            if (memberships[i].user_id === userID && memberships[i].event_id === eventID) {
                alreadyMember = true;
            }
        }
        if (alreadyMember === false) {
            return <button onClick={() => this.joinEvent(eventID)}>Join Event</button>
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