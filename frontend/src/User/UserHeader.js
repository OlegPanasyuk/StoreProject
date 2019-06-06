import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// For Requests to server
import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

// Redux
import { connect } from 'react-redux';
import { setUserInfo } from '../REDUX/actions/actionsUser';
import { showHistoryOfShoppping } from '../REDUX/actions/actionsHistoryOfShopping';
import {
    showUserHistory,
    showUserProfile,
    showCatalogue
} from '../REDUX/actions/actionsMainContent';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` });

export class UserHeader extends Component {
    requestUserInfo() {
        const token = window.localStorage.getItem('Authorization');
        const { setUserInfo, showUserProfile } = this.props;
        client({
            method: 'GET',
            path: '/user/',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((data) => {
            if (data.entity === 'Unauthorized') {
                window.location.reload();
            } else {
                setUserInfo(JSON.parse(data.entity));
                showUserProfile();
            }
        });
    }

    requestUserHistoryBasket() {
        const token = window.localStorage.getItem('Authorization');
        const { showHistoryOfShoppping, showUserHistory } = this.props;
        client({
            method: 'GET',
            path: '/basket/users/history',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((data) => {
            if (data.entity === 'Unauthorized') {
                window.location.reload();
            } else if (data.entity.length > 0) {
                showHistoryOfShoppping(data.entity);
                showUserHistory();
            }
        });
    }

    render() {
        const { userInfo, setUserInState, showCatalogue } = this.props;
        return (

            <Row className='d-flex align-items-center justify-content-end mt-1 ml-auto'>
                <Col sm='auto' className='d-flex align-items-center'>
                    <div
                        className='mr-1'
                        style={{
                            color: 'var(--light)'
                        }}
                    >
                        User:
                        {userInfo.username}
                    </div>
                    <Button
                        className='mr-1'
                        variant='light'
                        onClick={() => {
                            this.requestUserInfo();
                        }}
                    >
                        <Link
                            to='/user/profile'
                        >
                            Profile
                        </Link>
                    </Button>
                    <Button
                        className='mr-1'
                        variant='light'
                        onClick={() => {
                            this.requestUserHistoryBasket();
                        }}
                    >
                        <Link
                            to='/user/history'
                        >
                            History
                        </Link>
                    </Button>
                    <Button
                        className='mr-1'
                        variant='light'
                        onClick={() => {
                            window.localStorage.removeItem('Authorization');
                            showCatalogue();
                            setUserInState({
                                role: 'Guest'
                            });
                        }}
                    >
                        Logout
                    </Button>
                </Col>
            </Row>
        );
    }
}

UserHeader.propTypes = {
    userInfo: PropTypes.object.isRequired,
    setUserInState: PropTypes.func.isRequired,
    showHistoryOfShoppping: PropTypes.func.isRequired,
    showUserHistory: PropTypes.func.isRequired,
    setUserInfo: PropTypes.func.isRequired,
    showUserProfile: PropTypes.func.isRequired,
    showCatalogue: PropTypes.func.isRequired
};

const mapStoreToProps = state => (
    {
        historyBasket: state.userHeaderReducers.historyBasket
    }
);

export default connect(mapStoreToProps, {
    showHistoryOfShoppping,
    showUserHistory,
    setUserInfo,
    showUserProfile,
    showCatalogue
})(UserHeader);
