import React from 'react';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        // console.log("props,", this.props);
        this.state = this.props.user;
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        // console.log('this.props.state', this.props.state)
        return (
            <div>
                <h3>Welcome, {this.props.state.users[this.props.state.session.id].name}</h3>
            </div>
        )
    }
}

export default UserProfile;