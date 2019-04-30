import React from 'react';
import LoginFormConnected, {LoginForm} from '../../LoginForm/LoginForm';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
// import rest from 'rest';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

// import pathPrefix from 'rest/interceptor/pathPrefix';
// import errorCode from 'rest/interceptor/errorCode';
// import mime from 'rest/interceptor/mime';

// const client = rest.wrap(mime, { mime: 'application/json' })
//     .wrap(errorCode, { code: 500 })
//     .wrap(pathPrefix, { prefix: 'http://localhost:3300' });


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


describe('LoginForm', () => {

    it('Component must be created', () => {
        const { component } = setupComponent();

        expect(LoginForm.propTypes.userState).toBe(PropTypes.object);

        expect(LoginForm.propTypes.handleConverStatusUser).toBe(PropTypes.func);

        expect(LoginForm.propTypes.handleSetStateInApp).toBe(PropTypes.func);

        expect(shallowToJson(component)).toMatchSnapshot();

    });
});