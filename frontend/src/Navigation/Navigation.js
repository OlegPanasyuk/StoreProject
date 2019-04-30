import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Navigation extends Component {
    render() {
        return (
            <Navbar  className='w-100'>
                <Nav className='d-flex align-items-center'>
                    <Nav.Item>
                        <NavLink to="/" className='p-3'>Home</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to='/about' className='p-3'>About</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to='/catalogue' className='p-3'>Catalogue</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to='/contacts' className='p-3'>Contacts</NavLink>
                    </Nav.Item>
                </Nav>
                {this.props.children}
            </Navbar>
        );
    }
}

Navigation.propTypes = {
    children: PropTypes.array
};

export default Navigation;