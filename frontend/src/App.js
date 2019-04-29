import React, { Component } from 'react';
import Catalogue from './Catalogue/Catalogue';
import LoginForm from './LoginForm/LoginForm';
import RegForm from './RegistrForm/RegistrForm';
import UserHeader from './User/UserHeader';
import ShoppingBasketHeader from './ShoppingBasket/ShoppingBasketHeader';
import ShoppingBasket from './ShoppingBasket/ShoppingBasket';
import UserHistory from './User/UserHistory';
import UserProfile from './User/UserProfile';
import ErrorLayer from './Error/ErrorLayer';
import { Row, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import md5 from 'md5';
// import UserProfile from './User/UserProfile';

//Redux
import { connect } from 'react-redux';
import {
    showCatalogue,
    showUserHistory,
    showShoppingBasket,
    showUserProfile
} from './REDUX/actions/actionsMainContent';
import {
    initBasketFromLocalStorage
} from './REDUX/actions/actionsShoppingBasket';
import {
    addErrorToState,
    deleteErrorFromState
} from './REDUX/actions/actionsErrors';


import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: 'http://localhost:3300' });


function takeGoodsFromLocalStorage() {
    let storage = window.localStorage;
    let arr = storage.getItem('ShoppingBasket');
    let goodsInBasket = (arr) ?
        new Set(arr.split(',').map(el => +el)) :
        new Set();
    return goodsInBasket;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.addError = this.addError.bind(this);
        this.covertLoginFormToRegForm = this.covertLoginFormToRegForm.bind(this);
        this.setUserInState = this.setUserInState.bind(this);
        this.addItemToBacket = this.addItemToBacket.bind(this);
        this.showCompleteBasket = this.showCompleteBasket.bind(this);
        this.removeItemFromBasket = this.removeItemFromBasket.bind(this);
        this.roles = ['Admin', 'User', 'Customer'];
        this.state = {
            user: {
                role: 'Guest'
            },
            goodsInBasket: new Set(),
            showModalReg: false
        };
    }

    componentDidMount() {
        this.props.initBasketFromLocalStorage(takeGoodsFromLocalStorage());
        let token = window.localStorage.getItem('Authorization');
        const self = this;
        if (token) {
            client({
                method: 'POST',
                path: '/logintoken',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(data => {
                if (data.status.code === 200) {
                    let storage = window.localStorage;
                    storage.setItem('Authorization', data.entity.token);
                    self.setUserInState(data.entity);
                }
            }).catch(e => {
                //Needs Error Object to push notifications to UI
                const d = new Date();
                this.props.addErrorToState({
                    id: md5(`${'Notification from App'}${d.valueOf()}`),
                    level: 'Info',
                    message: e.entity.message
                });
                
            });
        } else {
            this.setState({
                user: {
                    role: 'Guest'
                }
            });
        }
    }

    setUserInState(user) {
        this.setState({
            user: {
                ...user,
                role: user.role
            }
        });
    }

    addItemToBacket(id) {
        let setOfGoodsItemsInBasket = this.state.goodsInBasket;
        setOfGoodsItemsInBasket.add(id);
        this.setState({
            goodsInBasket: setOfGoodsItemsInBasket
        });
    }

    removeItemFromBasket(id) {
        let setOfGoodsItemsInBasket = this.state.goodsInBasket;
        setOfGoodsItemsInBasket.delete(id);
        this.setState({
            goodsInBasket: setOfGoodsItemsInBasket
        });
    }

    covertLoginFormToRegForm(e) {
        e.preventDefault();
        this.setState({
            user: {
                role: 'GuestUnregistr'
            },
            showModalReg: true
        });
    }

    showCompleteBasket() {
        if (this.props.mainContent.target === 'ShoppingBasket') {
            this.props.showCatalogue();
        } else {
            this.props.showShoppingBasket();
        }
    }

    addError() {
        const d = new Date();
        this.props.addErrorToState({
            id: md5(`${'Lorem ipsum'}${d.valueOf()}`),
            level: 'Error',
            message: 'Lorem Ipsum'
        });
    }

    render() {

        let authElement = (
            <p>
                {this.state.user.role}
            </p>
        );

        let mainContent = (
            <Catalogue addItemToBacket={this.addItemToBacket} />
        );

        if (this.props.mainContent.target === 'ShoppingBasket') {
            mainContent = (
                <ShoppingBasket
                    removeItemFromBasket={this.removeItemFromBasket}
                />
            );
        }
        if (this.props.mainContent.target === 'UserHistory') {
            mainContent = (
                <UserHistory />
            );
        }
        if (this.props.mainContent.target === 'UserProfile') {
            mainContent = (
                <UserProfile />
            );
        }

        if (this.state.user.role === 'Guest') {
            authElement = (
                <React.Fragment>
                    <LoginForm
                        handleConverStatusUser={this.covertLoginFormToRegForm}
                        handleSetStateInApp={this.setUserInState}
                        userState={this.state.user}
                    >
                        LoginForm
                    </LoginForm>

                </React.Fragment>
            );
        } else if (this.state.user.role === 'GuestUnregistr') {
            authElement = (
                <RegForm
                    setUserInState={this.setUserInState}
                    show={this.state.showModalReg}
                    onHide={() => {
                        this.setState({
                            showModalReg: false,
                            user: {
                                role: 'Guest'
                            }
                        });
                    }}
                />
            );
        } else if (this.roles.indexOf(this.state.user.role) >= 0) {

            authElement = (
                <UserHeader
                    userInfo={this.state.user}
                    setUserInState={this.setUserInState}
                />
            );
        }
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col className='col-10'>
                            {authElement}
                        </Col>
                        <Col className='col-2 d-flex justify-content-end align-items-center'>
                            <ShoppingBasketHeader
                                goods={this.state.goodsInBasket}
                                showCompleteBasket={this.showCompleteBasket}

                            />
                        </Col>
                        <ErrorLayer
                            Errors={this.props.errors}
                        />
                    </Row>
                </Container>
                {mainContent}
            </React.Fragment>
        );
    }
}

App.propTypes = {
    mainContent: PropTypes.object,
    showCatalogue: PropTypes.func,
    showUserHistory: PropTypes.func,
    showShoppingBasket: PropTypes.func,
    initBasketFromLocalStorage: PropTypes.func,
    addErrorToState: PropTypes.func,
    deleteErrorFromState: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        historyBasket: state.userHeaderReducers.historyBasket,
        mainContent: state.mainContent,
        errors: state.errorReducers.Errors
    };
};


export default connect(mapStateToProps, {
    showCatalogue,
    showUserHistory,
    showShoppingBasket,
    showUserProfile,
    initBasketFromLocalStorage,
    addErrorToState,
    deleteErrorFromState
})(App);