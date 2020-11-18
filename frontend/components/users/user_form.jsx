import React from 'react';
import {} from 'react-router-dom';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.passwordIsGood = false;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.verifyPassword();
        if (this.passwordIsGood || this.props.formtype === 'Login User') {
            this.props.action(this.state);
        }
    }

    update(field) {
        return e => this.setState( { [field]: e.currentTarget.value } )    
    }

    samePassword() {
        if (this.state.password === this.state.password2) {
            this.passwordIsGood = true;
        } else {
            this.passwordIsGood = false;
        }
    }

    verifyPassword() {
        e => this.setState( { password2: e.currentTarget.value } );
        this.samePassword();
    }

    ifSignUp() {
        if (this.props.formtype === 'Create User') {
            return (
                <div className="row">
                    <p>Repeat Password:</p>
                    <input 
                        type="password"
                        value={this.state.password2}
                        onChange={
                                    this.verifyPassword()
                                }
                    />
                </div>
            )
        }
    }

    render() {
        return (
            <div className="sign">
                <p>{this.props.formtype}</p>
                <form className="sign-form" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <p>Name:</p>
                        <input 
                            type="text"
                            value={this.state.name}
                            onChange={this.update('name')}
                        />
                    </div>
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
                    {this.ifSignUp()}
                    <button type="submit" className="button">{this.props.formtype}</button>
                </form>
            </div>
        )
    }
}


export default UserForm;