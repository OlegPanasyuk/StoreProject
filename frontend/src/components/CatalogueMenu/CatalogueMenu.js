import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './CatalogueMenu.css';


function CatalogueMenu({
    obj,
    handleClick,
    requestGoods
}) {
    const arrItems = Object.keys(obj).map((el) => {
        let element;
        if (obj[el].children && (Object.keys(obj[el].children).length > 0)) {
            element = (
                <ListGroup.Item
                    className='catalogue__list-item'
                    onClick={() => {
                        handleClick(el);
                        requestGoods(el);
                    }}

                    key={el}
                >
                    {`${obj[el].name}`}
                </ListGroup.Item>

            );
        } else {
            element = (
                <ListGroup.Item
                    className='catalogue__list-item'
                    onClick={() => {
                        handleClick(el);
                        requestGoods(el);
                    }}

                    key={el}
                >
                    {`${obj[el].name}`}
                </ListGroup.Item>
            );
        }

        return element;
    });
    return (
        <React.Fragment>
            <ListGroup>
                {arrItems}
            </ListGroup>
        </React.Fragment>
    );
}

CatalogueMenu.propTypes = {
    obj: PropTypes.object,
    handleClick: PropTypes.func,
    requestGoods: PropTypes.func
};

CatalogueMenu.defaultProps = {
    obj: {},
    handleClick: () => {},
    requestGoods: () => {}
};

export default CatalogueMenu;
