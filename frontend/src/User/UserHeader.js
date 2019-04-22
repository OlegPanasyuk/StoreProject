import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Button } from 'react-bootstrap';
import { request } from 'http';

import store from '../REDUX/store';
import { connect } from 'react-redux';
import { showHistoryOfShoppping } from '../REDUX/actions/actionsHistoryOfShopping';

// For Requests to server
import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: 'http://localhost:3300' });

class UserHeader extends Component {

    requestUserHistoryBasket() {
        let token = window.localStorage.getItem('Authorization');
        client({
            method: 'GET',
            path: '/basket/users/history',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(data => {
            if (data.entity === 'Unauthorizated') {
                window.location.reload();
            } else if (data.entity.length > 0) {
                this.props.showHistoryOfShoppping(data.entity);
            }
        });
    }

    render() {
        let { userInfo, setUserInState } = this.props;
        return (

            <Row className='d-flex justify-content-end mt-1'>
                <Col sm='auto' className='d-flex align-items-center'>
                    <div className='mr-1'>User: {userInfo.username}</div>
                    <Button
                        className='mr-1'
                        variant='light'
                        onClick={() => {
                            alert('Profile');
                        }}>
                        Profile
                    </Button>
                    <Button
                        className='mr-1'
                        variant='light'
                        onClick={() => {
                            this.requestUserHistoryBasket();
                            //this.props.showHistoryOfShoppping([1,2,3]);
                        }}>
                        History
                    </Button>
                    <Button
                        className='mr-1'
                        variant='light'
                        onClick={() => {
                            window.localStorage.removeItem('Authorization');
                            setUserInState({
                                role: 'Guest'
                            });
                        }}>
                        Logout
                    </Button>
                </Col>
            </Row>

        );

    }
}

UserHeader.propTypes = {
    userInfo: PropTypes.object,
    setUserInState: PropTypes.func
};

const mapStoreToProps = function (state) {
    return (
        {
            historyBasket: state.userHeaderReducers.historyBasket
        }
    );
};

export default connect(mapStoreToProps, {
    showHistoryOfShoppping
})(UserHeader);

