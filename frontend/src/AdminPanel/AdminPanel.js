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

//Redux
import { connect } from 'react-redux';

export class AdminPanel extends Component {
    
    render() {
        const { match } = this.props;
        return (
            <Router>
                <Container>
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
                                            <Route path={`${match.path}/goods`} component={GoodsPanel} />
                                            <Route path={`${match.path}/users`} component={UsersPanel} />
                                            <Route path={`${match.path}/catalogue`} component={ControlCatalogue} />
                                            <ErrorLayer
                                                Errors={this.props.errors}
                                            />

                                        </Router>
                                    </React.Fragment>
                                ))} />
                    </Switch>
                </Container>
            </Router>
        );
    }
}

AdminPanel.propTypes = {
    match: PropTypes.object,
    errors: PropTypes.array,
    user: PropTypes.object
};


const mapStoreToProps = (state) => {
    return ({
        user: state.adminPanel_User,
        errors: state.errorReducers.Errors
    });
};

export default connect(mapStoreToProps)(AdminPanel);
//