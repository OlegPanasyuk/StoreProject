import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Navigation from './Navigation';

configure({ adapter: new Adapter() });

function setupComponent(props = {

}) {
    const component = shallow(<Navigation {...props} />);
    return { component, props };
}

describe('Navigation ', () => {
    it('+++ component must be created', () => {
        const { component } = setupComponent();
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});
