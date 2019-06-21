import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import {
    editCatalogueItem,
    editCatalogueItemOpen,
    editCatalogueItemClose,
    addCatalogueItemOpen
} from '../../../actions/adminPanel/actions/actionsCatalogueControl';

// Component
import TreeViewComponent from '../TreeView/TreeView';
import EditCatalogueItemComponent from '../EditCatalogueItem/EditCatalogueItem';
import AddCatalogueItemComponent from '../AddCatalogueItem/AddCatalogueItem';

function sortData(data) {
    const tree = {
        id_catalogue: -1,
        name: 'tree',
        children: []
    };

    const arrG = data.sort((a, b) => -(b.id_catalogue - a.id_catalogue));
    const arrG1 = arrG.filter(el => el.parent_id === -1);
    function sorting(arr2, obj = {}) {
        arr2.forEach((el) => {
            if (el.parent_id === obj.id_catalogue) {
                const children = arrG.filter(ele => ele.parent_id === el.id_catalogue);
                if (obj.children) {
                    if (children.length > 0) {
                        sorting(children, el);
                    }
                    obj.children.push(el);
                } else {
                    Object.defineProperty(obj, 'children', {
                        value: [],
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
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


    getCatalogue() {
        const self = this;
        if (fetch) {
            const myInit = {
                method: 'GET'
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/catalogue`, myInit)
                .then(res => res.json())
                .then((data) => {
                    const arr = new Array(...data);
                    const tree = sortData(data);
                    self.setState({
                        arrOfCatalogue: tree,
                        arrOfCatalogueNotSorted: arr
                    });
                });
        }
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        this.getCatalogue();
    }


    render() {
        const {
            arrOfCatalogue,
            arrOfCatalogueNotSorted,
            showAddForm,
            showEditForm
        } = this.state;
        const { editCatalogueItem } = this.props;
        const data = arrOfCatalogue;
        const dataN = arrOfCatalogueNotSorted;
        return (
            <Container>
                <Row className='mb-3'>
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
                        <TreeViewComponent
                            data={data}
                            name='data'
                            showEditForm={() => {
                                this.setState({
                                    showEditForm: true,
                                    showAddForm: false
                                });
                            }}
                            closeEditForm={() => {
                                this.setState({
                                    showEditForm: false
                                });
                            }}
                            editCatalogueItem={editCatalogueItem}
                        />
                    </Col>
                    <Col>
                        {
                            (showAddForm)
                                ? (
                                    <AddCatalogueItemComponent
                                        getCatalogue={this.getCatalogue}
                                        cancel={() => {
                                            this.setState({
                                                showAddForm: false
                                            });
                                        }}
                                        arrOfCatalogueNotSorted={dataN}
                                    />
                                ) : ''

                        }
                        {
                            (showEditForm)
                                ? (
                                    <EditCatalogueItemComponent
                                        cancel={() => {
                                            this.setState({
                                                showEditForm: false,
                                                showAddForm: false
                                            });
                                        }}
                                        arrOfCatalogueNotSorted={dataN}
                                        getCatalogue={this.getCatalogue}
                                        editCatalogueItem={editCatalogueItem}
                                    />
                                )
                                : ''
                        }

                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    editItem: state.adminPanel_catalogue.editItem,
    addItem: state.adminPanel_catalogue.addItem
});

ControlCatalogue.propTypes = {
    editCatalogueItem: PropTypes.func
};

ControlCatalogue.defaultProps = {
    editCatalogueItem: () => null
};
export default connect(mapStateToProps, {
    editCatalogueItem,
    editCatalogueItemOpen,
    editCatalogueItemClose,
    addCatalogueItemOpen
})(ControlCatalogue);
