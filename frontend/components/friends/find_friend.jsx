import React from 'react';

class FindFriends extends React.Component {
    constructor(props) {
        super(props);
        console.log("props,", this.props);
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        // console.log('this.props.state', this.props.state)
        return (
            <div className="find-friends">
            </div>
        )
    }
}

export default FindFriends;