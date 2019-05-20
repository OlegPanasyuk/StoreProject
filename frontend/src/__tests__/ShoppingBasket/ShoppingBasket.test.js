import React from 'react';
import ShoppingBasketConnected, { ShoppingBasket } from '../../ShoppingBasket/ShoppingBasket';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
//import rest from 'rest';

import { addGoodsToBasket, deleteGoodsFromBasket } from '../../REDUX/actions/actionsShoppingBasket';

configure({ adapter: new Adapter() });

// import pathPrefix from 'rest/interceptor/pathPrefix';
// import errorCode from 'rest/interceptor/errorCode';
// import mime from 'rest/interceptor/mime';


// const client = rest.wrap(mime, { mime: 'application/json' })
//     .wrap(errorCode, { code: 500 })
//     .wrap(pathPrefix, { prefix: 'http://localhost:3300' });


function setupComponent(props = {
    goods: new Set([1, 2, 3]),
    goodsData: []
}) {
    let component = shallow(<ShoppingBasket {...props} />);
    return { component, props };
}

describe('ShoppingBasket --- Snapshot', () => {
    it('+++capturing Snapshot of ShoppingBasket', () => {
        const obj = setupComponent();
        expect(ShoppingBasket.propTypes.goods).toBe(PropTypes.object);
        expect(ShoppingBasket.propTypes.goodsData).toBe(PropTypes.array);
        expect(shallowToJson(obj.component)).toMatchSnapshot();
    });
});


describe('ShoppingBasket', () => {

    const initialState = {
        shoppingBasketReducers: {
            goodsInBasket: new Set([1, 2, 3]),
            goodsInBasketData: [
                {
                    idgoods: 1,
                    name: 'Honda civic',
                    description: 'Lorem ipsum dolor sit amet consectetur \
                    adipisicing elit. Blanditiis provident quo quaerat \
                    repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.',
                    catalogue_id_catalogue: 4,
                    price: 2000
                },
                {
                    idgoods: 7,
                    name: 'Opel Omega',
                    description: 'Lorem ipsum dolor sit amet consectetur \
                    adipisicing elit. Blanditiis provident quo quaerat \
                    repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.',
                    catalogue_id_catalogue: 4,
                    price: 31225
                },
                {
                    idgoods: 11,
                    name: 'Passat B7',
                    description: 'Lorem ipsum dolor sit amet consectetur \
                    adipisicing elit. Blanditiis provident quo quaerat \
                    repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.',
                    catalogue_id_catalogue: 4,
                    price: 121358
                }
            ]
        },
        userHeaderReducers: {
            userInfo: {
                
            }
        }
    };
    const mockStore = configureStore();
    let store, wrapper;
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><ShoppingBasketConnected /></Provider>);
    });

    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.find(ShoppingBasketConnected).length).toEqual(1);
    });

    it('+++ actions', () => {
        let actions;
        store.dispatch(addGoodsToBasket(4));
        store.dispatch(deleteGoodsFromBasket(4));
        actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_GOODS_TO_BASKET',
            payload: {
                id: 4
            }
        });
        expect(actions[1]).toEqual({
            type: 'DEL_GOODS_FROM_BASKET',
            payload: {
                id: 4
            }
        });
    });

});
