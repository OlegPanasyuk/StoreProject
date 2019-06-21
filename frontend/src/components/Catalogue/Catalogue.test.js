import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Catalogue from './Catalogue';


configure({ adapter: new Adapter() });

function setupComponent(props = {

}) {
    const component = shallow(<Catalogue {...props} />);
    return { component, props };
}

describe('Catalogue', () => {
    it('Component must be rendered', () => {
        const { component } = setupComponent();
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});
