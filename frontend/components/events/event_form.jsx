import React from 'react';

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "description": "",
            "date": "",
            "time": "",
        }
    }

    handleSubmit(e) {

    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    render() {
        return (
            <form className="event-form" onSubmit={this.handleSubmit}>
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
                    />
                </div>
                <div className="row">
                    <p>Time:</p>
                    <input
                        type="string"
                        value={this.state.time}
                        onChange={this.update('time')}
                    />
                </div>
            </form>
        )
    }
}

export default EventForm;