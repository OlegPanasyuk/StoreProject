import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

import RegistrForm from './RegistrForm';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    setUserInState: () => {}
}) {
    const component = shallow(<RegistrForm {...props} />);
    return { component, props };
}


// eslint-disable-next-line no-undef
describe('ReggistrForm', () => {
    // eslint-disable-next-line no-undef
    it('Component must be created', () => {
        const { component } = setupComponent();

        // eslint-disable-next-line no-undef
        expect(RegistrForm.propTypes.setUserInState).toBe(PropTypes.func);

        // eslint-disable-next-line no-undef
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});
