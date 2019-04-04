import React from 'react';
import {ListGroup} from 'react-bootstrap';




function CatalogueMenu(props) {
    let obj = props.obj;
    let handleClick = props.handleClick;
  
        let arrItems = Object.keys(obj).map((el) => {
            let element;
                
                    element = (
                            <ListGroup.Item onClick={()=>handleClick(el)} variant="secondary" key={el}>
                                {` ${obj[el].id_catalogue}  ${obj[el].name}`}
                            </ListGroup.Item>
                            
                    );
                
                return element;
        });
        return (
            <React.Fragment>
           
                <ListGroup
                
                >
                    {arrItems}
                </ListGroup>
            </React.Fragment>
        );
    
}



export default CatalogueMenu;