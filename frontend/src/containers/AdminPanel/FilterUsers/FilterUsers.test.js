import React from 'react';
import FilterUsersConnected, { FilterUsers } from '../../../../AdminPanel/UsersPanel/FilterUsers';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

function setupComponent(props = {
   
    updateState: ()=>{}
}) {
    let component = shallow(<FilterUsers {...props} />);
    return { component, props };
}

describe('FilterUsers --- Snapshot', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        expect(FilterUsers.propTypes.updateState).toBe(PropTypes.func);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});


describe('FilterUsers ', () => {
    let initialState = {
        
    };

    const mockStore = configureStore();
    let store, wrapper;
    
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><FilterUsersConnected /></Provider>);
    });
    it('+++ render the connected(SMART) component',() => {
        expect(wrapper.find(FilterUsersConnected).length).toEqual(1);
    });
});

