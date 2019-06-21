import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import Order from './Order';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    obj: {
        id: 5,
        user_id: 1,
        createdAt: '2019-04-22T10:29:35.000Z',
        updatedAt: '2019-04-22T10:29:35.000Z',
        contents: '[{"idgoods":1,"name":"Honda civic","description":\
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis \
        provident quo quaerat repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? \
        Nisi, maxime a.","catalogue_id_catalogue":4,"price":2000},{"idgoods":7,"name":"Opel Omega",\
        "description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident \
        quo quaerat repellat fuga debitis nemo voluptates quis voluptate, dolorem modi non? Nisi, maxime a.",\
        "catalogue_id_catalogue":4,"price":31225}]'
    }
}) {
    const component = shallow(<Order {...props} />);
    return { component, props };
}

describe('Order', () => {
    it('Component should be rendered', () => {
        const { component } = setupComponent();
        expect(Order.propTypes.obj).toBe(PropTypes.object);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});
