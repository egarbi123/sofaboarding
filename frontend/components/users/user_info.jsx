import React from 'react';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile_picture: null,
            user_bio: ""
        };
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.imageRender = this.imageRender.bind(this);
        this.addProfilePic = this.addProfilePic.bind(this);
    }

    handleFile(e) {
        e.preventDefault();
        this.setState({ 'profile_picture': e.currentTarget.files[0]})
        this.file = e.currentTarget.files[0];
    }

    handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('user[id]', this.props.state.session.id);
        formData.append('user[name]', this.props.state.users[this.props.state.session.id].name);
        formData.append('user[email]', this.props.state.users[this.props.state.session.id].email);
        formData.append('user[profile_picture]', this.state.profile_picture);
        this.props.updateUser({form: formData, user: this.props.state.users[this.props.state.session.id]});
    }

    imageRender() {
        // console.log(this.props.state.users)
        if (Object.values(this.props.state.users).length > 0 && this.props.state.users[this.props.state.session.id] && this.props.state.users[this.props.state.session.id].profilePicUrl) {
            return (
                <img className="profile-pic" src={this.props.state.users[this.props.state.session.id].profilePicUrl}/>
            )
        } else {
            return (
                <img className="profile-pic" src={window.profile_pic} />
            )
        }
    }
    
    addProfilePic() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="pic-form">
                    <div className="add-image">
                        Want a new profile picture?
                        <input
                            type="file"
                            className="pic-button"
                            // style={{ display: 'none' }}
                            onChange={this.handleFile}
                        />
                        <button className="pic-button">Save Picture</button>
                    </div>
                </div>
            </form>
        )
    }

    showBio() {
        return (
            <p>{this.state.user_bio}</p>
        )
    }

    render() {
        let name = "NAME"
        if (Object.values(this.props.state.users).length > 0 && this.props.state.users[this.props.state.session.id] && this.props.state.users[this.props.state.session.id].name) {
            name = this.props.state.users[this.props.state.session.id].name
        }
        // console.log( name, this);
        return (
            <div className="user-info">
                <div className="info-pic">
                    <div className="photo-container">
                        {this.imageRender()}
                        {this.addProfilePic()}
                    </div>
                </div>
                <div className="info-name">
                    <p>Welcome, {name}!</p>
                    <div>
                        {this.showBio()}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserInfo;