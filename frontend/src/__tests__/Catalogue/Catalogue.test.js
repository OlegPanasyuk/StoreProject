import React from 'react';
import Catalogue from '../../Catalogue/Catalogue';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

function setupComponent(props = {
   
}) {
    let component = shallow(<Catalogue {...props} />);
    return { component, props };
}

describe('Catalogue', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});