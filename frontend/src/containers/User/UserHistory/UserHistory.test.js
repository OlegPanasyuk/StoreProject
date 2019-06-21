import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import UserHistoryConnected, { UserHistory } from '../UserHistory';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    history: [{
        id: 5,
        user_id: 1,
        createdAt: '2019-04-22T10:29:35.000Z',
        updatedAt: '2019-04-22T10:29:35.000Z',
        contents: '[{"idgoods":1,"name":"Honda civic","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.","catalogue_id_catalogue":4,"price":2000},{"idgoods":7,"name":"Opel Omega","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.","catalogue_id_catalogue":4,"price":31225}]'
    },
    {
        id: 6,
        user_id: 1,
        createdAt: '2019-04-22T10:33:55.000Z',
        updatedAt: '2019-04-22T10:33:55.000Z',
        contents: '[{"idgoods":1,"name":"Honda civic","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.","catalogue_id_catalogue":4,"price":2000},{"idgoods":7,"name":"Opel Omega","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.","catalogue_id_catalogue":4,"price":31225}]'
    },
    {
        id: 7,
        user_id: 1,
        createdAt: '2019-04-22T10:34:07.000Z',
        updatedAt: '2019-04-22T10:34:07.000Z',
        contents: '[{"idgoods":1,"name":"Honda civic","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.","catalogue_id_catalogue":4,"price":2000},{"idgoods":7,"name":"Opel Omega","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.","catalogue_id_catalogue":4,"price":31225}]'
    }]
}) {
    const component = shallow(<UserHistory {...props} />);
    return { component, props };
}

describe('UserHistory --- Snapshot', () => {
    it('Component should be rendered', () => {
        const { component } = setupComponent();
        expect(UserHistory.propTypes.history).toBe(PropTypes.array);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});

describe('UserHistory --- Connected', () => {
    const initialState = {
        userHeaderReducers: {

            historyBasket: [
                {
                    id: 5,
                    user_id: 1,
                    createdAt: '2019-04-22T10:29:35.000Z',
                    updatedAt: '2019-04-22T10:29:35.000Z',
                    contents: '[{"idgoods":1,"name":"Honda civic","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.","catalogue_id_catalogue":4,"price":2000},{"idgoods":7,"name":"Opel Omega","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.","catalogue_id_catalogue":4,"price":31225}]'
                },
                {
                    id: 6,
                    user_id: 1,
                    createdAt: '2019-04-22T10:33:55.000Z',
                    updatedAt: '2019-04-22T10:33:55.000Z',
                    contents: '[{"idgoods":1,"name":"Honda civic","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.","catalogue_id_catalogue":4,"price":2000},{"idgoods":7,"name":"Opel Omega","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.","catalogue_id_catalogue":4,"price":31225}]'
                },
                {
                    id: 7,
                    user_id: 1,
                    createdAt: '2019-04-22T10:34:07.000Z',
                    updatedAt: '2019-04-22T10:34:07.000Z',
                    contents: '[{"idgoods":1,"name":"Honda civic","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.","catalogue_id_catalogue":4,"price":2000},{"idgoods":7,"name":"Opel Omega","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.","catalogue_id_catalogue":4,"price":31225}]'
                }
            ]
        }
    };
    const mockStore = configureStore();
    let store;
    let wrapper;
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><UserHistoryConnected /></Provider>);
    });

    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.find(UserHistoryConnected).length).toEqual(1);
    });
});
