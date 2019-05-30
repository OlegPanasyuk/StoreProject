import React, { Component } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

//Redux 
import { connect } from 'react-redux';
import { editUser } from '../../REDUX/adminPanel/actions/actionsUsersPanel';

//Component
import DeletingUser from './DeletingUser';

export class UserItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissionToDelete: false
        };
    }

    render() {
        let { obj } = this.props;
        let deleteUser = null;
        if (this.state.permissionToDelete) {
            deleteUser = (
                <DeletingUser
                    id={obj.id}
                    onHide={() => {
                        this.setState({
                            permissionToDelete: false
                        });
                    }}
                    openPage={this.props.openPage}
                />
            );
        }
        return (
            <Card>
                {deleteUser}
                <Card.Header>
                    <ButtonGroup
                        className='mr-3'
                    >
                        <Button
                            variant='light'
                            onClick={() => {
                                this.props.editUser(obj);
                            }}
                        >
                            <i className="far fa-edit"></i>
                        </Button>
                        <Button
                            variant='light'
                            onClick={() => {
                                this.setState({
                                    permissionToDelete: true
                                });
                            }}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </ButtonGroup>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{obj.username}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{obj.role}</Card.Subtitle>
                </Card.Body>
            </Card>
        );
    }
}

UserItem.propTypes = {
    obj: PropTypes.object,
    editUser: PropTypes.func,
    openPage: PropTypes.func
};

export default connect(null, {
    editUser
})(UserItem);