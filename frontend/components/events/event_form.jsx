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
            showEvent: true,
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
        return (
            <div className="section-border">
                <div className="event-form-cont">
                    <div>
                        <h4>NEW EVENT</h4>
                        <button className="event-delete" onClick={() => this.props.toggleShow()}>EXIT</button>
                    </div>
                    <form className="event-form" onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <p>Name:</p>
                            <input
                                type="string"
                                value={this.state.name}
                                onChange={this.update('name')}
                            />
                        </div>
                        <div className="form-row">
                            <p>Description:</p>
                            <input
                                type="text"
                                value={this.state.description}
                                onChange={this.update('description')}
                            />
                        </div>
                        <div className="form-row">
                            <p>Date:</p>
                            <input
                                type="string"
                                value={this.state.date}
                                onChange={this.update('date')}
                                placeholder={'December 2, 2021'}
                                />
                        </div>
                        <div className="form-row">
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
            </div>
        )
    }
}

export default EventForm;