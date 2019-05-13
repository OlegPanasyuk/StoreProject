import React, { Component } from 'react';
import { Container, Row, Col, CardColumns, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

//Redux 
import { connect } from 'react-redux';
import {
    showUsers,
    editUserClose
} from '../../REDUX/adminPanel/actions/actionsUsersPanel';

//Components 
import UserItem from './UserItem';
import ListOfPages from './ListOfPages';
import FilterUsers from './FilterUsers';
import AddingUser from './AddingUser';
import EditUser from './EditForm';

export class UsersPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddingModal: false
        };
    }

    UNSAFE_componentWillMount() {
        const self = this;
        const storage = window.localStorage;
        if (fetch) {

            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append("Content-type", 'application/json');
            let myInit = {
                method: 'GET',
                headers: myHeaders,
                cache: 'default'
            };

            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/users`, myInit)
                .then((users) => {
                    return users.json();
                })
                .then((users) => {
                    self.props.showUsers(users);
                });
        }
    }

    render() {
        let addingModal = null;
        let editModal = null;
        if (this.state.showAddingModal) {
            addingModal = (
                <AddingUser
                    show={this.state.showAddingModal}
                    onHide={() => {
                        this.setState({
                            showAddingModal: false
                        });
                    }}
                />
            );
        }
        console.log(this.props.userToEdit.show);
        if (this.props.userToEdit.show) {
            editModal = (
                <EditUser 
                    onHide = {()=> {
                        this.props.editUserClose();
                    }}
                />
            );
        }

        return (

            <Container>
                {addingModal}
                {editModal}
                <Row>
                    <Col>
                        <ListOfPages
                            count={1}
                            limit={10}
                            activePage={1}
                            openPage={() => {

                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className='col-3'>
                        <Button
                            onClick={() => {
                                this.setState({
                                    showAddingModal: true
                                });
                            }}
                        >
                            Add User
                        </Button>
                        <FilterUsers />
                    </Col>
                    <Col className='col-9'>
                        <CardColumns>
                            {(this.props.usersToShow) && this.props.usersToShow.map((el, i) => {
                                return (
                                    <UserItem key={`el${el.username}-${i}`} obj={el} />
                                );
                            })}
                        </CardColumns>
                    </Col>
                </Row>
            </Container>

        );
    }
}

UsersPanel.propTypes = {
    showUsers: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        usersToShow: state.adminPanel_usersPanel.usersToShow.rows,
        usersToShowCount: state.adminPanel_usersPanel.usersToShow.count,
        userToEdit: state.adminPanel_usersPanel.userToEdit
    };
};

export default connect(mapStateToProps, {
    showUsers,
    editUserClose
})(UsersPanel);