import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import LoginFormConnected, { LoginForm } from '../../../AdminPanel/LoginForm/LoginForm';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    match: {
        path: ''
    },
    user: {

    },
    userAuthorizedSuccess: () => { }
}) {
    const component = shallow(<LoginForm {...props} />);
    return { component, props };
}

describe('LoginForm --- Snapshot', () => {
    it('Component must be rendered', () => {
        const { component } = setupComponent();
        expect(LoginForm.propTypes.match).toBe(PropTypes.object);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});


describe('LoginForm ', () => {
    const initialState = {
        adminPanel_User: {

        }
    };

    const mockStore = configureStore();
    let store; let 
wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><LoginFormConnected /></Provider>);
    });
    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.find(LoginFormConnected).length).toEqual(1);
    });
});
