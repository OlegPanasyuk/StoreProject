import React, { Component } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { editUser } from '../../../actions/adminPanel/actions/actionsUsersPanel';

// Component
import DeletingUserComponent from '../DeletingUser/DeletingUser';

export class UserItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissionToDelete: false
        };
    }

    render() {
        const { obj, editUser } = this.props;
        const { permissionToDelete, openPage } = this.state;
        let deleteUser = null;
        if (permissionToDelete) {
            deleteUser = (
                <DeletingUserComponent
                    id={obj.id}
                    onHide={() => {
                        this.setState({
                            permissionToDelete: false
                        });
                    }}
                    openPage={openPage}
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
                                editUser(obj);
                            }}
                        >
                            <i className='far fa-edit' />
                        </Button>
                        <Button
                            variant='light'
                            onClick={() => {
                                this.setState({
                                    permissionToDelete: true
                                });
                            }}
                        >
                            <i className='fas fa-trash-alt' />
                        </Button>
                    </ButtonGroup>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{obj.username}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>{obj.role}</Card.Subtitle>
                </Card.Body>
            </Card>
        );
    }
}

UserItem.propTypes = {
    obj: PropTypes.object,
    editUser: PropTypes.func
};

UserItem.defaultProps = {
    obj: {},
    editUser: () => null
};


export default connect(null, {
    editUser
})(UserItem);
