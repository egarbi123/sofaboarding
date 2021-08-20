import React from 'react';

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            date: "",
            time: "",
            user_id: this.props.state.session.id,
            showEvent: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let event = {};
        event.name = this.state.name; 
        event.description = this.state.description; 
        event.date = this.state.date; 
        event.time = this.state.time; 
        event.user_id = this.state.user_id; 
        if (this.state.name && this.state.description && this.state.date && this.state.time) {
            this.props.createEvent(event);
            this.setState({
                name: "",
                description: "",
                date: "",
                time: "",
                user_id: this.props.state.session.id,
            })
        } else {
        }
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    render() {
        // console.log(this);
        if (this.state.showEvent === true) {
            return (
                <div className="event-form">
                    <h4>Create A New Event</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <p>Name:</p>
                            <input
                                type="string"
                                value={this.state.name}
                                onChange={this.update('name')}
                            />
                        </div>
                        <div className="row">
                            <p>Description:</p>
                            <input
                                type="text"
                                value={this.state.description}
                                onChange={this.update('description')}
                            />
                        </div>
                        <div className="row">
                            <p>Date:</p>
                            <input
                                type="string"
                                value={this.state.date}
                                onChange={this.update('date')}
                                placeholder={'December 2, 2021'}
                                />
                        </div>
                        <p style={{ "fontSize": "xx-small" }}>Please keep format to Month Day, Year example: December 2, 2021</p>
                        <div className="row">
                            <p>Time:</p>
                            <input
                                type="string"
                                value={this.state.time}
                                onChange={this.update('time')}
                            />
                        </div>
                        <button type="submit" className="button">Create Event</button>
                    </form>
                    <button onClick={() => this.setState({showEvent: false})}>Click Here To Hide Form</button>
                </div>
            )
        } else {
            return (
                <div className="create-event">
                    <button onClick={() => this.setState({showEvent: true})}>Click Here To Create An Event</button>
                </div>
            )
        }
    }
}

export default EventForm;