import React from 'react';
import {ListGroup} from 'react-bootstrap';


function CatalogueMenu(props) {
    let obj = props.obj;
    let handleClick = props.handleClick;
    let requestGoods = props.requestGoods;
  
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
           
                <ListGroup
                
                >
                    {arrItems}
                </ListGroup>
            </React.Fragment>
        );
    
}



export default CatalogueMenu;