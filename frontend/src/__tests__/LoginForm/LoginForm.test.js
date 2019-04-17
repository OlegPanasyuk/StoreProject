import React from 'react';
import LoginForm from '../../LoginForm/LoginForm';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import rest from 'rest';

configure({ adapter: new Adapter() });

import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: 'http://localhost:3300' });


function setupComponent(props = {
    handleConverStatusUser: ()=>{},
    handleSetStateInApp: ()=>{},
    userState: {
        email: 'test@test.com',
        role: 'Guest'
    }
}) {
    let component = shallow(<LoginForm {...props} />);
    return { component, props };
}

// eslint-disable-next-line no-undef
describe('LoginForm', () => {
    // eslint-disable-next-line no-undef
    it('Component must be created', () => {
        const { component } = setupComponent();

        // eslint-disable-next-line no-undef
        expect(LoginForm.propTypes.userState).toBe(PropTypes.object);
        // eslint-disable-next-line no-undef
        expect(LoginForm.propTypes.handleConverStatusUser).toBe(PropTypes.func);
        // eslint-disable-next-line no-undef
        expect(LoginForm.propTypes.handleSetStateInApp).toBe(PropTypes.func);

        // eslint-disable-next-line no-undef
        expect(shallowToJson(component)).toMatchSnapshot();

    });
});