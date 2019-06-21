import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGoodsToBasket } from '../../actions/actionsShoppingBasket';
import imgDef from '../../asserts/imgs/header.jpg';
import ImageService from '../../Services/ImageService';

export class GoodsItem extends Component {
    state = {
        url: ''
    }

    handleAddToBasket = () => {
        const { addGoodsToBasket, id } = this.props;
        addGoodsToBasket(id);
    };

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        const { obj } = this.props;
        ImageService.getGoodsImage({
            idGoods: obj.idgoods
        }).then((res) => {
            const { data } = res;
            if (data) {
                data.forEach((el) => {
                    if (el.title > 0) {
                        this.setState({
                            url: `${
                                process.env.REACT_APP_API_HOST
                            }:${
                                process.env.REACT_APP_API_PORT
                            }/images/${el.imgs_id_img}`
                        });
                    }
                });
            }
        });
    }


    render() {
        const { obj } = this.props;
        let { url } = this.state;
        if (url.length === 0) {
            url = imgDef;
        }
        return (
            <Card>
                <div style={{
                    position: 'relative'
                }}
                >
                    <Card.Img variant='top' src={url}>

                    </Card.Img>
                    <div
                        className='card-img-overlay d-flex flex-column justify-content-end'
                        style={{
                            color: 'var(--white)',
                            background: 'linear-gradient(to top, var(--dark) 5%, transparent 60%)'
                        }}
                    >
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

GoodsItem.defaultProps = {
    obj: {},
    id: 0,
    addGoodsToBasket: () => {}
};

export default connect(null, { addGoodsToBasket })(GoodsItem);
