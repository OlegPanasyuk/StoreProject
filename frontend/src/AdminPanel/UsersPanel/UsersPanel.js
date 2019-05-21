import React, { Component } from 'react';
import { Container, Row, Col, CardColumns, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

//Redux 
import { connect } from 'react-redux';
import {
    showUsers,
    editUserClose,
    filterUsers
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
        this.openPage = this.openPage.bind(this);
        this.prepareSearchRow = this.prepareSearchRow.bind(this);
        this.updateState = this.updateState.bind(this);
        this.state = {
            showAddingModal: false
        };
    }

    prepareSearchRow() {
        let searchStr = [];
        let { filters } = this.props;
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

        // I don't like it
        let a = new Promise((res, rej) => {
            const obj = {};
            this.props.filterUsers(obj);
            res(true);
            if (!obj) rej();
        });
        a.then(() => {
            this.openPage(page);
        }, () => {

        });
    }

    openPage(i) {
        let self = this;
        const storage = window.localStorage;
        if (fetch) {
            let searchStr = this.prepareSearchRow();
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append("Content-type", 'application/json');
            let myInit = {
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
                    self.props.filterUsers({activePage: i});
                    res.json().then(function (data) {
                        self.props.showUsers(data);
                    });
                });
        }
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

            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/users/filter?page=1`, myInit)
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
        let count = this.props.usersToShowCount;
        let {limit, activePage} = this.props.filters;
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

        if (this.props.userToEdit.show) {
            editModal = (
                <EditUser
                    onHide={() => {
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
                            updateState = {this.updateState}
                        />
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
    showUsers: PropTypes.func,
    filters: PropTypes.object,
    filterUsers: PropTypes.func,
    userToEdit: PropTypes.object,
    usersToShow: PropTypes.array,
    usersToShowCount: PropTypes.number,
    editUserClose: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        usersToShow: state.adminPanel_usersPanel.usersToShow.rows,
        usersToShowCount: state.adminPanel_usersPanel.usersToShow.count,
        userToEdit: state.adminPanel_usersPanel.userToEdit,
        filters: state.adminPanel_usersPanel.filters
    };
};

export default connect(mapStateToProps, {
    showUsers,
    editUserClose,
    filterUsers
})(UsersPanel);