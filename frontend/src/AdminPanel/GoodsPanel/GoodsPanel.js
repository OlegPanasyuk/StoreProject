import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

//Components
import GoodsItem from './GoodsItem';
import ListOfPages from './ListOfPages';
import FilterGoodsPanel from './FilterGoodsPanel';
import AddingGood from './AddingGood';
import EditGoodsItem from './EditGoodsItem';
import DeleteForm from './DeleteForm';

//Redux 
import { connect } from 'react-redux';
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
            showModal: false,
            permissionToDelete: false
        };
    }

    prepareSearchRow() {
        let { priceMore, priceLess, nameSearch, orderPrice, id_catalogue } = this.props.filters;
        let searchStr = [];

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


    UNSAFE_componentWillMount() {
        let self = this;
        if (fetch) {
            let myInit = {
                method: 'GET',
                cache: 'default'
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/goods?count`, myInit)
                .then((res) => {
                    res.text().then(function (data) {
                        self.setState({
                            count: +data
                        });
                    });
                });
        }
    }

    componentDidMount() {
        if (fetch) {
            this.openPage(1);
        }
    }

    updateState(e, obj, page = 1) {
        if (e) {
            e.preventDefault();
        }

        // I don't like it
        let a = new Promise((res, rej) => {
            this.props.goodsFilter(obj);
            res(true);
        });
        a.then((res) => {
            this.countFiltered();
            this.openPage(page);
        }, (rej) => {

        });
    }

    countFiltered() {
        let str = this.prepareSearchRow();
        let self = this;
        if (fetch) {
            let myInit = {
                method: 'GET',
                cache: 'default'
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/goods/filter?count&${str}`, myInit)
                .then((res) => {
                    res.text().then(function (data) {
                        self.setState({
                            count: +data
                        });
                    });
                });
        }
    }

    openPage(i) {
        let self = this;
        if (fetch) {
            let searchStr = this.prepareSearchRow();
            let myInit = {
                method: 'GET',
                cache: 'default'
            };
            fetch(
                `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/goods/filter?page=${i}&${searchStr}`, 
                myInit
            )
                .then((res) => {
                    self.setState({
                        activePage: i
                    });
                    res.json().then(function (data) {
                        self.props.goodsGetSuccess(data);
                    });
                });
        }
    }

    render() {

        return (
            <React.Fragment>
                {(this.state.showModal) ?
                    <AddingGood
                        show={this.state.showModal}
                        onHide={() => {
                            this.setState({
                                showModal: false
                            });
                        }}
                    />
                    :
                    <div></div>
                }
                {
                    (this.props.editItem.show)
                        ?
                        <EditGoodsItem
                            onHide = {(e) => {
                                
                                this.props.closeEditGoodsItem();
                                this.updateState(e, {}, this.state.activePage);
                            }}
                        ></EditGoodsItem>
                        :
                        (<div></div>)
                }

                {
                    (this.props.deleteItem.show) 
                        ?
                        <DeleteForm onHide={(e) => {
                            this.props.permissionToDeleteClose();
                            this.updateState(e, {});
                        }}
                        />
                        :
                        <div></div>
                }
                <Container>

                    <Row>
                        <Col xs={12} className='text-center'>
                            <ListOfPages
                                count={this.state.count}
                                limit={this.state.limit}
                                activePage={this.state.activePage}
                                openPage={this.openPage}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className='text-center d-flex justify-content-center'>
                            Price:
                            <a href='#up' onClick={(e) => { this.updateState(e, { orderPrice: 'up' }); }}>Up</a>
                            <a href='#down' onClick={(e) => { this.updateState(e, { orderPrice: 'down' }); }}>Down</a>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <Button onClick={() => {
                                this.setState({
                                    showModal: true
                                });
                            }}>Add goods</Button>
                        </Col>
                        <Col xs={8} className='d-flex flex-column justify-content-between'>
                            {
                                this.props.goodsToShow.map((el) => {
                                    return (
                                        <GoodsItem key={`GoodsInAdminPanel ${el.idgoods}`} obj={el} />
                                    );
                                })
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
                                count={this.state.count}
                                limit={this.state.limit}
                                activePage={this.state.activePage}
                                openPage={this.openPage}
                            />
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

const mapsStateToProps = function (state) {
    return {
        goodsToShow: state.adminPanel_goodsPanel.goodsShown,
        filters: state.adminPanel_goodsPanel.filters,
        editItem: state.adminPanel_goodsPanel.editItem,
        deleteItem: state.adminPanel_goodsPanel.deleteItem
    };
};

export default connect(mapsStateToProps, {
    goodsGetSuccess,
    goodsFilter,
    closeEditGoodsItem,
    permissionToDeleteClose
})(GoodsPanel);