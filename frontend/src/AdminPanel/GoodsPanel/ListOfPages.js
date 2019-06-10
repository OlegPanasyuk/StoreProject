import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import { Pagination } from 'react-bootstrap';

export class ListOfPages extends PureComponent {
    render() {
        const {
            count,
            limit,
            activePage,
            openPage
        } = this.props;
        const numberOfPages = Math.ceil(count / limit);
        const listOfPages = [];
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
            <Pagination as={Pagination} size='sm' className='d-flex justify-content-center'>
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

ListOfPages.defaultProps = {
    count: 0,
    limit: 10,
    activePage: 1,
    openPage: () => null
};

export default ListOfPages;
