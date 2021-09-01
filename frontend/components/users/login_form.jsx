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
        this.props.action(this.state);
    }

    loginSampleUser() {
        this.props.action({
            "email": "example@example.com",
            "password": "asdfasdf"
        })
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    verifyPassword() {
        e => this.setState({ password2: e.currentTarget.value });
        this.samePassword();
    }

    render() {
        console.log(this);
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
                    <button onClick={() => this.loginSampleUser()}>LOG IN AS SAMPLE USER</button>
            </div>
        )
    }
}

export default LogInForm;