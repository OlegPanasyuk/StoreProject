import React, { Component } from 'react';
import {
    Container, Row, Col, CardColumns, Button
} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import {
    showUsers,
    editUserClose,
    filterUsers
} from '../../REDUX/adminPanel/actions/actionsUsersPanel';

// Components
import UserItemComponent from './UserItem';
import ListOfPages from './ListOfPages';
import FilterUsers from './FilterUsers';
import AddingUserComponent from './AddingUser';
import EditUser from './EditForm';

export class UsersPanel extends Component {
    constructor(props) {
        super(props);
        this.openPage = this.openPage.bind(this);
        this.prepareSearchRow = this.prepareSearchRow.bind(this);
        this.updateState = this.updateState.bind(this);
        this.state = {
            showAddingModal: false,
            m: ''
        };
    }

    prepareSearchRow() {
        const searchStr = [];
        const { filters } = this.props;
        Object.keys(filters).forEach((el) => {
            if ((el === 'nameSearch') && (filters[el] !== '')) {
                searchStr.push(`${el}=${filters[el]}`);
            }
            if ((el === 'role') && (filters[el] !== '')) {
                searchStr.push(`${el}=${filters[el]}`);
            }
        });

        return searchStr.join('&');
    }

    updateState(e, obj, page = 1) {
        if (e) {
            e.preventDefault();
        }
        const { filterUsers } = this.props;
        // I don't like it
        const a = new Promise((res, rej) => {
            filterUsers(obj);
            res(true);
            if (!obj) rej();
        });
        a.then(() => {
            this.openPage(page);
        }, () => {

        });
    }

    openPage(i) {
        const storage = window.localStorage;
        const { showUsers, filterUsers } = this.props;
        if (fetch) {
            const searchStr = this.prepareSearchRow();
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append('Content-type', 'application/json');
            const myInit = {
                method: 'GET',
                headers: myHeaders,
                cache: 'default'
            };
            fetch(
                `${
                    process.env.REACT_APP_API_HOST
                }:${
                    process.env.REACT_APP_API_PORT
                }/users/filter?page=${
                    i
                }&${
                    searchStr
                }`,
                myInit
            )
                .then((res) => {
                    filterUsers({ activePage: i });
                    res.json().then((data) => {
                        showUsers(data);
                    });
                });
        }
    }

    UNSAFE_componentWillMount() {
        const self = this;
        const storage = window.localStorage;
        const { showUsers } = this.props;
        if (fetch) {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append('Content-type', 'application/json');
            const myInit = {
                method: 'GET',
                headers: myHeaders,
                cache: 'default'
            };

            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/users/filter?page=1`, myInit)
                .then((users) => {
                    if (users.status === 200) {
                        return users.json();
                    } if (users.status === 401) {
                        self.setState({
                            m: 'You are not Unauthorized or not have permission to access of Users Control'
                        });
                    } else {
                        window.location.href = '/adminpanel/';
                    }
                    return null;
                })
                .then((users) => {
                    showUsers(users);
                });
        }
    }

    render() {
        let addingModal = null;
        let editModal = null;
        const {
            usersToShowCount, filters, userToEdit, editUserClose, usersToShow
        } = this.props;
        const count = usersToShowCount;
        const { showAddingModal, m } = this.state;
        const { limit, activePage } = filters;
        if (showAddingModal) {
            addingModal = (
                <AddingUserComponent
                    show={showAddingModal}
                    onHide={() => {
                        this.setState({
                            showAddingModal: false
                        });
                    }}
                    openPage={this.openPage}
                />
            );
        }

        if (userToEdit.show) {
            editModal = (
                <EditUser
                    onHide={() => {
                        editUserClose();
                    }}
                    openPage={this.openPage}
                />
            );
        }

        return (

            <Container>
                {addingModal}
                {editModal}
                {m}
                <Row className='mb-3'>
                    <Col>
                        <ListOfPages
                            count={count}
                            limit={limit}
                            activePage={activePage}
                            openPage={this.openPage}
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
                        <FilterUsers
                            updateState={this.updateState}
                        />
                    </Col>
                    <Col className='col-9'>
                        <CardColumns>
                            {(usersToShow) && usersToShow.map(el => (
                                <UserItemComponent key={`el${el.username}${el.id}`} obj={el} openPage={this.openPage} />
                            ))}
                        </CardColumns>
                    </Col>
                </Row>
            </Container>

        );
    }
}

UsersPanel.propTypes = {
    showUsers: PropTypes.func,
    filters: PropTypes.object,
    filterUsers: PropTypes.func,
    userToEdit: PropTypes.object,
    usersToShow: PropTypes.array,
    usersToShowCount: PropTypes.number,
    editUserClose: PropTypes.func
};

UsersPanel.defaultProps = {
    showUsers: () => {},
    filters: {},
    filterUsers: () => {},
    userToEdit: {},
    usersToShow: [],
    usersToShowCount: 0,
    editUserClose: () => {}
};

const mapStateToProps = state => ({
    usersToShow: state.adminPanel_usersPanel.usersToShow.rows,
    usersToShowCount: state.adminPanel_usersPanel.usersToShow.count,
    userToEdit: state.adminPanel_usersPanel.userToEdit,
    filters: state.adminPanel_usersPanel.filters
});

export default connect(mapStateToProps, {
    showUsers,
    editUserClose,
    filterUsers
})(UsersPanel);
