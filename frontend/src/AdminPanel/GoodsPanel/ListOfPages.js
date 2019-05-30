import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import { Pagination } from 'react-bootstrap';

export class ListOfPages extends Component {
    render() {
        let { 
            count, 
            limit, 
            activePage, 
            openPage
        } = this.props;
        const numberOfPages = Math.ceil(count / limit);
        let listOfPages = [];
        for (let i = 1; i <= numberOfPages; i++) {
            listOfPages.push((
                <Pagination.Item
                   
                    key={`nav-page-list-${i}`} 
                    active={i === activePage} 
                    onClick={() => openPage(i)}
                >
                    {i}
                </Pagination.Item>
            ));
        }
        return (
            <Pagination as={Pagination} size='sm' className='d-flex justify-content-center' >
                {listOfPages}
            </Pagination>
        );
    }
}

ListOfPages.propTypes = {
    count: PropTypes.number,
    limit: PropTypes.number,
    activePage: PropTypes.number,
    openPage: PropTypes.func
};

export default ListOfPages;