import React from 'react';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.fetchUsers();
    }

    render() {
        console.log('User_info:', this.props)
        return (
            <div className="user-info">
                <div className="info-pic"></div>
                <p>Welcome, {this.props.state.users[this.props.state.session.id].name}!</p>
            </div>
        )
    }
}

export default UserInfo;