import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGoodsToBasket } from '../REDUX/actions/actionsShoppingBasket';

export class GoodsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        };
    }

    UNSAFE_componentWillMount() {
        let self = this;
        if (fetch) {
            let myInit = {
                method: 'GET',
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/images/`, myInit)
                .then(res => {
                    return res.blob();
                })
                .then(data => {
                    return data;
                })
                .then(b => {
                    const objectURL = URL.createObjectURL(b);
                    this.setState({
                        url: objectURL.toString()
                    });
                    console.log(b);
                });
        }
    }

    handleAddToBasket = () => {
        this.props.addGoodsToBasket(this.props.id);

    };

    render() {
        let { obj } = this.props;
        let { url } = this.state;
        console.log(url);
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