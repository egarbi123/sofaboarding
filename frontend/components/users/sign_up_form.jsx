import React from 'react';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: ''
        };
        this.passwordIsGood = false;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.verifyPassword();
        if (this.passwordIsGood) {
            this.props.signup(this.state);
        } else {
            window.alert('Passwords do not match! Please try again.');
        }
    }

    loginSampleUser() {
        let object = {"email": "example@example.com", "password": "asdfasdf"};
        this.props.login(object);
    }

    update(field) {
        return e => this.setState( { [field]: e.currentTarget.value } )    
    }

    samePassword() {
        (this.state.password === this.state.password2) ? this.passwordIsGood = true : this.passwordIsGood = false;
    }

    verifyPassword() {
        e => this.setState( { password2: e.currentTarget.value } );
        this.samePassword();
    }

    render() {
        return (
            <div className="sign">
                <h3>SIGN UP</h3>
                <form className="sign-form" >
                    <div className="sign-text row">
                        <p>Name:</p>
                        <input 
                            type="text"
                            value={this.state.name}
                            onChange={this.update('name')}
                        />
                    </div>
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
                    <div className="sign-text row">
                        <p>Repeat Password:</p>
                        <input
                            type="password"
                            value={this.state.password2}
                            onChange={this.update('password2')}
                        />
                    </div>
                    <div className="sign-button-space">
                        <div onClick={() => this.handleSubmit()} className="button">CREATE USER</div>
                    </div>
                </form>
                    <div className="sign-button-space">
                        <div className="button" onClick={() => this.loginSampleUser()}>LOG IN AS SAMPLE USER</div>
                    </div>
            </div>
        )
    }
}


export default SignUpForm;