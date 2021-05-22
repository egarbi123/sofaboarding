import React from 'react';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile_picture: null,
            userBio: "",
            currentBio: ""
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
        if (this.props.state.bio) {
            let bios = this.props.state.bio;
            let myId = this.props.state.session.id;
            console.log(bios);
            console.log(bios[myId].user_bio);
            if (this.state.currentBio !== bios[myId].user_bio) {
                this.setState({"currentBio": bios[myId].user_bio});
            }
        }
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
            <p>BIO: {this.state.currentBio}</p>
        )
    }

    update(field) {
        return e => this.setState({[field]: e.currentTarget.value })
    }

    handleBio(e) {
        e.preventDefault();
        console.log('SUBMIT')
        let object = {}
        object['user_id'] = this.props.state.session.id;
        object['user_bio'] = this.state.userBio;
        if (this.props.state.bio[this.props.state.session.id]) {
            object['id'] = this.props.state.bio[this.props.state.session.id].id
        }
        // console.log(object);
        if (this.state.currentBio) {
            console.log('IN IF STATEMENT')
            this.props.updateBio(object);
        }
        this.props.createBio(object);
        
    }

    render() {
        console.log(this);
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
                    <form className="bio-form" onSubmit={this.handleBio}>
                        <p>Your Bio:</p>
                        <input
                            type="text"
                            value={this.state.userBio}
                            onChange={this.update("userBio")}
                        />
                        <button className="button">Submit changes</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default UserInfo;