import React from 'react';
import { } from 'react-router-dom';

class LogInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.passwordIsGood = false;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit:', this.state)
        this.props.action(this.state);
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    verifyPassword() {
        e => this.setState({ password2: e.currentTarget.value });
        this.samePassword();
    }

    render() {
        return (
            <div className="sign">
                <p>Log In</p>
                <form className="sign-form" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <p>Email:</p>
                        <input
                            type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                        />
                    </div>
                    <div className="row">
                        <p>Password:</p>
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                        />
                    </div>
                    <button type="submit" className="button">{this.props.formtype}</button>
                </form>
            </div>
        )
    }
}

export default LogInForm;