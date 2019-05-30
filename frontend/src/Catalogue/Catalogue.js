import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CatalogueMenu from '../CatalogueMenu/CatalogueMenu';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Goods from '../Goods/Goods';
import PropTypes from 'prop-types';

/* The requesting to server needs push to single file(object) */

class Catalogue extends Component {
    constructor(props) {
        super(props);
        this.requestCatalogue = this.requestCatalogue.bind(this);
        this.rebuildTree = this.rebuildTree.bind(this);
        this.requestGoods = this.requestGoods.bind(this);
        this.obj = {};
        this.state = {
            items: {},
            itemsBreadCrumbs: [],
            itemsGoods: []
        };
    }

    findNodeInTree(id, obj = this.obj) {

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (Number(key) === id) {
                    // if (key === 6) console.log(obj[key]);
                    return obj[key];
                }
            }
        }
        for (let key in obj) {
            if (obj[key]['children']) {
                this.findNodeInTree(id, obj[key]['children']);
            }
        }
    }

    sortItems(id, arr) {
        let self = this;
        let arrPushingElements = arr.filter((el) => el.parent_id === id);
        arrPushingElements.forEach(element => {
            if (element.parent_id === -1) {
                self.obj[element.id_catalogue] = element;
                if (!self.obj[element.id_catalogue]['children']) {
                    self.obj[element.id_catalogue]['children'] = {};
                }
            } else {
                let parent = self.findNodeInTree(element.parent_id);
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
        });
    }


    requestCatalogue(id = null) {
        const XHR = new XMLHttpRequest();
        var self = this;
        let body = (id) ? `?id=${id}` : '';
        XHR.open('GET', `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/catalogue` + body, true);

        XHR.send();

        XHR.onreadystatechange = function () { // (3)
            if (XHR.readyState !== 4) return;
            if (XHR.status !== 200) {

                // console.error( XHR.status, XHR.statusText);
            } else {
                let arr = [];
                arr.push({
                    id: null,
                    name: 'Home'
                });
                self.sortItems((id) ? id : -1, JSON.parse(XHR.responseText));
                self.setState(() => ({
                    items: self.obj,
                    itemsBreadCrumbs: arr
                }));
            }
        };
    }

    requestGoods(catalogue_id = null, idgoods = null) {
        const XHR = new XMLHttpRequest();
        var self = this;
        let body = (catalogue_id) ? `?id_catalogue=${catalogue_id}` : '';
        body += (idgoods) ? `?id=${idgoods}` : '';
        XHR.open('GET', `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/goods` + body, true);

        XHR.send();

        XHR.onreadystatechange = function () { // (3)
            if (XHR.readyState !== 4) return;
            if (XHR.status !== 200) {
                // console.error( XHR.status, XHR.statusText);
            } else {
                self.setState(() => ({
                    itemsGoods: JSON.parse(XHR.responseText)
                }));
            }
        };
    }


    componentDidMount() {
        this.requestCatalogue();
    }

    rebuildTree(id = null) {
        if (id) {
            let parent = this.findNodeInTree(Number(id));
            if (parent) {
                let { itemsBreadCrumbs } = this.state;
                let objToPush = {
                    id: parent.id_catalogue,
                    name: parent.name
                };
                let a = itemsBreadCrumbs.filter(el => el.id === id);

                if (a.length === 0) {
                    itemsBreadCrumbs.push(objToPush);
                }
                let children = (parent.children) ? parent.children : {};
                this.setState(() => ({
                    items: children,
                    itemsBreadCrumbs: itemsBreadCrumbs
                }));
            }
        } else {
            this.setState(() => ({
                items: this.obj,
                itemsBreadCrumbs: [{
                    id: null,
                    name: 'Home'
                }],
                itemsGoods: []
            }));
        }

    }


    render() {
        let { items, itemsBreadCrumbs, itemsGoods } = this.state;
        // console.log('pre render',obj);
        return (
            <Container >
                <Row>
                    <Col sm='auto'>
                        <BreadCrumbs
                            obj={itemsBreadCrumbs}
                            handleClick={this.rebuildTree}
                        >
                        </BreadCrumbs>
                    </Col>
                </Row>
                <Row>
                    <Col sm='auto'>
                        <CatalogueMenu
                            obj={items}
                            handleClick={this.rebuildTree}
                            requestGoods={this.requestGoods}
                        />
                    </Col>
                    <Col>
                        <Goods
                            obj={itemsGoods}
                            addItemToBacket={this.props.addItemToBacket}
                        >
                        </Goods>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Catalogue.propTypes = { 
    addItemToBacket: PropTypes.func
};


export default Catalogue;