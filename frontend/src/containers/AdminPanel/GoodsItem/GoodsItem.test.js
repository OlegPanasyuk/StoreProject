import React from 'react';
import GoodsItemConnected, { GoodsItem } from '../../../../AdminPanel/GoodsPanel/GoodsItem';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    id: 1,
    openEditGoodsItem: () => { },
    permissionToDelete: () => { },
    obj: {
        show: false,
        name: 'Goods',
        price: 1000,
        idgoods: 1,
        description: 'Lorem'
    }
}) {
    let component = shallow(<GoodsItem {...props} />);
    return { component, props };
}

describe('GoodsItem --- Snapshot', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        expect(GoodsItem.propTypes.obj).toBe(PropTypes.object);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});


describe('GoodsItem ', () => {
    let initialState = {
        
    };

    const mockStore = configureStore();
    let store, wrapper;
    let props = {
        id: 1,
        openEditGoodsItem: () => { },
        permissionToDelete: () => { },
        obj: {
            name: 'Goods',
            price: 1000,
            idgoods: 1,
            description: 'Lorem'
        }
    };
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><GoodsItemConnected {...props}/></Provider>);
    });
    it('+++ render the connected(SMART) component',() => {
        expect(wrapper.find(GoodsItemConnected).length).toEqual(1);
    });
});

