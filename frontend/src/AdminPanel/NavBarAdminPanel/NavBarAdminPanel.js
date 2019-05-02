import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

export class NavBarAdminPanel extends Component {
    render() {
        let {match} = this.props;
        return (
            <Container>
                <Router>
                    <Navbar>
                        <Nav>
                            <Nav.Item>
                                <NavLink exact to={`${match.url}/goods`}>Goods</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink to={`${match.url}/users`}>Users</NavLink>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                    <Route path={`${match.path}/goods`} render={()=> (<h1>Hello, I am GoodsControlPage!</h1>)} />
                    <Route path={`${match.path}/users`} render={()=> (<h2>Hello, I am UsersControlPage</h2>)} />
                </Router>
                
            </Container>
        );
    }
}

export default NavBarAdminPanel;