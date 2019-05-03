import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//Components
import GoodsItem from './GoodsItem';

//Redux 
import { connect } from 'react-redux';
import { goodsGetSuccess } from '../../REDUX/adminPanel/actions/actionsGoodsPanel';

export class GoodsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            count: 0
        };
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
                    res.text().then(function(data) {  
                        self.setState({
                            count: +data
                        });  
                    });  
                });
        }
    }

    componentDidMount() {
        let self = this;
        if (fetch) {
            let myInit = {
                method: 'GET',
                cache: 'default'
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/goods?page=1`, myInit)
                .then((res) => {
                    res.json().then(function(data) {  
                        self.props.goodsGetSuccess(data);  
                    });  
                });
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12} className='text-center'>Top Row</Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        Left Side Bar
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
                        Right side bar
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className='text-center'>Bottom Row</Col>
                </Row>
            </Container>
        );
    }
}

const mapsStateToProps = function (state) {
    return {
        goodsToShow: state.adminPanel_goodsPanel.goodsShown
    };
};

export default connect(mapsStateToProps, {
    goodsGetSuccess
})(GoodsPanel);