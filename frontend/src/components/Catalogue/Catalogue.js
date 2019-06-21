import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

/* The requesting to server needs push to single file(object) */

import CatalogueMenu from '../CatalogueMenu/CatalogueMenu';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Goods from '../Goods/Goods';
import CatalogueService from '../../Services/CatalogueService';
import GoodsService from '../../Services/GoodsService';


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

    rebuildTree = (id = null) => {
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

    convertArrIntoObject = (arr) => {
        arr.forEach((element) => {
            this.obj[element.id_catalogue] = element;
        });
    }

    requestCatalogue = (id = null) => {
        CatalogueService.getCatalogue(id).then((data) => {
            const arr = [];
            arr.push({
                id: null,
                name: 'Home'
            });
            this.sortItems(id || -1, data.data);
            this.setState(() => ({
                items: this.obj,
                itemsBreadCrumbs: arr
            }));
        });
    }

    // Needs to refactor logic of building tree
    findNodeInTree = (id, obj = this.obj) => {
        let element = null;
        Object.keys(obj).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (Number(key) === id) {
                    element = obj[key];
                }
            }
        });
        Object.keys(obj).forEach((key) => {
            if (obj[key].children) {
                this.findNodeInTree(id, obj[key].children);
            }
        });
        return element;
    }

    sortItems = (id, arr) => {
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

    requestGoods = (catalogueId = null, idgoods = null) => {
        GoodsService.getGoods({
            id: idgoods,
            id_catalogue: catalogueId
        }).then((data) => {
            if (data.status === 200) {
                this.setState(() => ({
                    itemsGoods: data.data
                }));
            }
        });
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
