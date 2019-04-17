import React, { Component } from 'react';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.user;
    }

    render() {
        return (
            <div>Hello I'm UserProfile</div>
        );
    }
}

export default UserProfile;