import React from 'react';

class LogInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.passwordIsGood = false;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        // e.preventDefault();
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
        return (
            <div className="sign">
                <h3>LOG IN</h3>
                <form className="sign-form" >
                    <div className="sign-text row">
                        <p>Email:</p>
                        <input
                            type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                        />
                    </div>
                    <div className="sign-text row">
                        <p>Password:</p>
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                        />
                    </div>
                    <div className="sign-button-space">
                        <div onClick={() => this.handleSubmit()} className="button">LOG IN</div>
                    </div>
                </form>
                <div className="sign-button-space">
                        <div className="button" onClick={() => this.loginSampleUser()}>LOG IN AS SAMPLE USER</div>
                    </div>
            </div>
        )
    }
}

export default LogInForm;