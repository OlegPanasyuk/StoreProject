import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';
import NavBarAdminPanel from './NavBarAdminPanel/NavBarAdminPanel';
import { Container } from 'react-bootstrap';

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
                                        <NavBarAdminPanel match={match} />
                                    </React.Fragment>
                                ))} />
                    </Switch>
                </Container>
            </Router>
        );
    }
}

const mapStoreToProps = (state) => {
    return ({
        user: state.adminPanel.user
    });
};

export default connect(mapStoreToProps)(AdminPanel);