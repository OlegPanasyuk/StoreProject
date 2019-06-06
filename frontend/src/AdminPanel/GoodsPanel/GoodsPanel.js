import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Components
import { connect } from 'react-redux';
import GoodsItem from './GoodsItem';
import ListOfPages from './ListOfPages';
import FilterGoodsPanel from './FilterGoodsPanel';
import AddingGood from './AddingGood';
import EditGoodsItem from './EditGoodsItem';
import DeleteForm from './DeleteForm';

// Redux
import {
    goodsGetSuccess,
    goodsFilter,
    closeEditGoodsItem,
    permissionToDeleteClose
} from '../../REDUX/adminPanel/actions/actionsGoodsPanel';


export class GoodsPanel extends Component {
    constructor(props) {
        super(props);
        this.openPage = this.openPage.bind(this);
        this.prepareSearchRow = this.prepareSearchRow.bind(this);
        this.updateState = this.updateState.bind(this);
        this.countFiltered = this.countFiltered.bind(this);
        this.state = {
            limit: 10,
            count: 0,
            activePage: 1,
            showModal: false
        };
    }

    componentDidMount() {
        if (fetch) {
            this.openPage(1);
        }
    }

    UNSAFE_componentWillMount() {
        const self = this;
        if (fetch) {
            const myInit = {
                method: 'GET',
                cache: 'default'
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/goods?count`, myInit)
                .then((res) => {
                    res.text().then((data) => {
                        self.setState({
                            count: +data
                        });
                    });
                });
        }
    }


    prepareSearchRow() {
        const { filters } = this.props;
        const {
            priceMore, priceLess, nameSearch, orderPrice, id_catalogue
        } = filters;
        const searchStr = [];

        if (id_catalogue !== -1) {
            searchStr.push(`id_catalogue=${id_catalogue}`);
        }
        if (priceMore > 0) {
            searchStr.push(`priceMore=${priceMore}`);
        }
        if (priceLess > 0) {
            searchStr.push(`priceLess=${priceLess}`);
        }
        if (orderPrice) {
            searchStr.push(`orderPrice=${orderPrice}`);
        }
        if (nameSearch !== '') {
            searchStr.push(`nameSearch=${nameSearch}`);
        }
        return searchStr.join('&');
    }


    updateState(e, obj, page = 1) {
        if (e) {
            e.preventDefault();
        }
        const { goodsFilter } = this.props;
        // I don't like it
        const a = new Promise((res, rej) => {
            try {
                goodsFilter(obj);
                res(true);
            } catch (e) {
                rej(e);
            }
        });
        a.then(() => {
            this.countFiltered();
            this.openPage(page);
        }, () => {

        });
    }

    countFiltered() {
        const str = this.prepareSearchRow();
        const self = this;
        if (fetch) {
            const myInit = {
                method: 'GET',
                cache: 'default'
            };
            fetch(`${
                process.env.REACT_APP_API_HOST
            }:${
                process.env.REACT_APP_API_PORT
            }/goods/filter?count&${
                str
            }`, myInit)
                .then((res) => {
                    res.text().then((data) => {
                        self.setState({
                            count: +data
                        });
                    });
                });
        }
    }

    openPage(i) {
        const self = this;
        if (fetch) {
            const searchStr = this.prepareSearchRow();
            const myInit = {
                method: 'GET',
                cache: 'default'
            };
            fetch(
                `${
                    process.env.REACT_APP_API_HOST
                }:${
                    process.env.REACT_APP_API_PORT
                }/goods/filter?page=${
                    i
                }&${
                    searchStr
                }`,
                myInit
            )
                .then((res) => {
                    self.setState({
                        activePage: i
                    });
                    res.json().then((data) => {
                        self.props.goodsGetSuccess(data);
                    });
                });
        }
    }

    render() {
        const {
            showModal, activePage, count, limit
        } = this.state;
        const {
            editItem, closeEditGoodsItem, deleteItem, permissionToDeleteClose, goodsToShow
        } = this.props;
        return (
            <React.Fragment>
                {(showModal)
                    ? (
                        <AddingGood
                            show={showModal}
                            onHide={() => {
                                this.setState({
                                    showModal: false
                                });
                            }}
                            openPage={this.openPage}
                        />
                    )
                    : <div />
                }
                {
                    (editItem.show)
                        ? (
                            <EditGoodsItem
                                onHide={(e) => {
                                    closeEditGoodsItem();
                                    this.updateState(e, {}, activePage);
                                }}
                            />
                        )
                        : (<div />)
                }

                {
                    (deleteItem.show)
                        ? (
                            <DeleteForm onHide={(e) => {
                                permissionToDeleteClose();
                                this.updateState(e, {});
                            }}
                            />
                        )
                        : <div />
                }
                <Container>

                    <Row>
                        <Col xs={12} className='text-center'>
                            <ListOfPages
                                count={count}
                                limit={limit}
                                activePage={activePage}
                                openPage={this.openPage}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className='text-center d-flex justify-content-center mb-3'>

                            Price:
                            <a
                                href='#up'
                                className='ml-3'
                                onClick={(e) => { this.updateState(e, { orderPrice: 'up' }); }}
                            >
                                Up
                            </a>
                            <a
                                href='#down'
                                className='ml-3'
                                onClick={(e) => { this.updateState(e, { orderPrice: 'down' }); }}
                            >
                                Down
                            </a>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <Button onClick={() => {
                                this.setState({
                                    showModal: true
                                });
                            }}
                            >
                                Add goods
                            </Button>
                        </Col>
                        <Col xs={8} className='d-flex flex-column justify-content-between'>
                            {
                                goodsToShow && goodsToShow.map(el => (
                                    <GoodsItem key={`GoodsInAdminPanel ${el.idgoods}`} obj={el} />
                                ))
                            }


                        </Col>
                        <Col xs={2}>
                            <FilterGoodsPanel
                                prepSearchRow={this.prepareSearchRow}
                                updateState={this.updateState}
                                openPage={this.openPage}
                                countFiltered={this.countFiltered}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className='text-center'>
                            <ListOfPages
                                count={count}
                                limit={limit}
                                activePage={activePage}
                                openPage={this.openPage}
                            />
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

GoodsPanel.propTypes = {
    filters: PropTypes.object,
    goodsFilter: PropTypes.func,
    closeEditGoodsItem: PropTypes.func,
    deleteItem: PropTypes.object,
    permissionToDeleteClose: PropTypes.func,
    editItem: PropTypes.object,
    goodsToShow: PropTypes.array
};

GoodsPanel.defaultProps = {
    filters: {},
    goodsFilter: () => null,
    closeEditGoodsItem: () => null,
    deleteItem: {},
    permissionToDeleteClose: () => null,
    editItem: {},
    goodsToShow: []
};


const mapsStateToProps = state => ({
    goodsToShow: state.adminPanel_goodsPanel.goodsShown,
    filters: state.adminPanel_goodsPanel.filters,
    editItem: state.adminPanel_goodsPanel.editItem,
    deleteItem: state.adminPanel_goodsPanel.deleteItem
});

export default connect(mapsStateToProps, {
    goodsGetSuccess,
    goodsFilter,
    closeEditGoodsItem,
    permissionToDeleteClose
})(GoodsPanel);
