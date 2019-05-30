import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';
import NavBarAdminPanel from './NavBarAdminPanel/NavBarAdminPanel';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

//Place for import components
import GoodsPanel from './GoodsPanel/GoodsPanel';
import ErrorLayer from '../Error/ErrorLayer';
import UsersPanel from './UsersPanel/UsersPanel';
import ControlCatalogue from './ControlCatalogue/ControlCatalogue';
import ControlOfImages from './ControlOfImages/ControlOfImages';

//Redux
//Redux 
import { connect } from 'react-redux';
import {
    userAuthorizedSuccess
} from '../REDUX/adminPanel/actions/actionsLoginForm';

//cors
import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` });


export class AdminPanel extends Component {



    UNSAFE_componentWillMount() {
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
                    this.props.userAuthorizedSuccess(data.entity);
                }
            }).catch(e => {
                //Needs Error Object to push notifications to UI
                // const d = new Date();
                // this.props.addErrorToState({
                //     id: md5(`${'Notification from App'}${d.valueOf()}`),
                //     level: 'Info',
                //     message: e.entity.message
                // });
                window.localStorage.removeItem('Authorization');
            });
        } 
    }

    render() {
        const { match = { path: '', url: '' } } = this.props;
        return (
            <Router>

                <Switch>
                    <Route path={`${match.path}/login`} component={LoginForm}></Route>
                    <Route render={() => (
                        (!this.props.user.token)
                            ?
                            (
                                <Redirect to={`${match.path}/login`} />
                            )
                            :
                            (
                                <React.Fragment>
                                    <Router>
                                        <NavBarAdminPanel match={match} />
                                        <Container className='mt-3'>
                                            <Route path={`${match.path}/goods`} component={GoodsPanel} />
                                            <Route path={`${match.path}/users`} component={UsersPanel} />
                                            <Route path={`${match.path}/catalogue`} component={ControlCatalogue} />
                                            <Route path={`${match.path}/images`} component={ControlOfImages} />
                                        </Container>
                                        <ErrorLayer
                                            Errors={this.props.errors}
                                        />

                                    </Router>
                                </React.Fragment>
                            ))} />
                </Switch>

            </Router>
        );
    }
}

AdminPanel.propTypes = {
    match: PropTypes.object,
    errors: PropTypes.array,
    user: PropTypes.object,
    userAuthorizedSuccess: PropTypes.func
};


const mapStoreToProps = (state) => {
    return ({
        user: state.adminPanel_User,
        errors: state.errorReducers.Errors
    });
};

export default connect(mapStoreToProps, {
    userAuthorizedSuccess
})(AdminPanel);
//