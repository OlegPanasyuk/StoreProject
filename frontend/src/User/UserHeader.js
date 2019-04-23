import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Button } from 'react-bootstrap';

//Redux
import { connect } from 'react-redux';
import { showHistoryOfShoppping } from '../REDUX/actions/actionsHistoryOfShopping';
import { showUserHistory } from '../REDUX/actions/actionsMainContent';

// For Requests to server
import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: 'http://localhost:3300' });

export class UserHeader extends Component {

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
                this.props.showUserHistory();
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
    setUserInState: PropTypes.func,
    showHistoryOfShoppping: PropTypes.func,
    showUserHistory: PropTypes.func
};

const mapStoreToProps = function (state) {
    return (
        {
            historyBasket: state.userHeaderReducers.historyBasket
        }
    );
};

export default connect(mapStoreToProps, {
    showHistoryOfShoppping,
    showUserHistory
})(UserHeader);
