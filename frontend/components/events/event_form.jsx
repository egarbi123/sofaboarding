import React from 'react';

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            date: "",
            time: "",
            open: false,
            user_id: this.props.state.session.id,
            showEvent: this.props.showEvent,
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
        event.open = this.state.open;
        event.user_id = this.state.user_id; 
        if (this.state.name && this.state.description && this.state.date && this.state.time) {
            this.props.createEvent(event).then(this.props.handleAddEvent(event));
            this.setState({
                name: "",
                description: "",
                date: "",
                time: "",
                open: false,
                showEvent: false,
                user_id: this.props.state.session.id,
            })
        } else {
            alert('Problem creating event. Please make sure all sections are filled in.');
            this.setState({
                name: "",
                description: "",
                date: "",
                time: "",
                user_id: this.props.state.session.id,
            })
        }
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    handleCheckbox() {
        if (this.state.open) {
            this.setState({"open": false});
        } else {
            this.setState({"open": true});
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

    render() {
        console.log(this);
        if (this.state.showEvent === true) {
            return (
                <div className="event-form-cont">
                    <div>
                        <h4>Create A New Event</h4>
                        <button onClick={() => this.props.toggleShow()}>Click Here To Hide Form</button>
                    </div>
                    <form className="event-form" onSubmit={this.handleSubmit}>
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
                        {this.showCheckbox()}
                        <button type="submit" className="button">Create Event</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div className="create-event">
                    <button onClick={() => this.props.toggleShow()}>Click Here To Create An Event</button>
                </div>
            )
        }
    }
}

export default EventForm;