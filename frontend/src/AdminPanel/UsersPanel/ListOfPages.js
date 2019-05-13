import React, { Component } from 'react';

//Components
import { Nav, Pagination } from 'react-bootstrap';

export class ListOfPages extends Component {
    render() {
        let { count, limit, activePage, openPage } = this.props;
        const numberOfPages = Math.ceil(count / limit);
        let listOfPages = [];
        for (let i = 1; i <= numberOfPages; i++) {
            listOfPages.push((
                <Nav.Item 
                    as={Pagination.Item} 
                    key={`nav-page-list-${i}`} 
                    active={i === activePage} 
                    onClick={() => openPage(i)}
                >
                    {i}
                </Nav.Item>
            ));
        }
        return (
            <Nav as={Pagination} size='sm' className='d-flex justify-content-center' >
                {listOfPages}
            </Nav>
        );
    }
}

export default ListOfPages;