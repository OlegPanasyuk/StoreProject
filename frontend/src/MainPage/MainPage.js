import React from 'react';
import { Carousel } from 'react-bootstrap';
import img1 from '../asserts/imgs/range_rover_auto_car_cars_79761_1920x1080.jpg';
import img2 from '../asserts/imgs/header.jpg';
import img3 from '../asserts/imgs/2018-Jeep-Compass-01.jpg';

function MainPage() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className='d-block w-100 h-10'
                    src={img1}
                    alt='First slide'
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='d-block w-100'
                    src={img2}
                    alt='Third slide'
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='d-block w-100'
                    src={img3}
                    alt='Third slide'
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}


export default MainPage;
