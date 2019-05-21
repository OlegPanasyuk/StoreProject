import React from 'react';
import UserItemConnected, { UserItem } from '../../../../AdminPanel/UsersPanel/UserItem';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    obj: {
        id: 1,
        username: 'User',
        role: 'Admin'
    },
    editUser: ()=>{}
}) {
    let component = shallow(<UserItem {...props} />);
    return { component, props };
}

describe('UserItem --- Snapshot', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        expect(UserItem.propTypes.obj).toBe(PropTypes.object);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});


describe('UserItem ', () => {
    let initialState = {
        
    };

    const mockStore = configureStore();
    let store, wrapper;
    let props = {
        obj: {
            id: 1,
            username: 'User',
            role: 'Admin'
        },
        editUser: ()=>{}
    };
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><UserItemConnected {...props}/></Provider>);
    });
    it('+++ render the connected(SMART) component',() => {
        expect(wrapper.find(UserItemConnected).length).toEqual(1);
    });
});

