import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import AddingGoodConnected, { AddingGood } from '../../../../AdminPanel/GoodsPanel/AddingGood';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    onHide: () => { },
    addErrorToState: () => { }
}) {
    const component = shallow(<AddingGood {...props} />);
    return { component, props };
}

describe('AddingGood --- Snapshot', () => {
    it('component should be rendered', () => {
        const { component } = setupComponent();
        expect(AddingGood.propTypes.onHide).toBe(PropTypes.func);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});

describe('AddingGood', () => {
    const initialState = {

    };

    const mockStore = configureStore();
    let store; let wrapper;
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><AddingGoodConnected /></Provider>);
    });
    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.find(AddingGoodConnected).length).toEqual(1);
    });
});
