import React from 'react';
import { API_ROOT, HEADERS } from '../../constants/chat_constants';
import { createRoom } from '../../actions/chat_actions';

class RoomForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.room;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.action(this.state);
        console.log('this.state:', this.state)
        console.log('this.props:', this.props)
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    render() {
        return (
            <div>
                <h3>{this.props.formtype}</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Room name
                        <input
                            type="text"
                            value={this.state.title}
                            onChange={this.update('title')}
                        />
                    </label>
                    <button type='submit' className='button' value={this.props.formtype}></button>
                </form>
            </div>
        )
    }
}

export default RoomForm;