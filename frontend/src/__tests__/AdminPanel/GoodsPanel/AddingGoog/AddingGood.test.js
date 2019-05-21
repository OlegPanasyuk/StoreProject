import React from 'react';
import AddingGoodConnected, { AddingGood } from '../../../../AdminPanel/GoodsPanel/AddingGood';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    onHide: () => { },
    addErrorToState: () => { },
}) {
    let component = shallow(<AddingGood {...props} />);
    return { component, props };
}

describe('AddingGood --- Snapshot', () => {
    it('component should be rendered', () => {
        let { component } = setupComponent();
        expect(AddingGood.propTypes.onHide).toBe(PropTypes.func);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});

describe('AddingGood', () => {
    let initialState = {
       
    };

    const mockStore = configureStore();
    let store, wrapper;
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><AddingGoodConnected /></Provider>);
    });
    it('+++ render the connected(SMART) component',() => {
        expect(wrapper.find(AddingGoodConnected).length).toEqual(1);
    });
});