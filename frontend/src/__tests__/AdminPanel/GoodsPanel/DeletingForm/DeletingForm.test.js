import React from 'react';
import DeleteFormConnected, { DeleteForm } from '../../../../AdminPanel/GoodsPanel/DeleteForm';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    onHide: () => { },
    item: {
        id: 1
    }
}) {
    let component = shallow(<DeleteForm {...props} />);
    return { component, props };
}

describe('DeleteForm --- Snapshot', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        expect(DeleteForm.propTypes.item).toBe(PropTypes.object);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});


describe('DeleteForm ', () => {
    let initialState = {
        adminPanel_goodsPanel: {
            deleteItem: {
                show: false,
                id: null
            }
        }
    };

    const mockStore = configureStore();
    let store, wrapper;
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><DeleteFormConnected /></Provider>);
    });
    it('+++ render the connected(SMART) component',() => {
        expect(wrapper.find(DeleteFormConnected).length).toEqual(1);
    });
});