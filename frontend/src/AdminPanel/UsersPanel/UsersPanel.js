import React, { Component } from 'react';
import { Container, Row, Col, CardColumns } from 'react-bootstrap';
import PropTypes from 'prop-types';

//Redux 
import { connect } from 'react-redux';
import {
    showUsers
} from '../../REDUX/adminPanel/actions/actionsUsersPanel';

//Components 
import UserItem from './UserItem';

export class UsersPanel extends Component {

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


            // let body = {
            //     name: this.nameRef.current.value,
            //     description: this.descriptionRef.current.value,
            //     catalogue_id_catalogue: this.catalogueRef.current.value,
            //     price: this.priceRef.current.value
            // };
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
        return (
            <Container>
                <Row>
                    <Col>
                        Top row
                    </Col>
                </Row>
                <Row>
                    <Col className='col-3'>
                        Left BAr
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
        usersToShowCount: state.adminPanel_usersPanel.usersToShow.count
    };
};

export default connect(mapStateToProps, {
    showUsers
})(UsersPanel);