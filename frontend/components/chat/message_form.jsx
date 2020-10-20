import React from 'react';

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        console.log('this.props:', this.props)
        console.log('this.state:', this.state)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit', this.state)
        this.props.action(this.state);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            this.handleSubmit(e)
        }
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    render() {
        return (
            <div>
                <h4>{this.props.formtype}</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>Message
                        <input
                            type="text"
                            // value={this.state.text}
                            onChange={this.update('text')}
                        />
                    </label>
                    <button type='submit' className='button' value={this.props.formtype}></button>
                </form>
            </div>
        )
    }
}

export default MessageForm;
