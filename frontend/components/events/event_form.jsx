import React from 'react';

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            date: "",
            time: "",
            user_id: this.props.state.session.id
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.name && this.state.description && this.state.date && this.state.time) {
            this.props.createEvent(this.state);
        } else {
        }
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    render() {
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
            </div>
        )
    }
}

export default EventForm;