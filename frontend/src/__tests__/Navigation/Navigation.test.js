import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Navigation from '../../Navigation/Navigation';

configure({ adapter: new Adapter() });

function setupComponent(props = {

}) {
    let component = shallow(<Navigation {...props} />);
    return { component, props };
}

describe('Navigation ', () => {
    it('+++ component must be created', () => {
        let { component } = setupComponent();
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});
