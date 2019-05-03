import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

export class NavBarAdminPanel extends Component {
    render() {
        let {match} = this.props;
        return (
            <Container>
                
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
                    
               
                
            </Container>
        );
    }
}

export default NavBarAdminPanel;