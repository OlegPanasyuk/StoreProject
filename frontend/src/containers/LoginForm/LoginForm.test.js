import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import { LoginForm } from './LoginForm';

configure({ adapter: new Adapter() });


function setupComponent(props = {
    handleConverStatusUser: () => {},
    handleSetStateInApp: () => {},
    userState: {
        email: 'test@test.com',
        role: 'Guest'
    }
}) {
    const component = shallow(<LoginForm {...props} />);
    return { component, props };
}


describe('LoginForm', () => {
    it('Component must be created', () => {
        const { component } = setupComponent();

        expect(LoginForm.propTypes.userState).toBe(PropTypes.object);

        expect(LoginForm.propTypes.handleConverStatusUser).toBe(PropTypes.func);

        expect(LoginForm.propTypes.handleSetStateInApp).toBe(PropTypes.func);

        expect(shallowToJson(component)).toMatchSnapshot();
    });
});
