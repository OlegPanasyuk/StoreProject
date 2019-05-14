import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export class NavBarAdminPanel extends Component {
    render() {
        let { match } = this.props;
        return (
            <Container>
                <Navbar>
                    <Nav>
                        <Nav.Item>
                            <NavLink className='p-3' exact to={`${match.url}/goods`}>Goods</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className='p-3' to={`${match.url}/users`}>Users</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className='p-3' to={`${match.url}/catalogue`}>Catalogue</NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </Container>
        );
    }
}

NavBarAdminPanel.propTypes = {
    match: PropTypes.object
};

export default NavBarAdminPanel;