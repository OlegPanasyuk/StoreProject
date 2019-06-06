import React, { Component } from 'react';
import {
    Container, Row, Col, CardColumns, Button
} from 'react-bootstrap';
import './ControlOfImages.css';
import PropTypes from 'prop-types';

// Component
import { connect } from 'react-redux';
import ImageItemComponent from './ImageItem';
import ListOfPagesComponent from '../GoodsPanel/ListOfPages';
import AddingForm from './AddingForm';
import EditImageForm from './EditImageForm';
import DeletingForm from './DeletingForm';
import FiltersOfImages from './FiltersOfImages';

// Redux
import {
    addingFormOpen,
    addingFormClose,
    editFormOpen,
    editFormClose,
    deletingFormOpen,
    deletingFormClose,
    filtersSet
} from '../../REDUX/adminPanel/actions/actionsImagesControl';


export class ControlOfImages extends Component {
    constructor(props) {
        super(props);
        this.openPage = this.openPage.bind(this);
        this.prepareSearchRow = this.prepareSearchRow.bind(this);
        this.updateState = this.updateState.bind(this);
        this.state = {
            countOfInfoImages: null,
            arrOfInfoImages: [],
            activePage: 1
        };
    }

    prepareSearchRow() {
        const { filters } = this.props;
        const { name, type } = filters;
        const searchStr = [];

        if (type !== '') {
            searchStr.push(`type=${type}`);
        }
        if (name !== '') {
            searchStr.push(`name=${name}`);
        }
        return searchStr.join('&');
    }


    openPage(i) {
        const searchStr = this.prepareSearchRow();
        if (fetch) {
            const myInit = {
                method: 'GET',
                cache: 'default'
            };
            fetch(
                `${
                    process.env.REACT_APP_API_HOST
                }:${
                    process.env.REACT_APP_API_PORT
                }/images/filters?page=${i}&${searchStr}`,
                myInit
            ).then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return null;
            }).then((images) => {
                const { count, rows } = images;
                this.setState({
                    countOfInfoImages: count,
                    arrOfInfoImages: rows,
                    activePage: i
                });
            });
        }
    }

    UNSAFE_componentWillMount() {
        this.openPage(1);
    }

    updateState(page = 1, obj) {
        const { filtersSet } = this.props;
        const a = new Promise((res, rej) => {
            try {
                filtersSet(obj);
                res(true);
            } catch (e) {
                rej(e);
            }
        });
        a.then(() => {
            this.openPage(page);
        }, () => {

        });
    }

    render() {
        const { countOfInfoImages, arrOfInfoImages, activePage } = this.state;
        const {
            addingForm,
            addingFormClose,
            addingFormOpen,
            editForm,
            editFormClose,
            deletingFormClose,
            deletingForm
        } = this.props;
        return (
            <Container>
                <AddingForm
                    show={addingForm.show}
                    onHide={addingFormClose}
                    openPage={this.openPage}
                />
                <EditImageForm
                    show={editForm.show}
                    onHide={editFormClose}
                    openPage={this.openPage}
                />
                <DeletingForm
                    show={deletingForm.show}
                    onHide={deletingFormClose}
                    openPage={this.openPage}
                />
                <Row>
                    <Col>
                        <Button
                            onClick={addingFormOpen}
                        >
                            Add Image
                        </Button>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <FiltersOfImages
                            updateState={this.updateState}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListOfPagesComponent
                            count={countOfInfoImages}
                            limit={10}
                            activePage={activePage}
                            openPage={this.openPage}
                        />
                    </Col>
                </Row>
                <Row>
                    <CardColumns className='card-columns1'>
                        {arrOfInfoImages.map(el => (
                            <ImageItemComponent key={el.id_img} obj={el} />
                        ))}
                    </CardColumns>
                </Row>


            </Container>
        );
    }
}

ControlOfImages.propTypes = {
    addingForm: PropTypes.object,
    editForm: PropTypes.object,
    deletingForm: PropTypes.object,
    imageInWork: PropTypes.object,
    filters: PropTypes.object,
    addingFormOpen: PropTypes.func,
    addingFormClose: PropTypes.func,
    editFormOpen: PropTypes.func,
    editFormClose: PropTypes.func,
    deletingFormOpen: PropTypes.func,
    deletingFormClose: PropTypes.func,
    filtersSet: PropTypes.func
};

ControlOfImages.defaultProps = {
    addingForm: {},
    editForm: {},
    deletingForm: {},
    imageInWork: {},
    filters: {},
    addingFormOpen: () => null,
    addingFormClose: () => null,
    editFormOpen: () => null,
    editFormClose: () => null,
    deletingFormOpen: () => null,
    deletingFormClose: () => null,
    filtersSet: () => null
};

const mapStateToProps = state => ({
    addingForm: state.adminPanel_imagesPanel.addingForm,
    editForm: state.adminPanel_imagesPanel.editForm,
    deletingForm: state.adminPanel_imagesPanel.deletingForm,
    imageInWork: state.adminPanel_imagesPanel.imageInWork,
    filters: state.adminPanel_imagesPanel.filters
});


export default connect(mapStateToProps, {
    addingFormOpen,
    addingFormClose,
    editFormOpen,
    editFormClose,
    deletingFormOpen,
    deletingFormClose,
    filtersSet
})(ControlOfImages);
