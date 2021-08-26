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
        this.handleAddEvent = this.handleAddEvent.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllEvents();
        this.props.fetchEventMemberships()
    }

    componentDidUpdate() {
        let owner = null;
        if (this.state.eventId) {
            let memberships = Object.values(this.props.state.eventMemberships);
            for (let i = 0; i < memberships.length; i++) {
                if (memberships[i].owner) {
                    owner = memberships[i].user_id;
                }
            }
        }
        if (this.props.state.session.id === owner) {
            this.userIsOwner = true;
            if (this.state.userIsOwner !== true) {
                this.setState({"userIsOwner": true});
            }
        }
        if (Object.values(this.props.state.event).length !== this.state.events.length) {
            this.setState({'events': Object.values(this.props.state.event)})
        }
    }

    handleAddEvent() {
        let stateEvents = Object.values(this.state.events);
        let propsEvents = Object.values(this.props.state.event);
        if (stateEvents.length !== propsEvents) {
            this.setState({"events": propsEvents});
        }
    }

    handleRemoveEvent(eventId, members) {
        let eventsArray = this.state.events; 
        let newEventsArray = [];
        for (let i = 0; i < eventsArray.length; i++) {
            if (eventsArray[i]['id'] !== eventId) {
                newEventsArray.push(eventsArray[i]);
            }
        }
        this.props.deleteEvent(eventId);
        if (members.length > 0) {
            this.deleteMemberships(eventId);
        }
        // console.log(eventsArray);
        // console.log(newEventsArray);
        // this.setState({"events": newEventsArray});
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
        this.props.deleteEventMembership(membershipID);
    }

    deleteMemberships(eventId) {
        let memberships = Object.values(this.props.state.eventMemberships);
        for (let i = 0; i < memberships.length; i++) {
            if (memberships[i].event_id === eventId) {
                this.props.deleteEventMembership(memberships[i].id);
            }
        }
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
        let listOrder = [];
        listOrder.push(owner);
        if (this.props.state.session.id !== owner) {
            listOrder.push(this.props.state.session.id);
        }
        eventMembers.map(memberID => {
            if (memberID !== owner && memberID !== this.props.state.session.id) {
                listOrder.push(memberID);
            }
        })
        
        return listOrder.map(memberID => {
            if (memberID === owner) {
                if (owner === this.props.state.session.id) {
                    return (
                        <div key={memberID}>You Are The Owner</div>
                    )
                } else {
                    return (
                        <div key={memberID}>This Event Belongs To {users[memberID].name}</div>
                    )
                }
            }
            if (owner ===  this.props.state.session.id) {
                return (
                    <div key={memberID} className="row">
                        <div>{users[memberID].name} -- </div>
                        <button onClick={() => this.handleRemoveMember(memberID, eventID)} className="pointer ">Remove</button>
                    </div>
                )
            } else if (memberID === this.props.state.session.id) {
                return (
                    <div className="row" key={memberID}>
                        {users[memberID].name}:
                        <button onClick={() => this.handleRemoveMembership(memberID)}>Leave Event</button>
                    </div>
                )
            } else {
                return (<div key={memberID}>{users[memberID].name}</div>)
            }
        })
    }

    showIfOpen(event) {
        if (event.open) {
            return (<p>This Event Is Open To Everyone!</p>);
        } else {
            return (<p>This Event Is Private, Only The Host Can Invite New Participants!</p>)
        }
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
                if (ev.id) {
                    if (ev.id === this.state.eventId) {
                        event = ev;
                        eventId = ev.id
                    }
                } else {

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
                        {this.showIfOpen(event)}
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

        return (
            <div className="event-page">
                {this.showEventHeader(events)}
                <div className="events-list">
                    {this.showEvents(events, (eventId) => this.setState({ eventId: eventId }))}
                </div>
                {this.eventInfo(events)}
                {<EventForm events={this.state.events} handleAddEvent={() => {this.handleAddEvent()}}/>}
            </div>
        )
    }
}

export default EventPage;