import React, { Component } from 'react';

//Components
import { Nav } from 'react-bootstrap';

export class ListOfPages extends Component {
    render() {
        let { count, limit, activePage, openPage } = this.props;
        const numberOfPages = Math.ceil(count / limit);
        let listOfPages = [];
        for (let i = 1; i <= numberOfPages; i++) {
            listOfPages.push((
                <Nav.Item key={`nav-page-list-${i}`}>
                    <Nav.Link eventKey={`${i}`} onClick={()=> openPage(i)}>
                        {i}
                    </Nav.Link>
                </Nav.Item>
            ));
        }
        return (
            <Nav className='d-flex justify-content-center' activeKey={`${activePage}`}>
                {listOfPages}
            </Nav>
        );
    }
}

export default ListOfPages;