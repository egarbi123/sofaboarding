import React from 'react';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile_picture: null,
            userBio: "",
            currentBio: "",
            placeholder: "Type new bio here..."
        };
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.imageRender = this.imageRender.bind(this);
        this.addProfilePic = this.addProfilePic.bind(this);
        this.handleBio = this.handleBio.bind(this);
    }

    componentDidMount() {
        this.props.fetchBio();
    }

    componentDidUpdate() {
        this.determineBio();
    }

    determineBio() {
        if (Object.values(this.props.state.bio).length) {
            let bios = Object.values(this.props.state.bio);
            let myId = this.props.state.session.id;
            bios.map(bio => {
                if (bio.user_id === myId) {
                    if (this.state.currentBio !== bio.user_bio) {
                        this.setState({"currentBio": bio.user_bio});
                    }
                }
            })
        }
    }

    handleFile(e) {
        e.preventDefault();
        this.setState({ 'profile_picture': e.currentTarget.files[0]})
        this.file = e.currentTarget.files[0];
    }

    handleSubmit(e) {
        this.unshowAddProfilePic();
        e.preventDefault();
        let formData = new FormData();
        formData.append('user[id]', this.props.state.session.id);
        formData.append('user[name]', this.props.state.users[this.props.state.session.id].name);
        formData.append('user[email]', this.props.state.users[this.props.state.session.id].email);
        formData.append('user[profile_picture]', this.state.profile_picture);
        this.props.updateUser({form: formData, user: this.props.state.users[this.props.state.session.id]});
    }

    imageRender() {
        if (Object.values(this.props.state.users).length > 0 && this.props.state.users[this.props.state.session.id] && this.props.state.users[this.props.state.session.id].profilePicUrl) {
            return (
                <img onClick={this.showAddProfilePic} className="profile-pic" src={this.props.state.users[this.props.state.session.id].profilePicUrl}/>
            )
        } else {
            return (
                <img onClick={this.showAddProfilePic} className="profile-pic" src={window.profile_pic}/>
            )
        }
    }
    
    showAddProfilePic() {
        document.getElementById("pic-form").style.display = "flex";
    }

    unshowAddProfilePic() {
        document.getElementById("pic-form").style.display = "none";
    }

    addProfilePic() {
        return (
            <form id="pic-form" onSubmit={this.handleSubmit}>
                <div>
                    <div className="add-image">
                        <input
                            type="file"
                            className="pic-button"
                            onChange={this.handleFile}
                        />
                        <button className="pic-accept-button">Save new image</button>
                    </div>
                </div>
            </form>
        )
    }

    showBio() {
        return (
            <p>Bio: {this.state.currentBio}</p>
        )
    }

    update(field) {
        return e => this.setState({[field]: e.currentTarget.value })
    }

    handleBio() {
        // e.preventDefault();
        let object = {}
        object['user_id'] = this.props.state.session.id;
        object['user_bio'] = this.state.userBio;
        if (this.props.state.bio[this.props.state.session.id]) {
            object['id'] = this.props.state.bio[this.props.state.session.id].id
        }
        if (this.state.currentBio) {
            this.props.updateBio(object);
        }
        this.props.createBio(object);
        this.setState({userBio: ""})
    }

    render() {
        let name = "NAME"
        if (Object.values(this.props.state.users).length > 0 && this.props.state.users[this.props.state.session.id] && this.props.state.users[this.props.state.session.id].name) {
            name = this.props.state.users[this.props.state.session.id].name
        }
        return (
            <div className="user-info">
                <div className="info-pic">
                    <div className="photo-container">
                        {this.imageRender()}
                        {this.addProfilePic()}
                    </div>
                </div>
                <div className="info-name">
                    <div className="welcome-message">
                        <h3>Welcome to SofaBoarding, {name}!</h3>
                    </div>
                    <div className="bio-container">
                        {this.showBio()}
                        <form className="bio-form">
                            <textarea
                                id="bio-text"
                                value={this.state.userBio}
                                onChange={this.update("userBio")}
                                placeholder={this.state.placeholder}
                                />
                            <div className="bio-submit">
                                <div onClick={() => this.handleBio()} className="button">SUBMIT BIO</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserInfo;