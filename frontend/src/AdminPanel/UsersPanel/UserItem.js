import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

export class UserItem extends Component {
    render() {
        let { obj } = this.props;
        return (
            <Card>
                <Card.Header>
                    <Button
                        variant='light'
                        
                    >
                        <i className="far fa-edit"></i>
                    </Button>
                    <Button
                        variant='light'
                    >
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{obj.username}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{obj.role}</Card.Subtitle>

                </Card.Body>
            </Card>
        );
    }
}

export default UserItem;