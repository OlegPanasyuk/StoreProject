import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import { UserHeader } from '../UserHeader';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    setUserInState: () => { },
    userInfo: {
        username: 'Admin',
        email: 'test@test.com',
        role: 'Guest'
    }
}) {
    const component = shallow(<UserHeader {...props} />);
    return { component, props };
}

describe('UserHeader', () => {
    it('Component must be created', () => {
        const { component } = setupComponent();
        expect(UserHeader.propTypes.userInfo).toBe(PropTypes.object);
        expect(UserHeader.propTypes.setUserInState).toBe(PropTypes.func);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});
