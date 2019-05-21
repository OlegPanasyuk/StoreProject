import React from 'react';
import AddingUserConnected, { AddingUser } from '../../../../AdminPanel/UsersPanel/AddingUser';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    onHide: ()=>{},
    addErrorToState: ()=>{}
}) {
    let component = shallow(<AddingUser {...props} />);
    return { component, props };
}

describe('AddingUser --- Snapshot', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        expect(AddingUser.propTypes.onHide).toBe(PropTypes.func);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});


describe('AddingUser ', () => {
    let initialState = {
        
    };

    const mockStore = configureStore();
    let store, wrapper;
    
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><AddingUserConnected /></Provider>);
    });
    it('+++ render the connected(SMART) component',() => {
        expect(wrapper.find(AddingUserConnected).length).toEqual(1);
    });
});

