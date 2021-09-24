import React from 'react';
import { Link } from 'react-router-dom';


class FriendCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 3
        };
    }

    imageRender(user) {
        if (user.profilePicUrl) {
            return (
                <img className="profile-pic-mid" src={user.profilePicUrl} />
            )
        } else {
            return (
                <img className="profile-pic-mid" src={window.profile_pic} />
            )
        }
    }

    setActiveFriend(friendId) {
        this.props.makeActiveFriend(friendId)
    }

    clickLeft() {
        if (this.state.start > 3) {
            this.setState({start: this.state.start - 3});
        }
    }

    clickRight() {
        if (this.state.start <= this.props.friendsList.length - 3) {
            this.setState({start: this.state.start + 3});
        }
    }

    showCarousel() {
        let list = this.props.friendsList;
        let start = this.state.start;
        let display = [];
        for (let i = start - 3; i < start; i++) {
            display.push(list[i]);
        }
        if (display.length > 1 && display[0] !== undefined) {
            return display.map((user) => {
                if (user !== undefined) {
                    return (
                        <li key={user.id} onClick={() => this.setActiveFriend(user.id)}>
                            <Link className="nav-link" to={`/${user.id}`}>
                                <div key={user.id} className="med-user-cont">
                                    <div className="med-image-cont">
                                        {this.imageRender(user)}
                                    </div>
                                    <p>
                                        {user.name}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    )
                }
            })
        }
        return <div>Almost with you ;)</div>
    }

    render() {
        if (this.props.friendsList.length < 1) {
            return (<div>CURRENTLY NO {this.props.label}</div>)
        } else if (this.props.friendsList.length < 4) {
            return (
                <div className="section-border">
                    <div className="friends-section">
                        <h3>{this.props.label}</h3>
                        <div className="carousel">
                            <ul>
                                {this.showCarousel()}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="section-border">
                    <div className="friends-section">
                        <h3>{this.props.label}</h3>
                        <div className="carousel">
                            <div className="buttonLeft" onClick={() => this.clickLeft()}><i className="arrow left"></i></div>
                            <ul>
                                {this.showCarousel()}
                            </ul>
                            <div className="buttonRight" onClick={() => this.clickRight()}><i className="arrow right"></i></div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default FriendCarousel;