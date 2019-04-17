import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Container, Button } from 'react-bootstrap';

class UserHeader extends Component {
    render() {
        let { userInfo, setUserInState } = this.props;
        return (
            <Container> 
                <Row className='d-flex justify-content-end'>
                    <Col sm='auto' className='d-flex align-items-center'>
                        <div className='mr-1'>User: {userInfo.username}</div>
                        <Button 
                            variant='light' 
                            onClick={()=>{
                                window.localStorage.removeItem('Authorization');
                                setUserInState({
                                    role: 'Guest'
                                });}}>
                            Logout
                        </Button>
                    </Col>
                </Row>
            </Container>
        );

    }
}

UserHeader.propTypes = {
    userInfo: PropTypes.object, 
    setUserInState: PropTypes.func
};

export default UserHeader;