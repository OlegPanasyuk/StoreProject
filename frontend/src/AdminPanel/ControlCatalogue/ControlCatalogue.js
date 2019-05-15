import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//Redux
import { connect } from 'react-redux';
import {
    editCatalogueItem
} from '../../REDUX/adminPanel/actions/actionsCatalogueControl';


import TreeView from './TreeView';
import EditCatalogueItem from './EditCatalogueItem';


export class ControlCatalogue extends Component {
    constructor(props) {
        super(props);
        this.getCatalogue = this.getCatalogue.bind(this);
        this.state = {
            arrOfCatalogue: []
        };
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
                    self.setState({
                        arrOfCatalogue: data
                    });
                });
        }
    }

    UNSAFE_componentWillMount() {
        this.getCatalogue();
    }

    render() {
        let data = this.state.arrOfCatalogue;
        return (
            <Container>
                <Row>
                    <Col>
                        <TreeView
                            data={data}
                            name="data"
                            onItemClick={(key) => alert(key)}
                            editCatalogueItem={this.props.editCatalogueItem}
                        />
                    </Col>
                    <Col>
                        <EditCatalogueItem 
                            getCatalogue={this.getCatalogue}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(null, {
    editCatalogueItem
})(ControlCatalogue);