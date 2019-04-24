import React, { Component } from 'react';
import Catalogue from './Catalogue/Catalogue';
import LoginForm from './LoginForm/LoginForm';
import RegForm from './RegistrForm/RegistrForm';
import UserHeader from './User/UserHeader';
import ShoppingBacketHeader from './ShoppingBasket/ShoppingBasketHeader';
import ShoppingBasket from './ShoppingBasket/ShoppingBasket';
import UserHistory from './User/UserHistory';
import UserProfile from './User/UserProfile';
import { Row, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import UserProfile from './User/UserProfile';

//Redux
import { connect } from 'react-redux';
import { 
    showCatalogue, 
    showUserHistory, 
    showShoppingBasket,
    showUserProfile
} from './REDUX/actions/actionsMainContent';

import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: 'http://localhost:3300' });

class App extends Component {
    constructor(props) {
        super(props);
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
        };
    }

    componentDidMount() {
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
                alert(e.entity.message);
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
            }
        });
    }

    showCompleteBasket() {
        if (this.props.mainContent.target === 'ShoppingBasket') {
            this.props.showCatalogue();
        } else {
            this.props.showShoppingBasket();
        }
        
        // let str = null;
        // if (this.state.mainContent === 'showBasket') {
        //     str = 'Catalogue';
        // } else {
        //     str = 'showBasket';
        // }
        // this.setState(() => ({
        //     mainContent: str
        // }));
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
                <UserHistory/>
            );
        }
        if (this.props.mainContent.target === 'UserProfile') {
            mainContent = (
                <UserProfile/>
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
                <RegForm setUserInState={this.setUserInState} />
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
                            <ShoppingBacketHeader
                                goods={this.state.goodsInBasket}
                                showCompleteBasket={this.showCompleteBasket}

                            />
                        </Col>
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
    showShoppingBasket: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        historyBasket: state.userHeaderReducers.historyBasket,
        mainContent: state.mainContent
    };
};


export default connect(mapStateToProps, { 
    showCatalogue, 
    showUserHistory, 
    showShoppingBasket,
    showUserProfile
})(App);