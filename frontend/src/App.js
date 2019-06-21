import React, { Component } from 'react';
import { Col, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'md5';
import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';


import { connect } from 'react-redux';
import {
    showCatalogue,
    showUserHistory,
    showShoppingBasket,
    showUserProfile
} from './actions/actionsMainContent';
import {
    initBasketFromLocalStorage
} from './actions/actionsShoppingBasket';
import {
    addErrorToState,
    deleteErrorFromState
} from './actions/actionsErrors';
import {
    askLogin,
    setUserInfo,
    askReg
} from './actions/actionsUser';

import Catalogue from './components/Catalogue/Catalogue';
import LoginForm from './containers/LoginForm/LoginForm';
import RegForm from './components/RegistrForm/RegistrForm';
import UserHeader from './containers/User/UserHeader';
import ShoppingBasketHeader from './containers/ShoppingBasket/ShoppingBasketHeader';
import ShoppingBasket from './containers/ShoppingBasket/ShoppingBasket';
import UserHistory from './containers/User/UserHistory';
import UserProfile from './containers/User/UserProfile';
import MainPage from './components/MainPage/MainPage';
import ErrorLayer from './components/ErrorLayer/ErrorLayer';
import Navigation from './components/Navigation/Navigation';


import './asserts/css/App.css';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` });


function takeGoodsFromLocalStorage() {
    const storage = window.localStorage;
    let arr = storage.getItem('ShoppingBasket');
    arr = (arr) ? JSON.parse(arr) : arr;
    const goodsInBasket = (arr)
        ? new Set([...arr])
        : new Set();
    return goodsInBasket;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.covertLoginFormToRegForm = this.covertLoginFormToRegForm.bind(this);
        this.setUserInState = this.setUserInState.bind(this);
        this.addItemToBasket = this.addItemToBasket.bind(this);
        this.showCompleteBasket = this.showCompleteBasket.bind(this);
        this.removeItemFromBasket = this.removeItemFromBasket.bind(this);
        this.roles = ['Admin', 'User', 'Customer', 'SuperAdmin'];
        this.state = {
            user: {
                role: 'Guest'
            },
            goodsInBasket: new Set()
        };
    }

    componentDidMount() {
        const { initBasketFromLocalStorage, addErrorToState } = this.props;
        initBasketFromLocalStorage(takeGoodsFromLocalStorage());
        const token = window.localStorage.getItem('Authorization');
        const self = this;
        if (token) {
            client({
                method: 'POST',
                path: '/logintoken',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((data) => {
                if (data.status.code === 200) {
                    const storage = window.localStorage;
                    storage.setItem('Authorization', data.entity.token);
                    self.setUserInState(data.entity);
                }
            }).catch((e) => {
                const d = new Date();
                addErrorToState({
                    id: md5(`${'Notification from App'}${d.valueOf()}`),
                    level: 'Info',
                    message: e.entity.message
                });
                window.localStorage.removeItem('Authorization');
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

    addItemToBasket(id) {
        const { goodsInBasket } = this.state;
        const setOfGoodsItemsInBasket = goodsInBasket;
        setOfGoodsItemsInBasket.add(id);
        this.setState({
            goodsInBasket: setOfGoodsItemsInBasket
        });
    }

    removeItemFromBasket(id) {
        const { goodsInBasket } = this.state;
        const setOfGoodsItemsInBasket = goodsInBasket;
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
            }
        });
    }

    showCompleteBasket() {
        const { mainContent, showCatalogue, showShoppingBasket } = this.props;
        if (mainContent.target === 'ShoppingBasket') {
            showCatalogue();
        } else {
            showShoppingBasket();
        }
    }

    render() {
        const {
            match, askLogin, askReg, userInfo, setUserInfo, errors
        } = this.props;
        const { user, goodsInBasket } = this.state;
        const authElement = (
            <React.Fragment>
                <Col
                    className='ml-auto d-flex justify-content-end' style={{
                        height: '54px'
                    }}
                >
                    <NavLink
                        className='p-3'
                        onClick={() => {
                            askLogin();
                        }}
                        to='/'
                        key='login'
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to='/'
                        className='p-3'
                        onClick={() => {
                            askReg();
                        }}
                        key='reg'
                    >
                        Registration
                    </NavLink>
                </Col>
            </React.Fragment>
        );
        let authElements = authElement;
        if (userInfo.role === 'Login') {
            authElements = (
                <React.Fragment>

                    {authElement}
                    <LoginForm
                        handleConverStatusUser={askReg}
                        handleSetStateInApp={this.setUserInState}
                        userState={user}
                        onHide={() => {
                            setUserInfo({ role: '' });
                        }}
                    >
                        LoginForm
                    </LoginForm>

                </React.Fragment>
            );
        } else if (userInfo.role === 'Reg') {
            authElements = (
                <React.Fragment>

                    {authElement}
                    <RegForm
                        setUserInState={this.setUserInState}
                        show
                        onHide={() => {
                            setUserInfo({ role: '' });
                        }}
                    />

                </React.Fragment>

            );
        } else if (this.roles.indexOf(user.role) >= 0) {
            authElements = (
                <UserHeader
                    userInfo={user}
                    setUserInState={this.setUserInState}
                />
            );
        }
        return (

            <div style={{
                position: 'relative'
            }}
            >
                <Router>
                    <Navigation match={match}>
                        {authElements}

                        <ShoppingBasketHeader
                            goods={goodsInBasket}
                            showCompleteBasket={this.showCompleteBasket}
                        />
                    </Navigation>
                    <ErrorLayer
                        Errors={errors}
                    />
                    <Route
                        path='/about' render={() => (
                            <Container>
                                <h1>Hello, I am AboutPage!</h1>
                                <p>
                                    {'Lorem ipsum dolor sit, amet consectetur adipisicing elit. \
                                Totam asperiores maxime minus neque hic culpa minima laudantium, \
                                labore eos fuga, \
                                doloremque quae eligendi dolore explicabo magnam voluptas autem atque velit!'}
                                </p>
                            </Container>
                        )}
                    />
                    <Route path='/catalogue' component={Catalogue} />
                    <Route
                        path='/contacts' render={() => (
                            <Container className='mt-3'>
                                <h3>Contact Us: </h3>
                                <ul>
                                    <li>Phone: 555-55-55</li>
                                    <li>Address: st. John 12</li>
                                    <li>Email: email@email.com</li>
                                </ul>
                            </Container>
                        )}
                    />

                    <Route path='/user/history' component={UserHistory} />
                    <Route path='/user/profile' component={UserProfile} />
                    <Route path='/basket' component={ShoppingBasket} />
                    <Route exact path='/' component={MainPage} />
                </Router>
            </div>
        );
    }
}

App.propTypes = {
    mainContent: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    showCatalogue: PropTypes.func.isRequired,
    showUserHistory: PropTypes.func.isRequired,
    showShoppingBasket: PropTypes.func.isRequired,
    initBasketFromLocalStorage: PropTypes.func.isRequired,
    addErrorToState: PropTypes.func.isRequired,
    deleteErrorFromState: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    askLogin: PropTypes.func.isRequired,
    setUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
    askReg: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    historyBasket: state.userHeaderReducers.historyBasket,
    mainContent: state.mainContent,
    errors: state.errorReducers.Errors,
    userInfo: state.userHeaderReducers.userInfo
});


export default connect(mapStateToProps, {
    showCatalogue,
    showUserHistory,
    showShoppingBasket,
    showUserProfile,
    initBasketFromLocalStorage,
    addErrorToState,
    deleteErrorFromState,
    askLogin,
    setUserInfo,
    askReg
})(App);
