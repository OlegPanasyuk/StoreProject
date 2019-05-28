import React, { Component } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

//Redux 
import { connect } from 'react-redux';
import {
    editFormOpen,
    editFormClose
} from '../../REDUX/adminPanel/actions/actionsImagesControl';


export class ImageItem extends Component {

    state = {
        url: ''
    }

    UNSAFE_componentWillMount() {
        if (fetch) {
            let myInit = {
                method: 'GET',
                cache: 'default'
            };
            fetch(`${
                process.env.REACT_APP_API_HOST
            }:${
                process.env.REACT_APP_API_PORT
            }/images/${this.props.obj.id_img}`, myInit)
                .then(img => {
                    if (img.ok) {
                        return img.json();
                    }
                })
                .then(i => {
                    const a = new Uint8Array(i.data.data);
                    const b = new Blob([a], { type: "image/jpeg" });
                    const objectURL = URL.createObjectURL(b);
                    this.setState({
                        url: objectURL.toString()
                    });
                });
        }
    }

    render() {
        let { obj } = this.props;
        let { url } = this.state;
        return (
            <Card>
                <div style={{
                    position: 'relative'
                }}>
                    <Card.Img variant='top' src={url}>

                    </Card.Img>
                    <div className='card-img-overlay d-flex flex-column justify-content-end' style={{
                        color: 'var(--white)',
                        background: 'linear-gradient(to top, var(--dark) 5%, transparent 60%)'
                    }}>
                        <div className='d-flex justify-content-end image-item__buttons-wrapper'>
                            <ButtonGroup>
                                <Button onClick={() => {
                                    this.props.editFormOpen({
                                        ...obj,
                                        url
                                    });
                                }}>
                                    <i className="far fa-edit"></i>
                                </Button>
                                <Button>
                                    <i className="fas fa-trash-alt"></i>
                                </Button>
                            </ButtonGroup>
                        </div>
                        <Card.Title>
                            {obj.name}
                        </Card.Title>
                        <Card.Text>
                            <span>{`type: ${obj.type}`}</span><br />
                            <span>{`createdAt: ${obj.createdAt}`}</span><br />
                            <span>{`updatedAt: ${obj.updatedAt}`}</span><br />
                        </Card.Text>

                    </div>
                </div>
            </Card>
        );
    }
}

ImageItem.propTypes = {
    editFormOpen: PropTypes.func,
    editFormClose: PropTypes.func
};

export default connect(null, {
    editFormOpen,
    editFormClose
})(ImageItem);