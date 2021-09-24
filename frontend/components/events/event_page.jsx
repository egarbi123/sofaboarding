import React from 'react';
import EventForm from './event_form_container';

class EventPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "events": this.props.events,
            "eventId": undefined,
            "userIsOwner": false,
            "eventBeingEdited": false,
            "editingId": undefined,
            name: "",
            description: "",
            date: "",
            time: "",
            open: false,
            editCorrect: true,
            showEventForm: false,
        }
        this.userIsOwner = false;
        this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
        this.handleEditEvent = this.handleEditEvent.bind(this);
        this.eventInfo = this.eventInfo.bind(this);
        this.joinEvent = this.joinEvent.bind(this);
        this.showMembers = this.showMembers.bind(this);
        this.handleAddEvent = this.handleAddEvent.bind(this);
        this.showEventSection = this.showEventSection.bind(this);
        this.update = this.update.bind(this);
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
        if (Object.values(this.props.state.event).length !== this.state.events.length || this.props.eventEdited) {
            this.setState({'events': Object.values(this.props.state.event), "eventEdited": false});
        } 
        if (this.state.eventId) {
            let event = {};
            this.state.events.map(ev => {
                if (ev.id === this.state.eventId) {
                    event = ev
                }
            })
            if (this.state.name !== event.name) {
                this.setState({
                    "name": event.name,
                    "description": event.description,
                    "date": event.date,
                    "time": event.time,
                })
            }
        }
    }

    handleAddEvent() {
        let stateEvents = Object.values(this.state.events);
        let propsEvents = Object.values(this.props.state.event);
        if (stateEvents.length !== propsEvents) {
            this.setState({"events": propsEvents});
        }
    }

    handleEditEvent(e) {
        e.preventDefault();
        let object = {};
        object['name'] = this.state.name;
        object['description'] = this.state.description;
        object['date'] = this.state.date;
        object['time'] = this.state.time;
        object['open'] = this.state.open;
        object['id'] = this.state.eventId;
        this.props.updateEvent(object);
        let stateEvents = this.state.events;
        let newStateEvents = [];
        stateEvents.map(event => {
            if (event.id === object.id) {
                newStateEvents.push(object);
            } else {
                newStateEvents.push(event);
            }
        })
        this.setState({ "eventEdited": true, "events": newStateEvents});
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
        this.setState({"events": newEventsArray, "eventId": undefined});
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
            return (
                <div key={event.id} className="event-piece">
                    <div className="event-piece-name" key={event.id} onClick={() => handleClick(event.id)}>
                        <p key={event.id}>
                            {event.name}
                        </p>
                    </div>
                </div>
            )
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
                        <div className="event-center">
                            <div key={memberID}><p>You Are The Owner</p></div>
                        </div>
                    )
                } else {
                    return (
                        <div className="event-center">
                            <div key={memberID}><p>Owner: {users[memberID].name}</p></div>
                        </div>
                    )
                }
            }
            if (owner ===  this.props.state.session.id) {
                return (
                    <div className="event-center">
                        <div key={memberID} className="row">
                            <div><p>{users[memberID].name}</p></div>
                            <button className="event-membership-btn button pointer" onClick={() => this.handleRemoveMember(memberID, eventID)} >Remove</button>
                        </div>
                    </div>
                )
            } else if (memberID === this.props.state.session.id) {
                return (
                    <div className="event-center">
                        <div className="row" key={memberID}>
                            <p>
                                {users[memberID].name}
                            </p>
                            <button className="event-membership-btn button" onClick={() => this.handleRemoveMembership(memberID)}>Leave Event</button>
                        </div>
                    </div>
                )
            } else {
                return (<div key={memberID}>{users[memberID].name}</div>)
            }
        })
    }

    showIfOpen(event) {
        if (this.state.eventBeingEdited) {

        } else {
            if (event.open) {
                return (<p>This Event Is Open To Everyone!</p>);
            } else {
                return (<p>This Event Is Private, Only The Host Can Invite New Participants!</p>)
            }
        }
    }

    handleCheckbox() {
        if (this.state.open) {
            this.setState({ "open": false });
        } else {
            this.setState({ "open": true });
        }
    }

    showCheckbox() {
        return (
            <div className="row">
                <p>Open:</p>
                <input
                    type="radio"
                    value={this.state.open}
                    onChange={() => this.handleCheckbox()}
                />
            </div>
        )
    }

    showEventSection(event) {
        if (this.state.eventBeingEdited) {
            return (
                <form onSubmit={this.handleEditEvent}>
                    <div className="event-row">
                        <p className="event-inp-cat">Name:</p>
                        <input
                            className="event-inputs"
                            type="string"
                            value={this.state.name}
                            onChange={this.update('name')}
                        />
                    </div>
                    <div className="event-row">
                        <p className="event-inp-cat">Description:</p>
                        <input
                            className="event-inputs"
                            type="text"
                            value={this.state.description}
                            onChange={this.update('description')}
                        />
                    </div>
                    <div className="event-row">
                        <p className="event-inp-cat">Date:</p>
                        <input
                            className="event-inputs"
                            type="string"
                            value={this.state.date}
                            onChange={this.update('date')}
                            placeholder={'December 2, 2021'}
                        />
                    </div>
                    <p style={{ "fontSize": "xx-small" }}>Please keep format to Month Day, Year example: December 2, 2021</p>
                    <div className="event-row">
                        <p className="event-inp-cat">Time:</p>
                        <input
                            className="event-inputs"
                            type="string"
                            value={this.state.time}
                            onChange={this.update('time')}
                        />
                    </div>
                    {this.showCheckbox()}
                    <button type="submit" className="event-button">Edit Event</button>
                </form>
            )
        } else {
            return (
                <div className="event-list">
                    <div className="event-column">
                        <div>
                            <p>Event:</p>
                        </div>
                        <div>
                            <p>About:</p>
                        </div>
                        <div>
                            <p>Date:</p>
                        </div>
                        <div>
                            <p>Time:</p>
                        </div>
                    </div>
                    <div className="event-column">
                        <p className="event-name">{event.name}</p>
                        <p className="event-name">{event.description}</p>
                        <p className="event-name">{event.date}</p>
                        <p className="event-name">{event.time}</p>
                    </div>
                </div>
            )
        }
    }
    
    showEditButton(eventId) {
        if (this.state.userIsOwner) {
            return (
                <button className="event-controls-btn button" onClick={() => this.toggleEdit(eventId)}>Edit Event</button>
            )
        }
    }

    toggleEdit(eventId) {
        if (this.state.eventBeingEdited) {
            this.setState({"eventBeingEdited": false});
        } else {
            this.setState({"eventBeingEdited": true, "editingId": eventId});
        }
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
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
                        {this.showEventSection(event, this.state)}
                        {this.showIfOpen(event)}
                    </div>
                    <div className="event-controls">
                        <div className="event-name-exit">
                            <div className="event-name">
                                <h4>{event.name}</h4>
                            </div>
                            <div className="event-center">
                                <div className="event-exit" onClick={() => this.setState({ "eventId": undefined })}>X</div>
                            </div>
                        </div>
                        <div className="event-center">
                            {this.showEditButton(event.id)}
                        </div>
                        <h4>MEMBERS</h4>
                        {this.showMembers(membersIDs, owner, eventId)}
                        {this.showDeleteEventButton(owner, event, membersIDs)}
                        {this.showJoinEventButton(event.id)}
                    </div>
                </div>
            )
        }
    }

    showDeleteEventButton(owner, event, membersIDs) {
        if (owner === this.props.state.session.id) {
            return (
                <div className="event-center">
                    <button className="event-controls-btn button" onClick={() => this.handleRemoveEvent(event.id, membersIDs)}>Delete Event</button>
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
            return <button className="event-controls-btn button" onClick={() => this.joinEvent(eventID)}>Join Event</button>
        }
    }

    toggleEventForm() {
        if (this.state.showEventForm) {
            this.setState({"showEventForm": false, "eventId": undefined });
        } else {
            this.setState({ "showEventForm": true, "eventId": undefined });
        }
    }

    showEventForm() {
        if (this.state.showEventForm) {
            return (
                <EventForm events={this.state.events} showEvent={this.state.showEventForm} toggleShow={() => { this.toggleEventForm() }} handleAddEvent={() => { this.handleAddEvent() }} />
            )
        }
    }

    showSingleEvent(events) {
        if (this.state.eventId) {
            return (
                <div className="section-border">
                    <div className="single-event">
                        <div className="single-event-info">
                            {this.eventInfo(events)}
                        </div>
                        {this.showEventForm()}
                    </div>
                </div>
            )
        }
    }

    render() {
        let events = this.state.events;
        return (
            <div className="event-page">
                <div className="events-list">
                    <h3>EVENTS</h3>
                    <div className="event-piece-cont">
                        {this.showEvents(this.state.events, (eventId) => this.setState({ eventId: eventId, "eventBeingEdited": false, editingId: eventId, "showEventForm": false }))}
                    </div>
                    <div className="event-piece-cont">
                        <button className="event-piece-button button" onClick={() => this.toggleEventForm()}>CREATE NEW EVENT</button>
                    </div>
                </div>
                {this.showSingleEvent(events)}
            </div>
        )
    }
}

export default EventPage;