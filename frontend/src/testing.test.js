import React from 'react';
import Link from './Link/Link';
import renderer from 'react-test-renderer';
import enzyme, { configure } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


test('Link must be' , () => {
    const element = enzyme.shallow(
        <Link href='#' text='Go Workw'></Link>,
    );
    
    let j = shallowToJson(element);
    expect(j).toMatchSnapshot();
});



// test('2+2=4', () => {
//     expect(2 + 2).toBe(4);
// })