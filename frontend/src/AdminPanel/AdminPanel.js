import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';
import NavBarAdminPanel from './NavBarAdminPanel/NavBarAdminPanel';
import { Container } from 'react-bootstrap';

//Place for import components
import GoodsPanel from './GoodsPanel/GoodsPanel';

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
                                            <Route path={`${match.path}/users`} render={()=> (<h2>Hello, I am UsersControlPage</h2>)} />
                                        </Router>
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
        user: state.adminPanel_User
    });
};

export default connect(mapStoreToProps)(AdminPanel);