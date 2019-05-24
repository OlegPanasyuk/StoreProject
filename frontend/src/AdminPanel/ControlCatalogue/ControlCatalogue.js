import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import PropTypes from 'prop-types'; 

//Redux
import { connect } from 'react-redux';
import {
    editCatalogueItem,
    editCatalogueItemOpen,
    editCatalogueItemClose,
    addCatalogueItemOpen,
    addCatalogueItemClose
} from '../../REDUX/adminPanel/actions/actionsCatalogueControl';

//Component
import TreeView from './TreeView';
import EditCatalogueItem from './EditCatalogueItem';
import AddCatalogueItem from './AddCatalogueItem';


export class ControlCatalogue extends Component {
    constructor(props) {
        super(props);
        this.getCatalogue = this.getCatalogue.bind(this);
        this.state = {
            arrOfCatalogue: [],
            arrOfCatalogueNotSorted: [],
            showAddForm: false,
            showEditForm: false
        };
    }

    sortData(data) {
        var tree = {
            "id_catalogue": -1,
            "name": 'tree',
            children: []
        };

        let arrG = data.sort((a, b) => {
            return -(b.id_catalogue - a.id_catalogue);
        });
        let arrG1 = arrG.filter(el => {
            return el.parent_id === -1;
        });
        function sorting(arr2, obj = {}) {
            arr2.forEach((el) => {
                if (el.parent_id === obj.id_catalogue) {
                    let children = arrG.filter((ele) => {
                        return ele.parent_id === el.id_catalogue;
                    });
                    if (obj.children) {
                        if (children.length > 0) {
                            sorting(children, el);
                        }
                        obj.children.push(el);
                    } else {
                        obj.children = [];
                        if (children.length > 0) {
                            sorting(children, el);
                        }
                        obj.children.push(el);
                    }
                }
            });
            return obj;
        }
        return sorting(arrG1, tree).children;
    }

    getCatalogue() {
        const self = this;
        if (fetch) {
            let myInit = {
                method: 'GET',
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/catalogue`, myInit)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    let arr = new Array(...data);
                    let tree = self.sortData(data);
                    self.setState({
                        arrOfCatalogue: tree,
                        arrOfCatalogueNotSorted: arr,
                    });
                });
        }
    }

    UNSAFE_componentWillMount() {
        this.getCatalogue();
    }

    render() {
        let data = this.state.arrOfCatalogue;
        let dataN = this.state.arrOfCatalogueNotSorted;
        return (
            <Container>
                <Row>
                    <Col>
                        <Button
                            onClick={() => {
                                this.setState({
                                    showEditForm: false,
                                    showAddForm: true
                                });
                            }}
                        >
                            Add
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs='3'>
                        <TreeView
                            data={data}
                            name="data"
                            showEditForm={() => {
                                this.setState({
                                    showEditForm: true,
                                    showAddForm: false
                                });
                            }}
                            editCatalogueItem={this.props.editCatalogueItem}
                        />
                    </Col>
                    <Col>
                        {
                            (this.state.showAddForm) ?
                                <AddCatalogueItem
                                    getCatalogue={this.getCatalogue}
                                    cancel={this.props.addCatalogueItemClose}
                                    arrOfCatalogueNotSorted={dataN}
                                /> : ''

                        }
                        {
                            (this.state.showEditForm)
                                ?
                                <EditCatalogueItem
                                    cancel={() => {
                                        this.setState({
                                            showEditForm: false,
                                            showAddForm: false
                                        });
                                    }}
                                    arrOfCatalogueNotSorted={dataN}
                                    getCatalogue={this.getCatalogue}
                                />
                                : ''
                        }

                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        editItem: state.adminPanel_catalogue.editItem,
        addItem: state.adminPanel_catalogue.addItem
    };
};

ControlCatalogue.propTypes = {
    editCatalogueItem: PropTypes.func,
    addCatalogueItemClose: PropTypes.func
};

export default connect(mapStateToProps, {
    editCatalogueItem,
    editCatalogueItemOpen,
    editCatalogueItemClose,
    addCatalogueItemOpen,
    addCatalogueItemClose
})(ControlCatalogue);