import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Cors
import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

// Redux
import { connect } from 'react-redux';
import {
    userAuthorizedSuccess
} from '../../actions/adminPanel/actions/actionsLoginForm';

// Place for import components
import GoodsPanelComponent from './GoodsPanel/GoodsPanel';
import ErrorLayer from '../../components/ErrorLayer/ErrorLayer';
import UsersPanelComponent from './UsersPanel/UsersPanel';
import ControlCatalogueComponent from './ControlCatalogue/ControlCatalogue';
import ControlOfImagesComponent from './ControlOfImages/ControlOfImages';
import LoginFormComponent from './LoginForm/LoginForm';
import NavBarAdminPanelComponent from '../../components/AdminPanel/NavBarAdminPanel/NavBarAdminPanel';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` });


export class AdminPanel extends Component {
    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        const token = window.localStorage.getItem('Authorization');
        const { userAuthorizedSuccess } = this.props;
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
                    userAuthorizedSuccess(data.entity);
                }
            }).catch(() => {
                window.localStorage.removeItem('Authorization');
            });
        }
    }

    render() {
        const { match = { path: '', url: '' }, user, errors } = this.props;
        return (
            <Router>

                <Switch>
                    <Route path={`${match.path}/login`} component={LoginFormComponent} />
                    <Route render={() => (
                        (!user.token)
                            ? (
                                <Redirect to={`${match.path}/login`} />
                            )
                            : (
                                <React.Fragment>
                                    <NavBarAdminPanelComponent match={match} />
                                    <Container className='mt-3'>
                                        <Switch>
                                            <Route path={`${match.path}/goods`} component={GoodsPanelComponent} />
                                            <Route path={`${match.path}/users`} component={UsersPanelComponent} />
                                            <Route path={`${match.path}/catalogue`} component={ControlCatalogueComponent} />
                                            <Route path={`${match.path}/images`} component={ControlOfImagesComponent} />
                                            <Route component={GoodsPanelComponent} />
                                        </Switch>
                                    </Container>
                                    <ErrorLayer
                                        Errors={errors}
                                    />
                                </React.Fragment>
                            ))}
                    />
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

AdminPanel.defaultProps = {
    match: {},
    errors: [],
    user: {},
    userAuthorizedSuccess: () => {}
};

const mapStoreToProps = state => ({
    user: state.adminPanel_User,
    errors: state.errorReducers.Errors
});

export default connect(mapStoreToProps, {
    userAuthorizedSuccess
})(AdminPanel);
