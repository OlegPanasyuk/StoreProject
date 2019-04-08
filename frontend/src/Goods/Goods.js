import React, { Component } from 'react';
import { Card, CardColumns } from 'react-bootstrap';

class Goods extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let { obj } = this.props;
        let itemsGoods = Object.keys(obj).map((el)=>{
            return (
                <Card style={{ minWidth: '300px'}}>
                    <Card.Header>
                        {obj[el].name}
                    </Card.Header>
                    <Card.Text>
                        {obj[el].decription}
                    </Card.Text>
                </Card>
            );
        });
        return (
            <CardColumns style={{columnGap: '1em'}}>
                {itemsGoods}
            </CardColumns>
        );
    }
}

export default Goods;