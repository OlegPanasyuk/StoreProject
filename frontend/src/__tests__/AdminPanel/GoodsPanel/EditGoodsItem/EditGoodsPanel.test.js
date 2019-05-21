import React from 'react';
import EditGoodsItemConnected, { EditGoodsItem } from '../../../../AdminPanel/GoodsPanel/EditGoodsItem';
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
        show: false,
        idgoods: null,
        name: null,
        description: null,
        price: 0,
        catalogue_id_catalogue: null
    }
}) {
    let component = shallow(<EditGoodsItem {...props} />);
    return { component, props };
}

describe('EditGoodsItem --- Snapshot', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        expect(EditGoodsItem.propTypes.item).toBe(PropTypes.object);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});


describe('EditGoodsItem ', () => {
    let initialState = {
        adminPanel_goodsPanel: {
            editItem: {
                show: false,
                idgoods: null,
                name: null,
                description: null,
                price: 0,
                catalogue_id_catalogue: null
            }
        }
    };

    const mockStore = configureStore();
    let store, wrapper;
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><EditGoodsItemConnected /></Provider>);
    });
    it('+++ render the connected(SMART) component',() => {
        expect(wrapper.find(EditGoodsItemConnected).length).toEqual(1);
    });
});