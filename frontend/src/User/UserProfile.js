import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';


export class UserProfile extends Component {

    render() {
        let { userInfo } = this.props;
        return (
            <Container>
                <h3>User Profile:</h3>
                <p> 
                    <b>Name:</b> {userInfo.username}<br/>
                    <b>Email:</b> {userInfo.email}<br/>
                    <b>Role:</b> {userInfo.role}<br/>
                    <b>Create Time:</b> {userInfo.create_time}<br/>
                </p>
            </Container>
        );
    }
}

UserProfile.propTypes = {
    userInfo: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.userHeaderReducers.userInfo
    };
};

export default withRouter(connect(mapStateToProps)(UserProfile));