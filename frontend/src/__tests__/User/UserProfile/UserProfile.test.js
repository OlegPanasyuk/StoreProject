import React from 'react';
import UserProfileConnected, { UserProfile } from '../../../User/UserProfile';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
//import rest from 'rest';

//import { addGoodsToBasket, deleteGoodsFromBasket } from '../../REDUX/actions/actionsShoppingBasket';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    userInfo: {
        username: 'Admin',
        email: 'admin@admin.dog',
        role: 'Admin',
        create_time: '2019-04-22T10:29:35.000Z'
    }
}) {
    let component = shallow(<UserProfile {...props} />);
    return { component, props };
}

describe('UserProfile --- Snapshot', () => {
    it('+++capturing Snapshot of ShoppingBascket', () => {
        const obj = setupComponent();
        expect(UserProfile.propTypes.userInfo).toBe(PropTypes.object);
        expect(shallowToJson(obj.component)).toMatchSnapshot();
    });
});


describe('UserProfile', () => {

    const initialState = {
        userHeaderReducers: {
            userInfo: {
                username: 'Admin',
                email: 'admin@admin.dog',
                role: 'Admin',
                create_time: '2019-04-22T10:29:35.000Z'
            }
        }
    };
    const mockStore = configureStore();
    let store, wrapper;
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><UserProfileConnected /></Provider>);
    });

    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.find(UserProfileConnected).length).toEqual(1);
    });

});
