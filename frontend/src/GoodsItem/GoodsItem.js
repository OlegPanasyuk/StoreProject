import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGoodsToBasket } from '../REDUX/actions/actionsShoppingBasket';
import imgDef from '../asserts/imgs/header.jpg';

export class GoodsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        };
    }

    UNSAFE_componentWillMount() {
        let self = this;
        let { obj } = this.props;
        if (fetch) {
            let myInit = {
                method: 'GET',
            };
           

            fetch(`${
                process.env.REACT_APP_API_HOST
            }:${
                process.env.REACT_APP_API_PORT
            }/images/goods/${obj.idgoods}`, myInit)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    data && data.forEach(el => {
                        if (el.title > 0) {
                            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/images/${el.imgs_id_img}`, myInit)
                                .then(img => {
                                    if (img.ok) {
                                        return img.json();
                                    }
                                })
                                .then(i => {
                                    const a = new Uint8Array(i.data.data);
                                    const b = new Blob([a], { type: "image/jpeg" });
                                    const objectURL = URL.createObjectURL(b);
                                    self.setState({
                                        url: objectURL.toString()
                                    });
                                });
                        }
                    });
                    
                });
        }
    }

    handleAddToBasket = () => {
        this.props.addGoodsToBasket(this.props.id);

    };

    render() {
        let { obj } = this.props;
        let { url } = this.state;
        if (url.length === 0) {
            url = imgDef;
        }
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
                        <Card.Title>
                            {obj.name}
                        </Card.Title>
                        <Card.Text>
                            {`${obj.price} $`}
                        </Card.Text>
                    </div>
                </div>


                <Card.Body className='d-flex flex-column'>
                    <Card.Text style={{}}>
                        {obj.description}
                    </Card.Text>
                    <Button onClick={this.handleAddToBasket}>
                        Add to backet
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}

GoodsItem.propTypes = {
    obj: PropTypes.object,
    id: PropTypes.number,
    addGoodsToBasket: PropTypes.func
};


export default connect(null, { addGoodsToBasket })(GoodsItem);