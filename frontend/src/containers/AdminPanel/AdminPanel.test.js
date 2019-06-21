import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import AdminPanelConnected, { AdminPanel } from './AdminPanel';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    match: {
        path: ''
    },
    errors: [],
    user: {
        token: ''
    }
}) {
    const component = shallow(<AdminPanel {...props} />);
    return { component, props };
}

describe('AdminPanel --- snapshots', () => {
    it('Component must be rendered', () => {
        const obj = setupComponent();
        expect(AdminPanel.propTypes.user).toBe(PropTypes.object);
        expect(AdminPanel.propTypes.errors).toBe(PropTypes.array);
        expect(AdminPanel.propTypes.match).toBe(PropTypes.object);
        expect(shallowToJson(obj.component)).toMatchSnapshot();
    });
});

describe('AdminPanelConnected', () => {
    const initialState = {
        errorReducers: {
            Errors: []
        },
        adminPanel_User: {
            message: 'Auth Passed',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJTdXBlckFkbWluIiwiaWF0IjoxNTU4MzQxNDIxLCJleHAiOjE1NTgzNDE1NDF9.JRn4XDwiwNonZCxU65cjJ1NgZ5zEnJ35KSgCpxnLwMU',
            role: 'SuperAdmin',
            username: 'Admin'
        }
    };

    const mockStore = configureStore();
    let store; let
        wrapper;
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <Router>
                    <AdminPanelConnected match={{
                        path: ''
                    }}
                    />
                </Router>
            </Provider>
        );
    });
    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.find(AdminPanelConnected).length).toEqual(1);
    });
});
