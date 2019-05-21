import React from 'react';
import UsersPanelConnected, { UsersPanel } from '../../../AdminPanel/UsersPanel/UsersPanel';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    showUsers: () => { },
    filters: {

    },
    filterUsers: () => { },
    userToEdit: {},
    usersToShow: [],
    usersToShowCount: 0,
    editUserClose: () => { }
}) {
    let component = shallow(<UsersPanel {...props} />);
    return { component, props };
}

describe('UsersPanel --- Snapshot', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        expect(UsersPanel.propTypes.usersToShow).toBe(PropTypes.array);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});


describe('UsersPanel ', () => {
    let initialState = {
        adminPanel_usersPanel: {
            usersToShow: {
                rows: [],
                count: 0
            },
            userToEdit: {
                username: 'User'
            },
            filters: {

            }
        }
    };

    const mockStore = configureStore();
    let store, wrapper;
   
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><UsersPanelConnected  /></Provider>);
    });
    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.find(UsersPanelConnected).length).toEqual(1);
    });
});

