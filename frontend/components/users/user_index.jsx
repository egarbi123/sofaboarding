import React from 'react';
import { Redirect } from 'react-router-dom';

class UserIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        let usersObject = this.props.state.users;
        let usersArray = Object.entries(usersObject);
        // console.log(usersArray);
        return (
            <div>
                <h3>All users, </h3>
                <ul>
                    {usersArray.map((user) => {
                        return (<li key={user[0]}>{user[1].name}</li>)
                    }
                    )}
                </ul>
            </div>
        )
    }
}

export default UserIndex;