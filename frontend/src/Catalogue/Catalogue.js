import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import CatalogueMenu from '../CatalogueMenu/CatalogueMenu';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Goods from '../Goods/Goods';

/* The requesting to server needs push to single file(object) */

class Catalogue extends Component {
    constructor(props) {
        super(props);
        this.requestCatalogue = this.requestCatalogue.bind(this);
        this.rebiuldTree = this.rebiuldTree.bind(this);
        this.requestGoods = this.requestGoods.bind(this);
        this.obj = {};
        this.state = {
            items : {},
            itemsBreadCrumbs : [],
            itemsGoods : []
        };
    }

    fintNodeInTree(id, obj = this.obj) {
        
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (Number(key) === id) {
                    if(key===6) console.log(obj[key]);
                    return obj[key];
                } 
            }
        }
        for (let key in obj) { 
           
            if (obj[key]['children']) {
                this.fintNodeInTree(id, obj[key]['children']);
            }
        } 
    }

    sortItems(id, arr) {
        let self = this;
        let arrPushingElements  = arr.filter((el) => el.parent_id === id);
        arrPushingElements.forEach(element => {
            if (element.parent_id === -1) {
                self.obj[element.id_catalogue] = element;
                if (!self.obj[element.id_catalogue]['children']) {
                    self.obj[element.id_catalogue]['children'] = {};
                }
            } else {
                let parent = self.fintNodeInTree(element.parent_id);
                // if (element.parent_id === 6) console.log(parent, element, self.obj);
                if (parent) {
                    if (parent.children) {
                        parent.children[element.id_catalogue] = element;
                        if (!parent.children[element.id_catalogue]['children']) {
                            parent.children[element.id_catalogue]['children'] = {};
                        }
                    }
                }
            }
            self.sortItems(element.id_catalogue, arr);
        });
    }

    convertArrIntoObject(arr) {
        let self = this;
        arr.forEach((element) => {
            self.obj[element.id_catalogue] = element;
        })
    }

   
    requestCatalogue(id=null) {
        const XHR = new XMLHttpRequest();
        var self = this;
        let body = (id) ? `?id=${id}` : '';
        XHR.open('GET', 'http://localhost:3300/catalogue'+body, true);
        
        XHR.send();

        XHR.onreadystatechange = function() { // (3)
        if (XHR.readyState !== 4) return;
            if (XHR.status !== 200) {
                console.error( XHR.status, XHR.statusText);
            } else {
                let arr = [];
                arr.push( { 
                    id: null, 
                    name: 'Home'
                } );
                self.sortItems( (id) ? id : -1, JSON.parse( XHR.responseText )); 
                self.setState(() => ({
                    items : self.obj,
                    itemsBreadCrumbs : arr
                }));
            }
        }
    }

    requestGoods(catalogue_id = null, idgoods = null) {
        const XHR = new XMLHttpRequest();
        var self = this;
        let body = (catalogue_id) ? `?id_catalogue=${catalogue_id}` : '';
            body += (idgoods) ? `?id=${idgoods}` : '';
        XHR.open('GET', 'http://localhost:3300/goods'+body, true);
        
        XHR.send();

        XHR.onreadystatechange = function() { // (3)
        if (XHR.readyState !== 4) return;
            if (XHR.status !== 200) {
                console.error( XHR.status, XHR.statusText);
            } else {
                self.setState(() => ({
                    itemsGoods: JSON.parse( XHR.responseText )
                }));
                console.log('как то так',JSON.parse( XHR.responseText ));
            }
        }
    }
 

    componentDidMount() {
       this.requestCatalogue();
    }

    rebiuldTree(id = null) {
        if (id) {
            let parent = this.fintNodeInTree(Number(id));
            if (parent) {
                let { itemsBreadCrumbs } = this.state;
                let objToPush = {
                    id : parent.id_catalogue,
                    name : parent.name
                } ;
                let a = itemsBreadCrumbs.filter(el => el.id === id);
                
                if (a.length === 0) {
                    itemsBreadCrumbs.push( objToPush );
                }
                let children = (parent.children) ? parent.children : {};
                this.setState(() => ({
                    items : children,
                    itemsBreadCrumbs : itemsBreadCrumbs
                }));
            }
        } else {
            this.setState(() => ({
                items : this.obj,
                itemsBreadCrumbs : [{
                    id : null,
                    name : 'Home'
                }],
                itemsGoods : []
            }));
        }
        
    }

    
    render() {
        let { items, itemsBreadCrumbs, itemsGoods} = this.state;
        let obj = items;
        console.log('pre render',obj);
        return (
           <Container>
                <Row>
                    <Col sm='auto'>
                        <BreadCrumbs 
                            obj = { itemsBreadCrumbs } 
                            handleClick = { this.rebiuldTree }
                            >
                        </BreadCrumbs>
                        <CatalogueMenu 
                            obj = { items } 
                            handleClick = { this.rebiuldTree }
                            requestGoods = { this.requestGoods }
                            />
                    </Col>
                    <Col>
                        <Goods 
                            obj= { itemsGoods }
                            >

                        </Goods>
                    </Col>
                    
                </Row>
                        
            </Container>
        )
    }
}



export default Catalogue ;