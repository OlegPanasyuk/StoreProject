import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// import './Navigation.css';
export function Navigation({
    children
}) {
    const toggler = (
        <i
            className='fas fa-bars' style={{
                color: 'var(--light)'
            }}
        />
    );
    return (
        <Navbar
            expand='md'
            style={{
                backgroundColor: 'var(--primary)'
            }}
        >
            <Container>
                <Navbar.Brand
                    style={{
                        color: 'var(--light)'
                    }}
                >
                    StoreProject
                </Navbar.Brand>
                <Navbar.Toggle
                    style={{
                        border: 'none',
                        opacity: '0.8'
                    }}
                >
                    {toggler}
                </Navbar.Toggle>
                <Navbar.Collapse>
                    <Nav className=' mr-auto'>
                        <Nav.Item>
                            <NavLink to='/' className='p-3'>Home</NavLink>
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
                    {children}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

Navigation.propTypes = {
    children: PropTypes.array
};

Navigation.defaultProps = {
    children: []
};

export default Navigation;
