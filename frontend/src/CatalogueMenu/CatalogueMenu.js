import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';


function CatalogueMenu(props) {
    const obj = props.obj;
    const handleClick = props.handleClick;
    const requestGoods = props.requestGoods;
    
    let arrItems = Object.keys(obj).map((el) => {
        let element;
        if (obj[el].children && (Object.keys(obj[el].children).length > 0)) {
            element = (
                <ListGroup.Item 
                    onClick={
                        ()=>handleClick(el)
                    } 
                    variant="secondary" 
                    key={el}>
                    {`${obj[el].id_catalogue}  ${obj[el].name}`}
                </ListGroup.Item>
                
            );    
        } else {
            element = (
                <ListGroup.Item 
                    onClick={
                        ()=> {
                            handleClick(el);
                            requestGoods(el);
                        }
                    } 
                    variant="secondary" 
                    key={el}>
                    {`${obj[el].id_catalogue}  ${obj[el].name}`}
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
    obj : PropTypes.object
};

export default CatalogueMenu;