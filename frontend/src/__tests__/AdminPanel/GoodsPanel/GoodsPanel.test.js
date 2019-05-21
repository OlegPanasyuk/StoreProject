import React from 'react';
import GoodsPanelConnected, { GoodsPanel } from '../../../AdminPanel/GoodsPanel/GoodsPanel';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    filters: {  
        limit: 10,
        count: 0,
        activePage: 1,
        priceMore: 0,
        priceLess: 0,
        nameSearch: '',
        orderPrice: null,
        id_catalogue: -1
    },
    goodsFilter: ()=>{},
    closeEditGoodsItem: ()=>{},
    deleteItem: {},
    permissionToDelete: ()=>{},
    permissionToDeleteClose: ()=>{},
    editItem: {},
    goodsToShow: []
}) {
    let component = shallow(<GoodsPanel {...props} />);
    return { component, props };
}

describe('GoodsPanel --- Snapshot', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        expect(GoodsPanel.propTypes.goodsToShow).toBe(PropTypes.array);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});


describe('GoodsPanel ', () => {
    let initialState = {
        adminPanel_goodsPanel: {
            goodsToShow: [],
            filters: {
                limit: 10,
                count: 0,
                activePage: 1,
                priceMore: 0,
                priceLess: 0,
                nameSearch: '',
                orderPrice: null,
                id_catalogue: -1
            },
            editItem: {
                show: false,
                idgoods: null,
                name: null,
                description: null,
                price: 0,
                catalogue_id_catalogue: null
            },
            deleteItem: {
                id: null,
                show: false
            }

        }
    };

    const mockStore = configureStore();
    let store, wrapper;
    
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><GoodsPanelConnected /></Provider>);
    });
    it('+++ render the connected(SMART) component',() => {
        expect(wrapper.find(GoodsPanelConnected).length).toEqual(1);
    });
});

