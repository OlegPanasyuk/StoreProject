import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Nav, Pagination } from 'react-bootstrap';

function ListOfPages({
    count,
    limit,
    activePage,
    openPage
}) {
    const numberOfPages = Math.ceil(count / limit);
    const listOfPages = [];
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
        <Nav as={Pagination} size='sm' className='d-flex justify-content-center'>
            {listOfPages}
        </Nav>
    );
}


ListOfPages.propTypes = {
    count: PropTypes.number,
    limit: PropTypes.number,
    activePage: PropTypes.number,
    openPage: PropTypes.func
};

ListOfPages.defaultProps = {
    count: 0,
    limit: 10,
    activePage: 1,
    openPage: () => null
};

export default ListOfPages;
