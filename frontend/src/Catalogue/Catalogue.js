import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

/* The requesting to server needs push to single file(object) */

import CatalogueMenu from '../CatalogueMenu/CatalogueMenu';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Goods from '../Goods/Goods';

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


    componentDidMount() {
        this.requestCatalogue();
    }

    // Needs to refactor logic of building tree
    findNodeInTree(id, obj = this.obj) {
        // Object.keys(obj).forEach((key) => {
        //     if (obj.hasOwnProperty(key)) {
        //         if (Number(key) === id) {
        //             return obj[key];
        //         }
        //     }
        // });

        // Object.keys(obj).forEach((key) => {
        //     if (obj[key].children) {
        //         this.findNodeInTree(id, obj[key].children);
        //     }
        // });
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (Number(key) === id) {
                    return obj[key];
                }
            }
        }
        for (const key in obj) {
            if (obj[key].children) {
                this.findNodeInTree(id, obj[key].children);
            }
        }
    }

    sortItems(id, arr) {
        const self = this;
        const arrPushingElements = arr.filter(el => el.parent_id === id);
        arrPushingElements.forEach((element) => {
            if (element.parent_id === -1) {
                self.obj[element.id_catalogue] = element;
                if (!self.obj[element.id_catalogue].children) {
                    self.obj[element.id_catalogue].children = {};
                }
            } else {
                const parent = self.findNodeInTree(element.parent_id);
                // if (element.parent_id === 6) console.log(parent, element, self.obj);
                if (parent) {
                    if (parent.children) {
                        parent.children[element.id_catalogue] = element;
                        if (!parent.children[element.id_catalogue].children) {
                            parent.children[element.id_catalogue].children = {};
                        }
                    }
                }
            }
            self.sortItems(element.id_catalogue, arr);
        });
    }

    rebuildTree(id = null) {
        if (id) {
            const parent = this.findNodeInTree(Number(id));
            if (parent) {
                const { itemsBreadCrumbs } = this.state;
                const objToPush = {
                    id: parent.id_catalogue,
                    name: parent.name
                };
                const a = itemsBreadCrumbs.filter(el => el.id === id);

                if (a.length === 0) {
                    itemsBreadCrumbs.push(objToPush);
                }
                const children = (parent.children) ? parent.children : {};
                this.setState(() => ({
                    items: children,
                    itemsBreadCrumbs
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

    convertArrIntoObject(arr) {
        const self = this;
        arr.forEach((element) => {
            self.obj[element.id_catalogue] = element;
        });
    }

    requestCatalogue(id = null) {
        const XHR = new XMLHttpRequest();
        const self = this;
        const body = (id) ? `?id=${id}` : '';
        XHR.open('GET', `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/catalogue${body}`, true);

        XHR.send();

        XHR.onreadystatechange = () => { // (3)
            if (XHR.readyState !== 4) return;
            if (XHR.status !== 200) {

                // console.error( XHR.status, XHR.statusText);
            } else {
                const arr = [];
                arr.push({
                    id: null,
                    name: 'Home'
                });
                self.sortItems(id || -1, JSON.parse(XHR.responseText));
                self.setState(() => ({
                    items: self.obj,
                    itemsBreadCrumbs: arr
                }));
            }
        };
    }

    requestGoods(catalogueId = null, idgoods = null) {
        const XHR = new XMLHttpRequest();
        const self = this;
        let body = (catalogueId) ? `?id_catalogue=${catalogueId}` : '';
        body += (idgoods) ? `?id=${idgoods}` : '';
        XHR.open('GET', `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/goods${body}`, true);

        XHR.send();

        XHR.onreadystatechange = () => {
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

    render() {
        const { items, itemsBreadCrumbs, itemsGoods } = this.state;
        const { addItemToBacket } = this.props;
        return (
            <Container>
                <Row>
                    <Col sm='auto'>
                        <BreadCrumbs
                            obj={itemsBreadCrumbs}
                            handleClick={this.rebuildTree}
                        />
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
                            addItemToBacket={addItemToBacket}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

Catalogue.propTypes = {
    addItemToBacket: PropTypes.func
};

Catalogue.defaultProps = {
    addItemToBacket: () => {}
};

export default Catalogue;
