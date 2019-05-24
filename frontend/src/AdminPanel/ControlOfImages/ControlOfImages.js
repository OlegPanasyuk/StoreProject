import React, { Component } from 'react';
import { Container, Row, Col, CardColumns } from 'react-bootstrap';
import './ControlOfImages.css';
//Component
import ImageItem from './ImageItem';
import ListOfPages from '../GoodsPanel/ListOfPages';

export class ControlOfImages extends Component {

    constructor(props) {
        super(props);
        this.openPage = this.openPage.bind(this);
        this.state = {
            countOfInfoImages: null,
            arrOfInfoImages: [],
            activePage: 1
        };
    }

    openPage(i) {
        if (fetch) {
            let myInit = {
                method: 'GET',
                cache: 'default'
            };
            fetch(
                `${
                    process.env.REACT_APP_API_HOST
                }:${
                    process.env.REACT_APP_API_PORT
                }/images/filters?page=${i}`,
                myInit
            ).then((res) => {
                if (res.ok) {
                    return res.json();
                }

            }).then(images => {
                let { count, rows } = images;
                this.setState({
                    countOfInfoImages: count,
                    arrOfInfoImages: rows,
                    activePage: i
                });
            });
        }
    }

    UNSAFE_componentWillMount() {
        this.openPage(1);
    }

    render() {
        let { countOfInfoImages, arrOfInfoImages, activePage } = this.state;
        return (
            <Container>
                <Row>
                    <Col>
                        <ListOfPages 
                            count={countOfInfoImages}
                            limit={10}
                            activePage={activePage}
                            openPage={this.openPage}
                        />
                    </Col>
                </Row>
                <Row>
                    <CardColumns className='card-columns1'>
                        {arrOfInfoImages.map(el => {
                            return (
                                <ImageItem key={el.id_img} obj={el} />
                            );
                        })}
                    </CardColumns>
                </Row>


            </Container>
        );
    }
}

export default ControlOfImages;