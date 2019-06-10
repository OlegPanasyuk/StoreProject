import React, { Component } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import {
    editFormOpen,
    deletingFormOpen
} from '../../REDUX/adminPanel/actions/actionsImagesControl';


export class ImageItem extends Component {
    constructor(props) {
        super(props);
        const { obj } = this.props;
        this.state = {
            url: `${
                process.env.REACT_APP_API_HOST
            }:${
                process.env.REACT_APP_API_PORT
            }/images/${obj.id_img}`
        };
    }

    render() {
        const { obj, editFormOpen, deletingFormOpen } = this.props;
        const { url } = this.state;
        return (
            <Card>
                <div style={{
                    position: 'relative'
                }}
                >
                    <Card.Img variant='top' src={url}>

                    </Card.Img>
                    <div
                        className='card-img-overlay d-flex flex-column justify-content-end' style={{
                            color: 'var(--white)',
                            background: 'linear-gradient(to top, var(--dark) 5%, transparent 60%)'
                        }}
                    >
                        <div className='d-flex justify-content-end image-item__buttons-wrapper'>
                            <ButtonGroup>
                                <Button onClick={() => {
                                    editFormOpen({
                                        ...obj,
                                        url
                                    });
                                }}
                                >
                                    <i className='far fa-edit' />
                                </Button>
                                <Button onClick={() => {
                                    deletingFormOpen({
                                        ...obj,
                                        url
                                    });
                                }}
                                >
                                    <i className='fas fa-trash-alt' />
                                </Button>
                            </ButtonGroup>
                        </div>
                        <Card.Title>
                            {obj.name}
                        </Card.Title>
                        <Card.Text>
                            <span>{`type: ${obj.type}`}</span>
                            <br />
                            <span>{`createdAt: ${obj.createdAt}`}</span>
                            <br />
                            <span>{`updatedAt: ${obj.updatedAt}`}</span>
                            <br />
                        </Card.Text>

                    </div>
                </div>
            </Card>
        );
    }
}

ImageItem.propTypes = {
    editFormOpen: PropTypes.func,
    deletingFormOpen: PropTypes.func,
    obj: PropTypes.object
};

ImageItem.defaultProps = {
    editFormOpen: () => null,
    deletingFormOpen: () => null,
    obj: {}
};

export default connect(null, {
    editFormOpen,
    deletingFormOpen
})(ImageItem);
