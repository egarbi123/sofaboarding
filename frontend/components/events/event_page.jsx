import React from 'react';

class EventPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "description": "",
            "guestList": [],
            "date": "",
            "time": "",
        }
    }

    

    render() {
        return (
            <div className="event-page">

            </div>
        )
    }
}

export default EventPage;