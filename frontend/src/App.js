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
import { Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import md5 from 'md5';
import Navigation from './Navigation/Navigation';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
// import UserProfile from './User/UserProfile';

//images
import './asserts/css/App.css';

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
import {
    askLogin,
    setUserInfo
} from './REDUX/actions/actionsUser';


import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` });


function takeGoodsFromLocalStorage() {
    let storage = window.localStorage;
    let arr = storage.getItem('ShoppingBasket');
    arr = (arr) ? JSON.parse(arr) : arr;
    let goodsInBasket = (arr) ?
        new Set([...arr]) :
        new Set();
    return goodsInBasket;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.addError = this.addError.bind(this);
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
        const { match } = this.props;
        let authElement = (
            <React.Fragment>
                <Col className='d-flex justify-content-end'>
                    <NavLink
                        className="p-3"
                        onClick={() => {
                            this.props.askLogin();
                        }}
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to='/registration'
                        className="p-3"
                        onClick={() => {
                            window.location.href = '/registration';
                        }}
                    >
                        Registration
                    </NavLink>
                </Col>
            </React.Fragment>
        );

        if (this.props.userInfo.role === 'Login') {
            authElement = (
                <React.Fragment>
                    <Col className='ml-auto d-flex justify-content-end'>
                        <LoginForm
                            handleConverStatusUser={this.covertLoginFormToRegForm}
                            handleSetStateInApp={this.setUserInState}
                            userState={this.state.user}
                            onHide={() => {
                                this.props.setUserInfo({ role: '' });
                            }}
                        >
                            LoginForm
                        </LoginForm>
                    </Col>
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
                <Router>
                    <Navigation match={match}>
                        {authElement}

                        <ShoppingBasketHeader
                            goods={this.state.goodsInBasket}
                            showCompleteBasket={this.showCompleteBasket}

                        />
                    </Navigation>
                    <ErrorLayer
                        Errors={this.props.errors}
                    />
                    <Route exact path='/' render={() => (
                        <Container>
                            <h1>Hello, I am MainPage!</h1>
                        </Container>
                    )}></Route>
                    <Route path={`/about`} render={() => (
                        <Container>
                            <h1>Hello, I am AboutPage!</h1>
                        </Container>
                    )}></Route>
                    <Route path='/catalogue' component={Catalogue}></Route>
                    <Route path='/contacts' render={() => (
                        <Container>
                            <h1>Hello, I am ContactPage!</h1>
                        </Container>)}>
                    </Route>

                    <Route path='/user/history' component={UserHistory}></Route>
                    <Route path='/user/profile' component={UserProfile}></Route>
                    <Route path='/basket' component={ShoppingBasket}></Route>

                </Router>
            </React.Fragment>
        );
    }
}

App.propTypes = {
    mainContent: PropTypes.object,
    errors: PropTypes.array,
    showCatalogue: PropTypes.func,
    showUserHistory: PropTypes.func,
    showShoppingBasket: PropTypes.func,
    initBasketFromLocalStorage: PropTypes.func,
    addErrorToState: PropTypes.func,
    deleteErrorFromState: PropTypes.func,
    match: PropTypes.object,
    askLogin: PropTypes.func,
    setUserInfo: PropTypes.func,
    userInfo: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        historyBasket: state.userHeaderReducers.historyBasket,
        mainContent: state.mainContent,
        errors: state.errorReducers.Errors,
        userInfo: state.userHeaderReducers.userInfo
    };
};


export default connect(mapStateToProps, {
    showCatalogue,
    showUserHistory,
    showShoppingBasket,
    showUserProfile,
    initBasketFromLocalStorage,
    addErrorToState,
    deleteErrorFromState,
    askLogin,
    setUserInfo
})(App);